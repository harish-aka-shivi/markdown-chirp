import { ApolloServer } from 'apollo-server-express'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import { AuthChecker, buildSchema } from 'type-graphql'
import Container from 'typedi'

import { IContext } from './interfaces/context';

// import { isAuth } from './utils/middlewares/isAuth'

export default async () => {
  const schema = await buildSchema({
    // authChecker,
    // globalMiddlewares: [isAuth],
    resolvers: [`${__dirname}/resolvers/**/*`],
    container: Container,
    emitSchemaFile: true,
  })

  const formatError = (error: GraphQLError): GraphQLFormattedError<Record<string, any>> => {
    // console.error(JSON.stringify(error, null, 2))
    return error
  }

  return new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, user: req.user, token: req.token }),
    formatError,
  })
}

// const authChecker: AuthChecker<IContext> = ({ context }) => {
//   return !!context.req.session?.userId
// }

// const ResolveTime: MiddlewareFn = async ({ info }, next) => {
//   const start = Date.now()
//   await next()
//   const resolveTime = Date.now() - start
//   console.log(`[${info.parentType.name}] ${info.fieldName} ${resolveTime}ms`)
// }
