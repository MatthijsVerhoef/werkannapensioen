import { IconButton } from '@mui/material'
import { TbChevronRight, TbRocket } from 'react-icons/tb'
import GetCompanyById from '../../../data/hooks/GetCompanyById'
import GetApplicationById from '../../../data/hooks/GetApplicationById'
import './ApplicationListView.css'
import { useNavigate } from 'react-router-dom'
import db from '../../../data/Firebase'
import { UserContext } from '../../../data/context/UserContext'
import { useContext, useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

export default function ApplicationListView({ applicationInfo, loading }) {
    const { application } = GetApplicationById(applicationInfo.id)
    const { activeCompany } = GetCompanyById(application.company)
    const { currentUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [isSaved, setIsSaved] = useState(false)

    const changeSavedState = () => {
        if (isSaved) {
            currentUser && db
                .collection('users')
                .doc(currentUser.uid)
                .collection('saved')
                .doc(application.id)
                .delete()
        } else {
            currentUser && db
                .collection('users')
                .doc(currentUser.uid)
                .collection('saved')
                .doc(application.id)
                .set({
                    id: application.id || applicationInfo.id,
                    savedAt: new Date()
                })
        }
    }

    useEffect(() => {
        currentUser && db
            .collection('users')
            .doc(currentUser.uid)
            .collection('saved')
            .onSnapshot((snapshot) => {
                const id = snapshot.docs.map(doc => doc.id)
                if (id.indexOf(application.id || applicationInfo.id) > -1) {
                    setIsSaved(true)
                } else {
                    setIsSaved(false)
                }
            })
    }, [currentUser, application, applicationInfo])

    if (loading) return

    return (
        <div className="companyApplicationItemContainer">
            <img alt='logo' width={34} height={34} src={activeCompany.company_image} />
            <div className="companyApplicationItem">
                <div className="companyApplicationInfo">
                    <p>{applicationInfo.job_title || application.job_title}</p>
                    <span>•</span>
                    <p>{activeCompany.company_name}</p>
                </div>
                <p>{applicationInfo.address?.city || application.address?.city}, {applicationInfo.address?.province || application.address?.province}, Nederland</p>
                <p>{applicationInfo.description || application.description}</p>
            </div>
            <div className="userProfileItemActions">
                <IconButton className="userProfileAction" onClick={() => changeSavedState()}>
                    {isSaved ? <FaHeart size='19px' color='var(--lightRed)' /> : <FaRegHeart size='19px' color='var(--lightRed)' />}
                </IconButton>
                <IconButton className="userProfileAction">
                    <TbRocket size='22px' color='var(--primary)' />
                </IconButton>
                <IconButton className="userProfileAction" onClick={() => navigate(`/vacatures/${application.id || applicationInfo.id}`)}>
                    <TbChevronRight size='22px' color='black' />
                </IconButton>
            </div>
        </div>
    )
}