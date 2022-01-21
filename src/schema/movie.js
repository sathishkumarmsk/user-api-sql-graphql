export default `
    type Movie {
        id: String
        film: String
        times: Int
        watched: Boolean
        createdOn: String
    }

    type Query {
        getMovies: [Movie]
        getMoviesById(id: String): Movie
    }

    type Mutation {
        createMovie(
            film: String!,
            times: Int!
        ): Movie
        updateMovie(
            id: Int!,
            film: String,
            times: Int,
        ): Boolean
        deleteMovie(id: Int!): Boolean
    }
`;