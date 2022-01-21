
import bcrypt from 'bcrypt';
export default {
    Query: {
        getUsers: async(_, __, { db }) => db.user.findAll(),
        getMoviesById: async(_, { id }, { db }) => db.user.findByPk(id),

    },
    Mutation: {
        createUser: async(_, { email, password }, { db }) => {
            try {
                const user = {
                    email,
                    password,
                }
                const userData = await db.user.findOne({ where: { email } });
                console.log('check user exist', userData);
                if (userData === null) {
                    const encryptedPassword = bcrypt.hashSync(password, 10);
                    console.log('Hashed password', encryptedPassword);
                    const createdUser = await db.user.create({
                        email,
                        password: encryptedPassword,

                    });
                    return createdUser;
                    
                }
                return ({ msg: 'User already exist' });
            }  catch (error) {
                console.log(error);      
            };
        },
        /*
        loginUser: async(_, { email, password }, { db }) => {
            try {
                const login = {
                    email,
                    password,
                
                }, 
                }
                   

            }
        }
        */
    }
}
