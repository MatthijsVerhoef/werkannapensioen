import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"
import { auth } from "../../data/Firebase"

const SingleMessage = ({ currentUser }) => {
    const user = currentUser?.uid
    const TypeOfMessage = user === currentUser?.uid ? Sender : Receiver;

    return (
        <div>
            <TypeOfMessage>
                Dit is een bericht
                {/* <Timestamp>{message.timestamp ? moment(message.timestamp).format('LT') : '...'}</Timestamp> */}
            </TypeOfMessage>
        </div>
    )
}

export default SingleMessage

const MessageElement = styled.p`
width: fit-content;
padding: 15px;
border-radius: 20px;
margin: 20px;
min-width: 60px;
padding-bottom: 26px;
position: relative;
text-align: right;
`

const Sender = styled(MessageElement)`
background-color: #2D88FF;
color: white;
margin-left: auto;
border-bottom-right-radius: 5px;
`

const Receiver = styled(MessageElement)`
background-color: #E1E0E0;
color: black;
text-align: left;
border-bottom-left-radius: 5px;
`

const Timestamp = styled.span`
color: white;
padding: 8px;
font-size: 10px;
position: absolute;
bottom: 0;
text-align: right;
right: 5px;
`