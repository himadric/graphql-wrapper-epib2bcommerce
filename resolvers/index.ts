import * as path from 'path'
//import { fileLoader } from 'merge-graphql-schemas'
import { loadFilesSync } from '@graphql-tools/load-files';

const resolvers = loadFilesSync(path.join(__dirname, './**/*.resolvers.*'))

export default resolvers