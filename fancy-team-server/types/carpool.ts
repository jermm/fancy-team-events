
export default `

type CarpoolDriver {
    id: ID!
    driver: User
    event: Event
    noOfPassengers: Int
    passengers: [User]  
}

type Query {
  carpoolDrivers(eventId: ID!): [CarpoolDriver]
}

type Mutation {
  addCarpoolDriver(userId: ID) : CarpoolDriver
`;