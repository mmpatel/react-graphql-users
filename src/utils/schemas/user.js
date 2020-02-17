import { gql } from "apollo-boost"

const User = `{ id name email status }`

export const GET_USERS = gql`
  query {
    allUsers ${User}
  }
`

export const DELETE_USER = gql`
  mutation ($id: String!) {
    removeUser(id: $id)
  }
`
export const ADD_USER = gql`
  mutation addUser($email: String!, $name: String!, $status: String!) {
    addUser(email: $email, name: $name, status: $status) ${User}
  }
`