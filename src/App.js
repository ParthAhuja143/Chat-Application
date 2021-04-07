import React from 'react'
import {ChatEngine} from 'react-chat-engine'

import './App.css'
import ChatFeed from './components/ChatFeed'
import LoginForm from './components/LoginForm'

const App = () => {

  if(!localStorage.getItem('username')) return <LoginForm/>

  return (
    <ChatEngine
      height = '100vh'
      projectID = '1ee3f072-644a-40e4-baa6-44f045733a60'
      userName = {localStorage.getItem('username')}
      userSecret = {localStorage.getItem('password')}
      renderChatFeed = {(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  )
}

export default App
