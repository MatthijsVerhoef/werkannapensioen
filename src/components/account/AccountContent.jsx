import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import db, { auth } from '../../data/Firebase';
import './styles.css'

const AccountContent = () => {
    const [currentUser] = useAuthState(auth)
    const [userInfo, setUserInfo] = useState([])
    const [addSchool, setAddSchool] = useState(false)
    const introduction = userInfo.userInformation?.filter(info => info.type === "introduction")
    const experience = userInfo.userInformation?.filter(info => info.type === "experience")
    const education = userInfo.userInformation?.filter(info => info.type === "education")

    useEffect(() => {
        currentUser && db.collection('users').doc(currentUser.uid).get().then(doc => {
            if (currentUser) {
                setUserInfo(doc.data())
            }
        })
    }, [currentUser, userInfo])

    return (
        <div className="account_information_container" onClick={() => console.log(currentUser)}>
            <div className="user_detail_container">
                <div className="user_detail_stock_image"></div>
                {/* {!currentUser.photoURL ? <div className="user_detail_avatar" style={{ backgroundImage: `url(${currentUser?.photoURL})` }}></div> : <div className="user_detail_avatar">{userInfo?.firstName[0]}</div>} */}
                <div className="user_detail_information">
                    <h2>{userInfo?.displayName}</h2>
                    <p>{userInfo?.usersCompany}, {userInfo?.usersJob}</p>
                    <button className="user_detail_action" onClick={() => setAddSchool(true)}><BsThreeDots color="#2D88FF" size="26px" /></button>
                    <button className="user_detail_action"><AiOutlineCloudUpload color="#2D88FF" size="26px" /></button>
                    <div className="user_detail_tags_container">
                        {userInfo?.tags?.map(tag => {
                            return <div className="user_detail_tag_item_edit" key={tag}>{tag}</div>
                        })}
                    </div>
                    <hr />
                    <div className="user_detail_information_introduction">
                        <h3>Introductie</h3>
                        {introduction?.map(info => (
                            <p key={info.key}>{info.description}</p>
                        ))}
                    </div>

                    <div className="user_detail_information_experience">
                        <h3>Ervaring</h3>
                        {experience?.map(info => (
                            <div className="user_detail_information_item" key={info.key}>
                                <div className="user_detail_dot"></div>
                                <div className="user_detail_information_item_text">
                                    <p>{info.company}, {info.job}</p>
                                    <p>{info.startYear}-{info.endYear}, {info.location}</p>
                                    <p>{info.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="user_detail_information_education">
                        <h3>Educatie</h3>
                        {education?.map(info => (
                            <div className="user_detail_information_item" key={info.key}>
                                <div className="user_detail_dot"></div>
                                <div className="user_detail_information_item_text">
                                    <p>{info.school}, {info.study}</p>
                                    <p>{info.startYear} - {info.endYear}, {info.location}</p>
                                    <p>{info.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountContent;
