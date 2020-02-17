import React, { useState, Fragment } from 'react'
import {
  EuiBasicTable,
  EuiHealth,
  EuiSelect
} from '@elastic/eui'
import { useQuery , useMutation } from "react-apollo"

import { GET_USERS, DELETE_USER } from '../../../utils/schemas/user'


const UserList = () => {
  const [sort, setSort] = useState({ field:'name', direction: 'asc'})
  const [filter, setFilter] = useState(['Active', 'Inacive'])
  const [deleteUser] = useMutation(DELETE_USER)
  const { loading: isLoading, error: fetchError, data } = useQuery(GET_USERS)

  const options = [
    { text: 'All Users', value: ['Active', 'Inacive']},
    { text: 'Only Active User', value: ['Active']},
    { text: 'Only Inactive User', value: ['Inacive']}
  ]

  const onTableChange = ({ sort: { field, direction } = {} }) => setSort({field, direction })

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
  <Fragment>
    <EuiSelect
      id="statusFilter"
      options={options}
      value={filter}
      onChange={({ target: { value } }) => setFilter(value)}
    />
    <EuiBasicTable
      items={data.allUsers}
      columns={columns}
      sorting={{sort}}
      onChange={onTableChange}
    />
  </Fragment>
)
}

export default UserList