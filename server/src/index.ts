import "reflect-metadata";
import Container from 'typedi'
import { createConnection, useContainer } from 'typeorm'

import express from 'express'
import { TYPEORMConfig } from "./config";
import buildApolloServer from './apollo'
import cors from 'cors'
import auth from "./middlewares/auth";

const app = express()
const PORT = 8000

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
    
    app.use(auth)

    apollo.applyMiddleware({ app })

    app.get('/', (req, res) => res.send('Express + TypeScript Server'))
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
    })
  } catch (e) {
    console.error(e)
  }
}

main();
