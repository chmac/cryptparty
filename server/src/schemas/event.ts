import { events, invitees } from "../database";
const { insert, findById } = events;

export const typeDef = `
    extend type Query {
        event(_id: ID!): Event
    }

    input EventInput {
        _id: ID!
        content: String!
    }

    extend type Mutation {
        createEvent(event: EventInput): EventResult
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
  event: {
    _id: string;
    content: string;
  };
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
      const { _id, content } = args.event;
      const event = await insert({ _id, content });
      return {
        success: true,
        event
      };
    }
  },
  Event: {
    async invitees(event) {
      const { _id } = event;
      return invitees.findByEventId(_id);
    }
  }
};
