import React from 'react'
import MessageForm from './MessageForm'
import MyMessage from './MyMessage'
import TheirMessage from './TheirMessage'

const ChatFeed = (props) => {
     console.log(props)
    const {chats , activeChat , userName , messages} = props
    const chat = chats && chats[activeChat] // if chat exists find the active chat
     console.log( userName ,'Message')

     const renderReadReceipts = (message , isMyMessage) =>{ 
         console.log('Chaaaaat' , chat)
         return chat.people.map((person , index) => person.last_read === message.id && (
             <div 
               key = {`read_${index}`}
               className = 'read-receipt'
               style = {{
                   float : isMyMessage ? 'right' : 'left' ,
                   backgroundImage :  person.person.avatar ? `url(${person.person.avatar})` : null ,
                   backgroundColor : !person.person.avatar ? 'rgb(85,5,39)' : null ,
                   display:'flex' ,
                   alignItems:'center' ,
                   justifyContent:'center'
               }}
             >
             <div style = {{color:'white'}}>{!person.person.avatar && `${person.person.first_name.charAt(0)}`}</div>    
             </div>
         ))}

    const renderMessages = () => {
        const keys = Object.keys(messages)
        //  console.log(keys)

        return keys.map((key , index) => {
            const message = messages[key]
            const lastMessageKey = index === 0 ? null : keys[index - 1]
            const isMyMessage = userName === message.sender.username

            return (
                <div key = {`msg_${index}`} style = {{width:'100%'}}>
                    <div className = 'message-block'>
                        {
                            isMyMessage ? <MyMessage message = {message} /> : <TheirMessage message = {message} lastMessageKey = {messages[lastMessageKey]} />
                        }
                    </div>
                    <div className = 'read-receipts' style = {{ marginRight: isMyMessage ? '18px' : '0px' , marginLeft: isMyMessage ? '0px' : '68px' }}>
                        {renderReadReceipts(message , isMyMessage)}
                    </div>
                </div>
            )
        })
    }

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        window.location.reload()
    }

    if(!chat) return <div />

    return (
        <div className = 'chat-feed'>
            <div className = 'chat-title-container'>
                <div className = 'chat-title'>{chat?.title}</div>
                <button className = 'button' onClick = {handleLogout}>Logout</button>
                <div className = 'chat-subtitle'>
                    {chat.people.map((person) => ` ${person.person.username}`)}
                </div>
            </div>
            {renderMessages()}
            <div style = {{height:'100px'}}></div>
            <div className = 'message-form-container'>
                <MessageForm {...props} chatId = {activeChat} />
            </div>
        </div>
    )
}

export default ChatFeed
