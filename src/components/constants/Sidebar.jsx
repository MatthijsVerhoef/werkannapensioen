import { useState, useEffect, useRef } from 'react'
import './styles/Sidebar.css'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import { IoIosFolder, IoIosChatbubbles, IoIosHeart, IoIosAlbums } from 'react-icons/io'
import db, { auth } from '../../data/Firebase'
import 'tippy.js/dist/tippy.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import Logo from '../../data/images/logo.svg'
import { useCollection } from 'react-firebase-hooks/firestore'

function Sidebar() {
    const [currentUser] = useAuthState(auth)
    const [placedApplications, setPlacedApplications] = useState([])
    const isMounted = useRef(false)
    const userChatRef = currentUser &&  db.collection('chats').where('users', 'array-contains', currentUser?.uid)
    const [chatsSnapshot] = useCollection(userChatRef)

    useEffect(() => {
        isMounted.current = true
        const fetchPlacedPosts = () => {
            currentUser && db
                .collection('posts')
                .where('placedby', '==', currentUser.uid)
                .onSnapshot(snapshot => {
                    if (isMounted.current) {
                        setPlacedApplications(snapshot.docs.map(doc => ({
                            id: doc.id,
                            post: doc.data()
                        })))
                    }
                })
        }
        fetchPlacedPosts()
        return () => (isMounted.current = false)
    }, [currentUser])

    return (
        <div className="sideBar">
            <Link to="" className="logoLink"><div className="webLogo" style={{backgroundImage: `url(${Logo})`}}></div></Link>
            <div className="sideBarContent">
                <NavLink to='/account' className="sideBarAvatar"><li className="sideAvatarContainer"><Avatar className="sideAvatar" src={currentUser ? currentUser.photoURL : null} /></li></NavLink>
                <NavLink to='/applications' className="sideBarBtn"><li><IoIosFolder className="sideBarIcon" size="2.2em" /></li></NavLink>
                <NavLink to='/saved' className="sideBarBtn"><li className="sideBarIcon"><IoIosHeart size="2.2em" /></li></NavLink>
                {placedApplications.length > 0 ? <NavLink to='/manage' className="sideBarBtn"><li className="sideBarIcon"><IoIosAlbums size="2.2em" /></li></NavLink> : null}
                <Link to={`/chats/${!chatsSnapshot ? '/chats' : chatsSnapshot?.docs[0].id}`} className="sideBarBtn"><li className="sideBarIcon"><IoIosChatbubbles size="2.2em" /></li></Link>
            </div>
        </div>
    )
}

export default Sidebar