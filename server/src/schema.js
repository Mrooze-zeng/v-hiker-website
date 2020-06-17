import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

const allTypes = fileLoader(path.join(__dirname, "./graphql/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "./resolvers/**/*.js"));

const mergedTypes = mergeTypes(allTypes);
const mergedResolvers = mergeResolvers(allResolvers);

export default makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});
