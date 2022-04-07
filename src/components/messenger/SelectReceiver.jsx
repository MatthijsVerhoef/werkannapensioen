import './styles.css'
import { IoIosArrowForward, IoIosClose } from 'react-icons/io'
import { useState } from 'react'
import db, { auth } from '../../data/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const SelectReceiver = ({ setNewChat, posts, chatsSnapshot }) => {
    const [currentUser] = useAuthState(auth)
    const [step, setStep] = useState(0)
    const [currentPost, setCurrentPost] = useState()

    const completeFormStep = () => {
        setStep(cur => cur + 1)
    }

    const createChat = (applicant) => {
        if (!chatAlreadyExists(applicant))
        db.collection('chats').add({
            users: [currentUser?.uid, applicant]
        })
    }

    const chatAlreadyExists = (applicant) =>
        !!chatsSnapshot?.docs.find(
            chat => chat.data().users.find(user => user === applicant)?.length > 0
        )

    return (
        <div className='fixed_container'>
            <div className='blur' onClick={() => setNewChat(false)}></div>
            <div className='select_post_container'>
                <div className="select_post_list">
                    <div className='select_post_container_header'>
                        {step === 0 ? <p>Selecteer een vacature waarvan u een gesprek wilt aangaan met de sollicitant</p> : null}
                        {step === 1 ? <p>Selecteer een sollicitant</p> : null}
                        <IoIosClose size="30px" style={{ cursor: 'pointer' }} onClick={() => setNewChat(false)} />
                    </div>
                    {step === 0 ?
                        <>
                            {posts.length > 0 ? (
                                <>
                                    {posts?.map(({ id, post }) => (
                                        <div className='select_post_applicant' key={post.id} onClick={() => setCurrentPost(post)}>
                                            <div className='select_post_companyImg'></div>
                                            <p>{post.companyName}, {post.jobTitle}</p>
                                            <IoIosArrowForward className='arrow_forward' onClick={completeFormStep} />
                                        </div>
                                    ))}
                                </>
                            ) : (
                                null
                            )}
                        </> : null}
                    {step === 1 ?
                        <div className=''>
                            {currentPost.applicants.map((applicant) => (
                                <p onClick={() => createChat(applicant)} key={applicant}>{applicant}</p>
                            ))}
                        </div> : null}
                </div>
            </div>
        </div>
    )
}

export default SelectReceiver