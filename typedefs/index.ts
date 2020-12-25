import * as path from "path";
//import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const typesArray = loadFilesSync(path.join(__dirname, "./"));
const typesMerged = mergeTypeDefs(typesArray);

export default typesMerged;