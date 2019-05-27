import { insert, findByEventId, findByInviteId } from "../data/replies.data";

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
    inviteId: string;
    content: string;
  };
}

export const resolvers = {
  Event: {
    // @TODO Only return the latest reply
    async replies(event) {
      return findByEventId(event._id);
    }
  },
  Invite: {
    // @TODO Only return the latest reply
    async reply(invite) {
      const reply = await findByInviteId(invite._id);
      console.log("Invite.reply #ri6KWB", invite, reply);
      return !!reply ? reply : null;
    }
  },
  Mutation: {
    async sendReply(root, args: SetReplyArgs) {
      const { eventId, inviteId, content } = args.reply;
      const reply = await insert({
        eventId,
        inviteId,
        content
      });
      console.log("sendReply mutation #VBe1ZW", reply);
      return {
        sucesss: true,
        reply
      };
    }
  }
};
