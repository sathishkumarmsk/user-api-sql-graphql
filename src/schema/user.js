export default `
    type User {
        id: Int
        email: String
        password: String
        verified: Boolean
        blocked: Boolean
    }

    type Query {
        getUsers: [User]
        getUsersById(id: String): User

    }

    type Mutation {
        createUser(
            email: String!,
            password: String!

        ): User
        loginUser(
            email: String!,
            password: String!
        ): Boolean
        deleteUser(id: Int!): Boolean
    }
`;