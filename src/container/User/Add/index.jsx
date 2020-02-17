import React, { useState, Fragment } from 'react'
import { useMutation } from 'react-apollo'
import {
  EuiText,
  EuiSwitch,
  EuiFieldText,
  EuiButton,
  EuiSpacer
} from '@elastic/eui'

import { ADD_USER } from '../../../utils/schemas/user'

const AddUser = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState(true)
  const [addUser, { error, loading }] = useMutation(ADD_USER)

  const addUserDetails = () => addUser({ variables: { email, name, status: status ? 'Active': 'Inactive' } })

  if (error) {
    return <div>Error</div>
  }

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (  
    <Fragment>
      <EuiText grow={false}>
        <h1>Add User</h1>
      </EuiText>
      <EuiFieldText
        placeholder="Email"
        id="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <EuiFieldText
        placeholder="Name"
        id="name"
        name="name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <EuiSpacer size="m" />
      <EuiSwitch
        label="User Active"
        id="status"
        name="status"
        checked={status}
        onChange={e => setStatus(e.target.checked)}
      />
      <EuiSpacer size="m" />
      <EuiButton fill onClick={addUserDetails} color="primary">
        Add User
      </EuiButton>
    </Fragment>
  )
}

export default AddUser
