import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import ChatsSidebar from '../../components/messenger/ChatsSidebar'
import SelectReceiver from '../../components/messenger/SelectReceiver'
import { PostContext } from '../../data/context/PostContext'
import db, { auth } from '../../data/Firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import './styles.css'
import ChatsScreen from '../../components/messenger/[id]'

const Messenger = () => {
    const [currentUser] = useAuthState(auth)
    const [newChat, setNewChat] = useState(false)
    const userChatRef = currentUser &&  db.collection('chats').where('users', 'array-contains', currentUser.uid)
    const [chatsSnapshot] = useCollection(userChatRef)
    const { posts } = useContext(PostContext);
    const [iets, setIets] = useState()
    const [activeChat, setActiveChat] = useState()

    useEffect(() => {
        const userPosts = posts.filter(post => post.post.placedby === currentUser.uid)
        const postApplicants = userPosts.filter((post => post.post.applicants))
        setIets(postApplicants)
    }, [posts, currentUser])

    return (
        <div className='chat_page_container'>
            <div className='chats_sidebar'>
                <ChatsSidebar setActiveChat={setActiveChat} currentUser={currentUser} setNewChat={setNewChat} chatsSnapshot={chatsSnapshot} />
            </div>
            <div className='chats_content'>
                {newChat ?
                    <SelectReceiver setNewChat={setNewChat} posts={iets} chatsSnapshot={chatsSnapshot} />
                    :
                    <ChatsScreen currentUser={currentUser} activeChat={activeChat}  />
                }
            </div>
        </div>
    )
}

export default Messenger