export const typeDef = `
  extend type Query {
    author(firstName: String): Author!
    authors: [Author]!
  }

  extend type Mutation {
    createAuthor(firstName: String!, lastName: String!): Author
  }

  type Author {
    id: ID!
    firstName: String
    lastName: String

    books(limit: Int, offset: Int): [Book]
  }
`;

export const resolvers = {
  Query: {
    author(_, { firstName = "" }) {
      return {
        id: "abc123",
        firstName: "foo",
        lastName: "bar"
      };
    },
    authors: () => ({})
  },
  Mutation: {
    async createAuthor(root, args) {
      return {};
    }
  },
  Author: {
    books(author, { limit = 100, offset = 0 }) {
      // TODO: Only query for selected fields (d.fieldNodes[0].selectionSet.selections)
    }
  }
};
