import React from 'react'

const TheirMessage = ({lastMessage , message}) => {

    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username

    return (
        <div className = 'message-row'>
            {isFirstMessageByUser && (
               <div 
               className = 'message-avatar'
               style = {{backgroundImage : `url(${message?.sender?.avatar})` ,
                         backgroundColor : 'rgb(85,5,39)',
                         display:'flex' ,
                         alignItems:'center' ,
                         justifyContent:'center'
                        }}
               >
                 <div>{!message.sender.avatar && `${message.sender.username.charAt(0)}`}</div>
               </div>
            )}
         {   message?.attachments?.length > 0 ?
                (
                    <img className = 'message-image' style = {{marginLeft : isFirstMessageByUser ? '4px' : '48px'}} src={message.attachments[0].file} alt="message-attachment"/>
                ) : 
                (
                    <div
                        className = 'message'
                        style = {{float:'left' , backgroundColor:'#CABCDC',marginLeft : isFirstMessageByUser ? '4px' : '48px' }}
                    >
                        {message.text}
                    </div>
                )
                }
        </div>
    )
}

export default TheirMessage
