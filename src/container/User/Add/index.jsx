import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-apollo'
import {
  EuiText,
  EuiSwitch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiButton,
  EuiFieldText
} from '@elastic/eui'

import { getStringStatus } from '../../../utils/helperMethods'
import { ADD_USER } from '../../../utils/schemas/user'
import './style.css'

const AddUser = ({ appendUser }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState(true)
  const [addUser, { error, loading, data: { addUser: newUser } = {} }] = useMutation(ADD_USER)

  useEffect(() => appendUser(newUser), [newUser])

  const addUserDetails = e => {
    e.preventDefault()
    addUser({ variables: { email, name, status: getStringStatus(status) } })
    setEmail('')
    setName('')
    setStatus(true)
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <div className="Add-div">
      <EuiText grow={false}>
        <h1>Add User</h1>
      </EuiText>
      <form onSubmit={addUserDetails} className="Add-form">
        <EuiFlexGroup className="Flex-group">
          <EuiFlexItem>
            <EuiFormRow label="Email">
              <EuiFieldText
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="Add-textfield"
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Name">
              <EuiFieldText
                id="name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="Add-textfield"
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Status">
              <EuiSwitch
                label="User Active"
                id="status"
                name="status"
                checked={status}
                onChange={e => setStatus(e.target.checked)}
                className="Add-switch"
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFormRow hasEmptyLabelSpace>
              <EuiButton fill type="submit" isLoading={loading}>Add User</EuiButton>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </form>
    </div>
  )
}

export default AddUser
