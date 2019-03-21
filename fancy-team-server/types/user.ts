export default `
  type User {
    id: ID!
    name: String!
    email: String!
    firstName: String!
    lastName: String
    events: [Event]
    tshirtSize: String
  }
  type Query {
    user(id: String!): User
    users: [User]
  }
  type Mutation {
    addUser(name: String!, email: String!): User
    editUser(id: ID, name: String): User
    deleteUser(id: ID, name: String): User
  }
`;