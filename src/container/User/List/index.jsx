import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from "react-apollo"
import {
  EuiInMemoryTable,
  EuiHealth,
  EuiText
} from '@elastic/eui'

import { GET_USERS, DELETE_USER } from '../../../utils/schemas/user'
import './style.css'

const UserList = ({ newUsers }) => {
  const [users, setAllUsers] = useState(null)
  const [sort, setSort] = useState({ field: 'name', direction: 'asc' })
  const [deleteUser] = useMutation(DELETE_USER)
  const { loading: isLoading, error: fetchError, data: fetchedUsers   = {} } = useQuery(GET_USERS)

  useEffect(() => {  
    const { allUsers } = fetchedUsers
    let userList = []
    if (allUsers && allUsers.length > 0) userList = allUsers
    if (newUsers.length > 0) userList = [...userList, ...newUsers]
    userList.forEach(user => user.online = user.status === 'Active' ? true : false )
    setAllUsers(userList)
  }, [fetchedUsers, newUsers])


  const onTableChange = ({ sort: { field, direction } = {} }) => 
  {
    
    setSort({ field, direction })
  }

  const renderStatus = online => {
    const color = online ? 'green' : 'red'
    const label = online ? 'Online' : 'Offline'
    return <EuiHealth color={color}>{label}</EuiHealth>
  }

  const search = {
    filters: 
          [{
            type: 'is',
            field: 'online',
            name: 'Online',
            negatedName: 'Offline',
          }]
        }

  const columns = [
    {
      field: 'name',
      name: 'Full Name',
      sortable: true,
      truncateText: true,
      header: false,
      enlarge: true,
      fullWidth: true,
    },
    {
      field: 'email',
      name: 'Email',
      sortable: true,
      truncateText: true,
    },
    {
      field: 'online',
      name: 'Status',
      sortable: true,
      dataType: 'boolean',
      render: online => renderStatus(online),
    },
    {
      name: 'Actions',
      actions: [
        {
          name: 'Delete',
          description: 'Delete this user',
          type: 'icon',
          icon: 'cross',
          onClick: ({ id }) => deleteUser({ variables: { id } })
        }]
    }
  ]

  return (
    <div className="User-list">
      <EuiText grow={false}>
        <h1>Users</h1>
      </EuiText>
      <EuiInMemoryTable
        items={users || []}
        columns={columns}
        sorting={{ sort }}
        onChange={onTableChange}
        loading={isLoading}
        responsive
        noItemsMessage={users === [] ? 'No Items Found': ''}
        search={search}
        error={fetchError && "Failed to fetch the data"}
      />
    </div>
  )
}

export default UserList