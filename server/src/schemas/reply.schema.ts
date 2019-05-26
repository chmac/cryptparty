import { insert, findByEventId, findByInviteeId } from "../data/replies.data";

export const typeDef = `
    input ReplyInput {
      eventId: ID!
      inviteId: ID!
      content: String!
    }

    extend type Mutation {
        sendReply(reply: ReplyInput): SetReplyResult
    }

    type SetReplyResult {
        success: Boolean
        reply: Reply
    }

    type Reply {
        content: String
    }

    extend type Event {
        replies: [Reply!]
    }

    extend type Invite {
        reply: Reply
    }
`;

interface SetReplyArgs {
  reply: {
    eventId: string;
    inviteeId: string;
    content: string;
  };
}

export const resolvers = {
  Event: {
    async replies(event) {
      return findByEventId(event._id);
    }
  },
  Invite: {
    async reply(invite) {
      return findByInviteeId(invite._id);
    }
  },
  Mutation: {
    async sendReply(root, args: SetReplyArgs) {
      const { eventId, inviteeId, content } = args.reply;
      const reply = await insert({
        eventId,
        inviteeId,
        content
      });
      return {
        sucesss: true,
        reply
      };
    }
  }
};
