import ApolloClient from "apollo-boost";

const uri = process.env.GRAPHQL_URL || "http://localhost:4000/graphql";

const client = new ApolloClient({
  uri
});

export default client;
