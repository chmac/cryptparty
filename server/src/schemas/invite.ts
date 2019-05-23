import { invites, invitees } from "../database";

export const typeDef = `
    extend type Query {
        invite(_id: ID!): Invite
    }

    input InviteInput {
      _id: ID!
      eventId: ID!
      invite: String!
      invitee: String!
    }

    extend type Mutation {
        createInvite(invite: InviteInput): InviteResult
    }

    type InviteResult {
        success: Boolean
        invite: Invite
    }

    type Invite {
        _id: ID!
        content: String
    }
`;

interface CreateInviteArgs {
  invite: {
    _id: string;
    eventId: string;
    invite: string;
    invitee: string;
  };
}

export const resolvers = {
  Query: {
    invite(root, args) {
      const { _id } = args;
      return invites.findById(_id);
    }
  },
  Mutation: {
    async createInvite(root, args: CreateInviteArgs) {
      const { _id, eventId, invite, invitee } = args.invite;
      const inviteDoc = await invites.insert({ _id, content: invite });
      await invitees.insert({ _id, eventId, content: invitee });
      return {
        success: true,
        invite: inviteDoc
      };
    }
  }
};
