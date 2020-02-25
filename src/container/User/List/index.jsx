import React, { useState } from 'react'
import { useMutation } from "react-apollo"
import {
  EuiInMemoryTable,
  EuiHealth,
  EuiText,
  EuiLink
} from '@elastic/eui'

import { DELETE_USER } from '../../../utils/schemas/user'
import './style.css'

const UserList = ({ userList, isLoading, error, removeUser }) => {
  const [sort, setSort] = useState({ field: 'name', direction: 'asc' })
  const [deleteUser] = useMutation(DELETE_USER)

  const onTableChange = ({ sort: { field, direction } = {} }) => setSort({ field, direction })

  /**
   * This should be the correct way to remove user from the list but 
   * the user ( and it's id) returned in the success event of delete
   * is not the same as the deleted user 
   */
  // useEffect(() => {
  //   if (deletedUser) removeUser(deletedUser.id)
  // }, [deletedUser])

  const handleDelete = id => () => {
    deleteUser({ variables: { userId: id }})
    removeUser(id)
  }

  const renderStatus = online => {
    const color = online ? 'green' : 'red'
    const label = online ? 'Online' : 'Offline'
    return <EuiHealth color={color}>{label}</EuiHealth>
  }

  const search = {
    filters: [{
      type: 'is',
      field: 'online',
      name: 'Online',
      negatedName: 'Offline'
    }]
  }

  const columns = [{
    field: 'name',
    name: 'Full Name',
    sortable: true,
    truncateText: true,
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
    actions: [{
      render: ({ id }) => {
        return (
          <EuiLink color="danger" onClick={handleDelete(id)}>
            Delete
          </EuiLink>
        )
    }}]
  }]

  return (
    <div className="User-list">
      <EuiText grow={false}>
        <h1>Users</h1>
      </EuiText>
      <EuiInMemoryTable
        items={userList || []}
        columns={columns}
        sorting={{ sort }}
        onChange={onTableChange}
        loading={isLoading}
        responsive
        noItemsMessage={userList === [] ? 'No Items Found': ''}
        search={search}
        error={error && "Failed to fetch the data"}
      />
    </div>
  )
}

export default UserList