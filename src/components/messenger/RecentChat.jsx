import { Avatar } from '@material-ui/core'
import { IoIosArrowForward } from 'react-icons/io'
import db from '../../data/Firebase'
import './styles.css'
import getRecipientId from './getRecipientId'
import { useCollection } from 'react-firebase-hooks/firestore'
import {Link} from 'react-router-dom'

const RecentChat = ({ id, users, setActiveChat }) => {
    const [recipientSnapshot] = useCollection(
        db.collection('users').where('uid', '==', getRecipientId(users))
    )
    const recipient = recipientSnapshot?.docs?.[0]?.data()

    return (
        <Link to={`/chats/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div className='recent_chat_container' onClick={() => setActiveChat(id)}>
                {recipient ?
                    <>
                        <Avatar className='chat_avatar' src={recipient.photoURL} />
                        <div className='recent_chat_content'>
                            <p>{recipient.firstName} {recipient.lastName}</p>
                            <p>Lorem ipsum dolor set amit Lorem dolor set amit amit Lorem...</p>
                        </div>
                        <IoIosArrowForward className="recent_chat_icon" />
                    </>
                    : null}
            </div>
        </Link>
    )
}

export default RecentChat