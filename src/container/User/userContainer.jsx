import React from 'react'
import { useQuery } from "react-apollo"
import UserPage from './userPage'

import { GET_USERS } from '../../utils/schemas/user'

const UserContainer = () => {
  const { loading: isLoading, error: fetchError, data: fetchedUsers = {} } = useQuery(GET_USERS)
  return (
    <UserPage isLoading={isLoading} error={fetchError} userList={fetchedUsers} />
  )
}

export default UserContainer