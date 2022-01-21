
import bcrypt from 'bcrypt';
export default {
    Query: {
        getUsers: async(_, __, { db }) => db.user.findAll(),
        getMoviesById: async(_, { id }, { db }) => db.user.findByPk(id),

    },
    Mutation: {
        createUser: async(_, { email, password }, { db }) => {
            try {
               
                const userData = await db.user.findOne({ where: { email } });
                // console.log('check user exist', userData);
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
        
        loginUser: async(_, { email, password }, { db }) => {
            try {
             
                const loginData = await db.user.findOne({ where: { email} });

                if  (loginData === null) {
                    return ({msg: "Email not found"});
                }

                const convertString = JSON.stringify(loginData);
                const passwordData = JSON.parse(convertString);

                const hash = bcrypt.compareSync(password, passwordData.password);

                if (hash === true) {
                    return true;
                }
                return false;
            }  catch (error) {
                console.log(error);
            }; 
        },
        deleteUser: async(_, { id }, { db }) => {
            try {
                const userData = await db.user.destroy({
                    where: { id }, 
                })
                if (userData) {
                    return true;

                }
                return false;
            }
            catch (error) {
                console.log(error);
            }
        },
        
    }
}
