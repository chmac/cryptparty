export const typeDef = `
  extend type Query {
    book(title: String): Book
    books(limit: Int): [Book]
  }

  extend type Mutation {
    createBook(title: String!, authorId: ID!): Book
  }

  type Book {
    id: ID!
    title: String
    author: Author
  }
`;

export const resolvers = {
  Query: {
    book(root, { title = "" }) {
      return {};
    },
    books(root, { limit = 100, offset = 0 }) {
      return {};
    }
  },
  Mutation: {
    async createBook(root, args) {
      return {};
    }
  },
  Book: {
    author(book) {
      return {};
    }
  }
};
