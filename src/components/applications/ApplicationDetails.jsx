import React, { useState, useEffect, useContext, useRef } from 'react'
import { auth, db, timeStamp } from '../../data/Firebase'
import './styles/ApplicationDetails.css'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import moment from 'moment'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FiDelete, FiCheckCircle, FiEdit } from "react-icons/fi"
import { IoIosClose } from 'react-icons/io'
import { PostContext } from '../../data/context/PostContext'
import DeletePost from '../../components/constants/errors/DeletePost'

function ApplicationDetail({ activePost, setActivepost }) {
    const [saved, setSaved] = useState(false)
    const [currentUser] = useAuthState(auth)
    const { posts } = useContext(PostContext)
    const [confirm, setConfirm] = useState(false)
    const [edit, setEdit] = useState(false)
    const isMounted = useRef(false)
    const postDetails = posts.filter((post) => {
        return post.id === activePost
    })

    const onSave = () => {
        db
            .collection('users')
            .doc(currentUser.uid)
            .collection('savedposts')
            .doc(activePost)
            .set({
                companyName: postDetails[0]?.post.companyName,
                jobTitle: postDetails[0]?.post.jobTitle,
                location: postDetails[0]?.post.address,
                applicationType: postDetails[0]?.post.applicationType,
                savedAt: timeStamp,
                placedby: postDetails[0].post.placedby,
                description: postDetails[0].post.description,
                timestamp: moment(postDetails[0].post.timestamp.toDate()).fromNow()
            })
    }

    const onRemoveSave = () => {
        db
            .collection('users')
            .doc(currentUser.uid)
            .collection('savedposts')
            .doc(activePost)
            .delete()
    }

    useEffect(() => {
        isMounted.current = true
        const checkSavedPosts = () => {
            currentUser && db
                .collection('users')
                .doc(currentUser.uid)
                .collection('savedposts')
                .onSnapshot((snapshot) => {
                    const id = snapshot.docs.map(doc => doc.id)
                    if (id.indexOf(activePost) > -1) {
                        setSaved(true)
                    } else {
                        setSaved(false)
                    }
                })
        }
        checkSavedPosts()
        return () => (isMounted.current = false)
    }, [currentUser, activePost])

    return (
        <>
            {postDetails.map(({ id, post }) => (
                <div key={id} className="application_detail_page">
                    {confirm ?
                        <DeletePost activePost={activePost} confirm={confirm} setConfirm={setConfirm} currentUser={currentUser} placedBy={post.placedby} />
                        : null}
                    <div className="application_content_details_header">
                        {postDetails[0].post.companyImg ?
                            <div className="application_content_details_header_dec"><div className="application_imgBckgrnd"><img src={postDetails[0].post.companyImg} alt="company"></img></div></div>
                            :
                            <div className="application_content_details_header_dec"><div className="application_imgBckgrnd"><p>{postDetails[0].post.companyName[0]}</p></div></div>
                        }
                        <div className="application_content_details_header_info">
                            <p>{post.companyName}, {post.jobTitle}</p>
                            <p>{post.address}</p>
                            <p>{moment(post.timestamp.toDate()).fromNow()}</p>
                        </div>
                        <button className="application_container_footer_action">Solliciteren</button>
                        {saved ?
                            <tippy content="Niet meer opslaan"><button className="detailSaveIcon" onClick={() => onRemoveSave()}><AiFillHeart size="2em" color="#F23A5F" style={{ cursor: 'pointer' }} /></button></tippy>
                            :
                            <tippy content="Opslaan"><button className="detailSaveIcon" onClick={() => onSave()} ><AiOutlineHeart size="2em" color="#F23A5F" style={{ cursor: 'pointer' }} /></button></tippy>
                        }
                        <tippy content="Opdracht informatie sluiten"><button className="closeIcon" onClick={() => setActivepost()}><IoIosClose size="3em" color="black" style={{ cursor: 'pointer' }} /></button></tippy>
                    </div>
                    {post.placedby === currentUser.uid ?
                        <div className="application_detail_placedby_options">
                            <p>Mijn advertentie beheren</p>
                            <div className="application_placedby_actions">
                                <div className="action" onClick={() => setConfirm(true)}><p>Verwijderen</p><FiDelete size="1.4em" style={{ marginTop: 'auto', marginBottom: 'auto', paddingLeft: 12 }} /></div>
                                <div className="action" onClick={() => setEdit(true)}><p>Vacature wijzigen</p><FiEdit size="1.4em" style={{ marginTop: 'auto', marginBottom: 'auto', paddingLeft: 12 }} /></div>
                                <div className="action"><p>Sollicitanten bekijken</p></div>
                                <div className="action"><p>Vacature vervuld</p><FiCheckCircle size="1.4em" style={{ marginTop: 'auto', marginBottom: 'auto', paddingLeft: 12 }} /></div>
                            </div>
                        </div>
                        : <div className="application_detail_placedby_text"><p>Zelf een vacature plaatsen? Klik hier om alles te bekijken wat je moet weten.</p><button className="linkButton">Lees meer</button></div>
                    }
                    <div className="application_detail_page_content">
                        <div className="application_detail_page_content_general">
                            <div className="application_detail_page_content_general_item">
                                <p>Werkzaam</p>
                                <b>Vanuit huis</b>
                            </div>
                            <div className="application_detail_page_content_general_item">
                                <p>Salaris</p>
                                <b>€{post.salary} per uur</b>
                            </div>
                            <div className="application_detail_page_content_general_item">
                                <p>Werklading</p>
                                <b>{post.hours} uur per week</b>
                            </div>
                            <div className="application_detail_page_content_general_item">
                                <p>Min ervaring in jaren</p>
                                <b>{post.experience} jaar</b>
                            </div>
                        </div>
                        <b>Vacature eisen</b>
                        <div className="applicationDetail_tag_row">
                            <div className="tag_item_post" style={{ marginTop: 20 }}>{post.applicationType}</div>
                            <div className="tag_item_post">{post.experience} jaar ervaring</div>
                            <div className="tag_item_post">${post.salary}</div>
                            <div className="tag_item_post">{post.applicationType}</div>
                            <div className="tag_item_post">{post.experience} jaar ervaring</div>
                            <div className="tag_item_post">${post.salary}</div>
                        </div>
                        <b>Beschrijving</b>
                        <p className="applicationDetail_description">{post.description}</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ApplicationDetail