import { IconButton } from '@mui/material'
import { TbBriefcase, TbCurrentLocation, TbMapPin } from 'react-icons/tb'
import './EnableNotificationBig.css'

export default function EnableNotificationBig({ activeCompany }) {
    return (
        <div className="secondFragment" style={{ padding: 20 }}>
            <div className='enableAlertsInfo'>
                <p>Vacature meldingen inschakelen</p>
                <p>Schakel meldingen in wanneer {activeCompany.company_name} een relevante vacature plaatst.</p>
            </div>
            <div className="divider" style={{ width: '100%', margin: '20px 0' }} />
            <div className="flexbox">
                <div className='companyLogoContainerSmall'>
                    <img alt='company' width={22} height={22} src={activeCompany.company_image} />
                </div>
                <div className="largeAlertInput">
                    <TbBriefcase />
                    <input placeholder='Functie titel...' />
                </div>
                <div className="largeAlertInput" style={{ paddingRight: 6 }}>
                    <TbMapPin />
                    <input placeholder='Locatie...' />
                    <IconButton className='currentLocation'>
                        <TbCurrentLocation />
                    </IconButton>
                </div>
                <button className="addAlerts">
                    Inschakelen
                </button>
            </div>
        </div>
    )
}