import { insert, findById } from "../database";

export const typeDef = `
    extend type Query {
        event(_id: ID!): Event
    }

    extend type Mutation {
        createEvent(_id: ID!, content: String!): EventResult
    }

    type EventResult {
        success: Boolean
        event: Event
    }

    type Event {
        _id: ID!
        content: String
    }
`;

export const resolvers = {
  Query: {
    event(root, args) {
      const { _id } = args;
      return findById(_id);
    }
  },
  Mutation: {
    async createEvent(root, args) {
      const { _id, content } = args;
      console.log("Hit createEvent #RONuh4", _id, content);
      const event = await insert({ _id, content });
      return {
        success: true,
        event
      };
    }
  }
};
