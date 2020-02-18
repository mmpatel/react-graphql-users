import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from "react-apollo"
import {
  EuiBasicTable,
  EuiHealth,
  EuiSelect,
  EuiText
} from '@elastic/eui'

import { GET_USERS, DELETE_USER } from '../../../utils/schemas/user'
import './style.css'

const UserList = ({ newUsers }) => {
  const [users, setAllUsers] = useState(null)
  const [sort, setSort] = useState({ field: 'name', direction: 'asc' })
  const [filter, setFilter] = useState(['Active', 'Inactive'])
  const [deleteUser] = useMutation(DELETE_USER)
  const { loading: isLoading, error: fetchError, data: fetchedUsers   = {} } = useQuery(GET_USERS)

  useEffect(() => {  
    const { allUsers } = fetchedUsers
    let userList = []
    if (allUsers && allUsers.length > 0) userList = allUsers
    if (newUsers.length > 0) userList = [...userList, ...newUsers]
    setAllUsers(userList)
  }, [fetchedUsers, newUsers])

  const options = [
    { text: 'All Users', value: ['Active', 'Inactive'] },
    { text: 'Only Active User', value: ['Active'] },
    { text: 'Only Inactive User', value: ['Inactive'] }
  ]

  const onTableChange = ({ sort: { field, direction } = {} }) => setSort({ field, direction })

  const renderStatus = active => {
    const color = active ? 'green' : 'red'
    const label = active ? 'Online' : 'Offline'
    return <EuiHealth color={color}>{label}</EuiHealth>
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
      field: 'status',
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


  if (fetchError) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="User-list">
      <EuiText grow={false}>
        <h1>Users</h1>
      </EuiText>
      <EuiSelect
        id="statusFilter"
        options={options}
        value={filter}
        onChange={({ target: { value } }) => setFilter(value)}
      />
      <EuiBasicTable
        items={users}
        columns={columns}
        sorting={{ sort }}
        onChange={onTableChange}
      />
    </div>
  )
}

export default UserList