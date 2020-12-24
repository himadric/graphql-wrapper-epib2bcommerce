import { GraphQLServer } from 'graphql-yoga'
import { default as typeDefs } from './typedefs'
import { default as resolvers } from './resolvers'
import config from 'config';

const PORT = process.env.PORT || config.get('graphqlServer.port');
const options = { port: PORT, cacheControl: true }

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server
  .start(options, () =>
    console.log(`Server is running ⚡ on localhost:${options.port}`),
  )
  .catch(err => console.error('connection Error', err))