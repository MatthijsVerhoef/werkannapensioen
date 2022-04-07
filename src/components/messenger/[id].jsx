import { useState, useEffect } from 'react'
import db from '../../data/Firebase'
import ChatsContent from './ChatsContent'
import ChatsFooter from './ChatsFooter'
import ChatsHeader from './ChatsHeader'
import { useParams } from 'react-router-dom'

const ChatsScreen = ({ currentUser, chat, messages }) => {
    const { id } = useParams()
    const [data, setData] = useState()
    const [input, setInput] = useState("")

    const sendMessage = () => {
      e.preventDefault()

      currentUser && db.collection('users').doc(currentUser.uid).set
    }

    useEffect(() => {
        const ref = id && db.collection("chats").doc(id);
        ref.get().then(DocumentSnapshot => {
            const docData = DocumentSnapshot.data();
            setData(docData);
        })
    }, [id])

    return (
        <div style={{ width: '100%', height: '98%' }}>
            <ChatsHeader currentUser={currentUser} chat={chat} messages={messages} data={data} />
            <ChatsContent currentUser={currentUser} chat={chat} messages={messages} id={id} />
            <ChatsFooter input={input} setInput={setInput} />
        </div>
    )
}

export default ChatsScreen

export async function getServerSideProps(context) {
    const ref = db.collection('chats').doc(context.query.id)
    const messagesRes = await ref
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .get()

    const messages = messagesRes.docs
        .map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
        .map((messages) => ({
            ...messages,
            timestamp: messages.timestamp.toDate().getTime()
        }))

    const chatRes = await ref.get()
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }

    console.log(chat, messages)

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        }
    }
}