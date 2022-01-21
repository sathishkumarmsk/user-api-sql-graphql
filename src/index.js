import express from 'express';
import path from 'path';
import http from 'http';
import cors from 'cors';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import db from './models';

async function startApolloServer() {

    const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './schema')));
    const resolvers = mergeResolvers(
        loadFilesSync(path.join(__dirname, './resolvers')),
    );

    const app = express();
    const port = 8000;
    
    app.use(cors());
    
    // app.use(express.json());
    // app.use('/', (req, res) => res.send('Hello CHaal'));
    
    const httpServer = http.createServer(app);
    
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground()
        ],
        context: ({ req, res }) => ({
            db,
            req,
            res,
        }), 
    })
    
    await server.start();
    server.applyMiddleware({ app });
    
    db.sequelize.sync().then(() => {
        httpServer.listen(port, () => console.log(`Running on http://localhost:${port}${server.graphqlPath}`));
    });
}

startApolloServer();