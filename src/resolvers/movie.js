export default {
    Query: {
        getMovies: async(_, __, { db }) => db.movie.findAll(),
        getMoviesById: async(_, { id }, { db }) => db.movie.findByPk(id),
    },
    Mutation: {
        createMovie: async(_, { film, times }, { db }) => {
            try {
                const movieData = {
                    film,
                    times,
                    watched: times > 1 ? true: false,
                    createdOn: new Date().toDateString(),
                };
        
                const movie = await db.movie.create(movieData);    
            
                return movie;
            } catch (error) {
                console.log(error);      
            };
        },
        updateMovie: async(_, { id, film, times }, { db }) => {
            try {
                const movie = await db.movie.update({
                    film,
                    times,
                    watched: times > 1 ? true: false,
                }, {
                    where: {
                        id,
                    }
                });
        
                if (movie) {
                    return true;
                };

                return false;
            } catch (error) {
                console.log(error);
            }
        },
        deleteMovie: async(_, { id }, { db }) => {
            try {
                const movie = await db.movie.destroy({
                    where: { id },
                })
        
                if (movie) {
                    return true;
                }
            
                return false;
            } catch (error) {
                console.log(error);
            }
        },
    }
}