import './styles.css'
import { IoIosSend } from 'react-icons/io'

const ChatsFooter = ({ input, setInput }) => {
  return (
    <div className='chats_footer_container'>
      <input placeholder='Typ een bericht...' className='chats_footer_input' value={input} onChange={e => setInput(e.target.value)}></input>
      <button className='chats_footer_action' style={{fontSize: 15}}>Verzenden <IoIosSend style={{marginLeft: 10}} size="24px" /></button>
    </div>
  )
}

export default ChatsFooter