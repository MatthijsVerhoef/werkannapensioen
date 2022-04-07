import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import db, { auth } from '../../data/Firebase'
import SingleMessage from './SingleMessage'
import './styles.css'

const ChatsContent = ({ chat, messages, id }) => {
  const [currentUser] = useAuthState(auth)
  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'asc'))

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map(message => (
        <SingleMessage
          key={message.id}
          user={message.data().user}
          currentUser={currentUser}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime()
          }} />
      ))
    }
  }

  return (
    <div className='chats_content_container'>
      {showMessages()}
    </div>
  )
}

export default ChatsContent