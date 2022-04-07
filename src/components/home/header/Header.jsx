import { useState } from 'react';
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import '../Styles/Header.css'
import { auth } from '../../../data/Firebase'
import HeaderMenu from './HeaderMenu'
import Logo from '../../../data/images/logo.svg'

const Header = ({ setShowLogin }) => {
    const [options, setOptions] = useState(false)
    const [currentUser] = useAuthState(auth)

    return (
        <>
            {options ? <HeaderMenu currentUser={currentUser} setOptions={setOptions} setShowLogin={setShowLogin}/> : null}
            <div className="header_container">
                <div className="header_background"></div>
                <div className="header">
                    <div className="hero_logo" style={{backgroundImage: `url(${Logo})`}}></div>
                    <p className='hero_logo_text'>Werken na je pensioen</p>
                    <div className="nav_menu">
                        <NavLink to='/' className="nav_link" activeclassname="nav_link_active"><p>Home</p></NavLink>
                        <NavLink to='/applications' className="nav_link"><p>Dashboard</p></NavLink>
                        <NavLink to='/hoe-het-werkt' className="nav_link" activeclassname="nav_link_active"><p>Hoe het werkt</p></NavLink>
                        <NavLink to='/werknemers' className="nav_link" activeclassname="nav_link_active"><p>Voor jou</p></NavLink>
                        <NavLink to='/bedrijven' className="nav_link" activeclassname="nav_link_active"><p>Voor bedrijven</p></NavLink>
                    </div>
                    <HiOutlineMenuAlt3 size="2em" className="menuIcon" onClick={() => setOptions(current => !current)} />
                </div>
            </div>
        </>
    );
};

export default Header;
