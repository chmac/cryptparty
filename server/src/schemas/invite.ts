import { invites, invitees } from "../database";

export const typeDef = `
    extend type Query {
        invite(_id: ID!): Invite
    }

    extend type Mutation {
        createInvite(_id: ID!, invite: String!, invitee: String!): InviteResult
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
  _id: string;
  invite: string;
  invitee: string;
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
      const { _id, invite, invitee } = args;
      const inviteDoc = await invites.insert({ _id, content: invite });
      await invitees.insert({ _id, content: invitee });
      return {
        success: true,
        invite: inviteDoc
      };
    }
  }
};
