# React Test Task

## Introduction
This simple UI is for showing a User list and adding users using graphql-faker.

### Steps to clone the repository

```
git clone git@github.com:mmpatel/react-graphql-users.git
cd react-graphql-users

```
## [Method 1] Installing and Running the app locally

### Steps to install packages
In the project directory's terminal run below command to install all the required packages
```
yarn
```
### Step to setup env variables

```
Create a .env file in the project directory. In this file copy over the contents as is from the .env.example file to have the necessary environment variables set
```


### Steps to start graphql-faker

* To install the graphql-faker app
    ```
    npm install -g graphql-faker
    ```
* To run the application
    ```
    graphql-faker --open
    ```
* To setup the SDL for GraphQl go to http://localhost:9002/editor/ and paste

    ```
    type User {
    id: ID!
    name: String @fake(type:fullName)
    email: String @fake(type:email)
    status: String @examples(values: ["Active", "Inactive"])
    }

    type Query {
    allUsers: [User!]! @listLength(min: 1, max: 3)
    }

    type Mutation {
    addUser(name: String!, email: String!, status: String!): User!
    removeUser(userId: String!): User!
    }
    ```
### Step to start the app

In the project directory terminal run the below command
```
yarn run start
```

## [Method 2] To run via docker

Please install docker and docker-compose

Then Run:
```
docker-compose up --build
```
## Assumptions and Considerations

* The Adding feature and the Listing feature have been displayed together. This was done since the faker api generates random data and I wanted to show the newly added data as is.