import "reflect-metadata";
import Container from 'typedi'
import { createConnection, useContainer } from 'typeorm'

import express from 'express'
import { TYPEORMConfig } from "./config";
import buildApolloServer from './apollo'
import cors from 'cors'
import auth from "./middlewares/auth";
import { SERVER_PORT } from "./config/envVariables";

console.log(process.env.NODE_ENV)

useContainer(Container)

const main = async () => {
  try {
    await createConnection({
      ...TYPEORMConfig,
    })

    const apollo = await buildApolloServer()

    const app = express()
    app.use(
      cors({
        credentials: true,
      }),
    );
    
    // app.use(auth)

    apollo.applyMiddleware({ app })

    app.get('/', (req, res) => res.send('Express + TypeScript Server'));

    app.listen(SERVER_PORT, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${SERVER_PORT}`)
    })
  } catch (e) {
    console.error(e)
  }
}

main();
