import { IoIosClose } from 'react-icons/io'
import { NavLink } from 'react-router-dom';
import { auth } from '../../../data/Firebase';
import { Avatar } from '@material-ui/core'
import '../Styles/HeaderMenu.css'

const HeaderMenu = ({ setShowLogin, currentUser, setOptions }) => {
    return (
        <>
            <div className="headerBlur" onClick={() => setOptions(false)}></div>
            <div className="optionsMenu">
                <IoIosClose size="2.4em" onClick={() => setOptions(false)} style={{ position: 'absolute', right: 15, cursor: 'pointer' }} />
                {currentUser ?
                    <div className="userInfo">
                        {currentUser.photoURL ? <Avatar className="home_menu_avatar" src={currentUser.photoURL} /> : <p>{currentUser.displayName[0]}</p>}
                        <p>{currentUser.displayName}</p>
                        <div className="topBorder"></div>
                        <NavLink to="/account" style={{ textDecoration: 'none', color: 'black' }}><div className="infoWindowBtn">Mijn account</div></NavLink>
                        <NavLink to="/manage" style={{ textDecoration: 'none', color: 'black' }}><div className="infoWindowBtn">Mijn opdrachten</div></NavLink>
                        <div className="infoWindowBtn">Hulp</div>
                        <p onClick={() => auth.signOut()}>Uitloggen</p>
                    </div>
                    :
                    <div className="userInfo">
                        <div className="home_menu_avatar"></div>
                        <div className="topBorder"></div>
                        <div className="infoWindowBtn" onClick={() => {setShowLogin(true) && setOptions(false)}}>Inloggen</div>
                        <div className="infoWindowBtn" onClick={() => setShowLogin(true)}>Aanmelden</div>
                        <div className="infoWindowBtn">Hulp</div>
                    </div>
                }
            </div>
        </>
    );
};

export default HeaderMenu;
