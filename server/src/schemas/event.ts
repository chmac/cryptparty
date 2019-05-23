import { events } from "../database";
const { insert, findById } = events;

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
        invitees: [Invitee]
    }

    type Invitee {
        _id: ID!
        content: String
    }
`;

interface CreateEventArgs {
  _id: string;
  content: string;
}

export const resolvers = {
  Query: {
    event(root, args) {
      const { _id } = args;
      return findById(_id);
    }
  },
  Mutation: {
    async createEvent(root, args: CreateEventArgs) {
      const { _id, content } = args;
      const event = await insert({ _id, content });
      return {
        success: true,
        event
      };
    }
  }
};
