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

    extend type Invitee {
        reply: Reply
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
  Invite: {
    // @TODO Only return the latest reply
    async reply(invite) {
      const reply = await findByInviteId(invite._id);
      return !!reply ? reply : null;
    }
  },
  Invitee: {
    // @TODO Only return the latest reply
    async reply(invitee) {
      // NOTE: An `Invitee` has the same ID as its corresponding `Invite`. The
      // difference is that tht `Invite` is encrypted so only its secret key can
      // decrypt, and contains a full copy of the `Event`.
      const reply = await findByInviteId(invitee._id);
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
      return {
        sucesss: true,
        reply
      };
    }
  }
};
