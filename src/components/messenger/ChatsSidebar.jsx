import './styles.css'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { IconButton } from '@material-ui/core'
import { AiOutlineSearch } from 'react-icons/ai'
import RecentChat from './RecentChat'

const ChatsSidebar = ({ setNewChat, chatsSnapshot, setActiveChat, data }) => {
    return (
        <div className='chat_sidebar_container'>
            <div className='chat_sidebar_header'>
                <b>Berichten</b>
                <IconButton style={{ padding: 5 }} onClick={() => setNewChat(true)}><IoIosAddCircleOutline color='#2D88FF' size='1.2em' /></IconButton>
            </div>
            <div className="sidebar_input_container" style={{ width: '94%', marginTop: 20 }}>
                <input className="sidebar_input" placeholder="Zoeken..." type="text"></input>
                <AiOutlineSearch style={{ marginRight: 10, fontSize: '1.2em' }} />
            </div>
            {chatsSnapshot?.docs.map((chat) => (
                <RecentChat key={chat.id} id={chat.id} users={chat.data().users} setActiveChat={setActiveChat} />
            ))}
        </div>
    )
}

export default ChatsSidebar