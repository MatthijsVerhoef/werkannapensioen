import React, { useState, useEffect, useRef } from 'react'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import './styles/ApplicationStyle.css'
import { db, timeStamp, auth } from '../../data/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function ApplicationStyle({ companyName, job, description, timestamp, applicationType, salary, location, type, experience, documentId, img, placedby, setActivepost, activePost }) {
    const [saved, setSaved] = useState(false)
    const [currentUser] = useAuthState(auth)
    const [confirm, setConfirm] = useState(false)
    const isMounted = useRef(false)

    const onSave = () => {
        db
            .collection('users')
            .doc(currentUser.uid)
            .collection('savedposts')
            .doc(documentId)
            .set({
                companyName: companyName,
                jobTitle: job,
                timestamp: timestamp,
                address: location,
                applicationType: type,
                savedAt: timeStamp,
                placedby: placedby,
                description: description,
                companyImg: img
            })
    }

    const onRemoveSave = () => {
        db
            .collection('users')
            .doc(currentUser.uid)
            .collection('savedposts')
            .doc(documentId)
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
                    if (id.indexOf(documentId) > -1) {
                        setSaved(true)
                    } else {
                        setSaved(false)
                    }
                })
        }
        checkSavedPosts()
        return () => (isMounted.current = false)
    }, [currentUser, documentId])


    return (
        <div className={documentId === activePost ? "applicationContainerActive" : "applicationContainer"} onClick={() => setActivepost(documentId)}>
            {saved ?
                <button className="saveIcon" onClick={() => onRemoveSave()}><AiFillHeart size="2em" color="#F23A5F" style={{ cursor: 'pointer', zIndex: 90 }} /></button>
                :
                <button className="saveIcon" onClick={() => onSave()}><AiOutlineHeart size="2em" color="#F23A5F" style={{ cursor: 'pointer', zIndex: 90 }} /></button>
            }
            <div className="applicationContainer_header">
                {img ?
                    <div className="application__imgDec"><div className="application_imgBckgrnd"><img src={img} alt="company"></img></div></div>
                    :
                    <div className="application__imgDec"><div className="application_imgBckgrnd"><p>{companyName[0]}</p></div></div>
                }
                <p>{companyName}</p>
            </div>
            <div className="applicationContainer_content">
                <p>{job}</p>
                <p>{location}</p>
                {activePost ?
                    <p>{type} uur per week</p>
                    :
                    <div className="applicationContainer_content_long">
                        <p>{description}</p>
                        <div className="applicationContainer_tag_row">
                            <div className="tag_item_post">{applicationType}</div>
                            <div className="tag_item_post">{experience} jaar ervaring</div>
                            <div className="tag_item_post">${salary}</div>

                        </div>
                    </div>
                }
            </div>
            <div className="application_container_footer">
                <i>{timestamp}</i>
                <button className="application_container_footer_action">Solliciteren</button>
            </div>
        </div>
    )
}

export default ApplicationStyle