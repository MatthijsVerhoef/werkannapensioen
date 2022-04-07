import './styles.css'
import { IoVideocamOutline } from 'react-icons/io5'
import { BsThreeDots } from 'react-icons/bs'
import { Avatar, IconButton } from '@material-ui/core'
import getRecipientId from './getRecipientId'
import db from '../../data/Firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useState } from 'react'

const ChatsHeader = ({ chat, messages, currentUser, data }) => {
    const [menu, setMenu] = useState(false)
    const [recipientSnapshot] = useCollection(
        data && db.collection('users').where('uid', '==', getRecipientId(data?.users))
    )
    const recipient = recipientSnapshot?.docs?.[0]?.data()

    return (
        <div className='chats_header_container'>
            {recipient ?
                <>
                    <Avatar src={recipient.photoURL} className='chats_header_container_avatar'></Avatar>
                    <div>
                        <p>{recipient.firstName} {recipient.lastName}</p>
                        <p>{recipient.usersCompany}, {recipient.usersJob}</p>
                    </div>
                    <div className='chats_header_container_actions'>
                        <IconButton style={{ marginRight: 10 }}><IoVideocamOutline color='#2D88FF' size='1.2em' /></IconButton>
                        <IconButton style={{ width: 'fit-content', height: 'fit-content', position: 'relative' }} onClick={() => setMenu(current => !current)}><BsThreeDots color='#2D88FF' size='1.2em' /></IconButton>
                        {menu ?
                            <div className='chats_menu'>
                                <p>Chat verwijderen</p>
                                <p>Lorem ipsum</p>
                                <p>Lorem ipsum</p>
                            </div>
                            : null}
                    </div>
                </>
                : null}
        </div>
    )
}

export default ChatsHeader