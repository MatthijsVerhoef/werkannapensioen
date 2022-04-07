import { useState } from 'react'
import './styles/Footer.css'
import FooterData from '../../data/json/footerData.json'
import { Link } from 'react-router-dom'

function Footer() {
    const [footerData] = useState(FooterData)

    return (
        <div className="footer_container">
            <div className="footer_content">
                <p>Logo placeholder</p>
                <div className="footer_links">
                    {footerData.map(({ id, title, links }) => {
                        return <div className="footer_grid" key={id}>
                            <h4>{title}</h4>
                            {links.map((link) => (
                                <p key={link.title}><Link to={link.to} style={{ textDecoration: 'none', color: 'black' }}>{link.title}</Link></p>
                            ))}
                        </div>
                    })}
                </div>
            </div>
            <hr />
            <div className="legal_links">
                <p>C2021 by MAVE</p>
                <p>Privacystatement</p>
                <p>Algemene voorwaarden</p>
                <p>Cookiebeleid</p>
            </div>
        </div>
    )
}

export default Footer
