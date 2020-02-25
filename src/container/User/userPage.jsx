import React, { Fragment, useState, useEffect, useCallback } from 'react'

import AddUser from './Add'
import UserList from './List'
import { getBooleanStatus } from '../../utils/helperMethods'

const UserPage = ({
  isLoading,
  error,
  userList: { allUsers }
}) => {
  const [addedUsers, setAddedUsers] = useState([])
  const [users, setAllUsers] = useState(null)
  const appendUsers = newUser => newUser && setAddedUsers([...addedUsers, newUser])
  const [deletedIds, setDeletedIds] = useState([])

  const removeUser = useCallback(id => {
    setDeletedIds([...deletedIds, id])
    setAllUsers(users.filter(user => user.id !== id))
  },[users])

  useEffect(() => {  
    let userList = []
    if (allUsers && allUsers.length > 0) userList = allUsers
    if (addedUsers.length > 0) userList = [...userList, ...addedUsers]
    const deletedFilteredList = userList.filter((user) => {
      user.online = getBooleanStatus(user.status)
      return deletedIds.indexOf(user.id) === -1
    })
    setAllUsers(deletedFilteredList)
  }, [addedUsers, allUsers, deletedIds])

  return (
    <Fragment>
      <AddUser appendUser={appendUsers} />
      <UserList userList={users} isLoading={isLoading} error={error} removeUser={removeUser}/>
    </Fragment>
  )
}

export default UserPage