import React, { useState, useCallback } from 'react'

import UserList from './container/User/List'
import AddUser from './container/User/Add'
import './App.css'

function App() {
  const [addedUsers, setAddedUsers] = useState([])

  const appendUsers = (newUser) => newUser && setAddedUsers([...addedUsers, newUser])

  return (
    <div className="App">
      <AddUser appendUser={appendUsers}/>
      <UserList newUsers={addedUsers}/>
    </div>
  )
}

export default App
