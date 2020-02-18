import React, { Fragment, useState } from 'react'

import UserList from './container/User/List'
import AddUser from './container/User/Add'

function App() {
  const [addedUsers, setAddedUsers] = useState([])

  const appendUsers = (newUser) => newUser && setAddedUsers([...addedUsers, newUser])

  return (
    <Fragment>
      <AddUser appendUser={appendUsers}/>
      <UserList newUsers={addedUsers}/>
    </Fragment>
  )
}

export default App
