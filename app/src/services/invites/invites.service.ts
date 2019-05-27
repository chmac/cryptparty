/// <reference path="../../../modules.d.ts"/>
import cryptoFactory from "chainpad-crypto";
import Nacl from "tweetnacl";
import { encodeURLSafe, decodeURLSafe } from "@stablelib/base64";
import { gql, ApolloQueryResult } from "apollo-boost";

import apollo from "../../apollo";
import { Event, EventWithId } from "../events";
import { Reply } from "../replies";

const crypto = cryptoFactory(Nacl);

export interface NewInvite {
  name: string;
  event: EventWithId;
}
export interface Invite extends NewInvite {
  _id: string;
  reply?: Reply;
}

export interface NewInvitee {
  name: string;
  eventId: string;
}
export interface Invitee extends NewInvitee {
  _id: string;
}

// @TODO Figure out how to convert gql tags into types
const GET_INVITE = gql`
  query getInvite($_id: ID!) {
    invite(_id: $_id) {
      _id
      content
      reply {
        content
      }
    }
  }
`;
interface GetEventQueryResult {
  invite: {
    _id: string;
    content: string;
    reply?: {
      content: string;
    };
  };
}

const parse = (json: string) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    throw new Error(`Invalid Invite data.  ${e.message}`);
  }
};

export const getBySecretKey = async (secretKey: string): Promise<Invite> => {
  const keys = Nacl.box.keyPair.fromSecretKey(decodeURLSafe(secretKey));

  return apollo
    .query({
      query: GET_INVITE,
      variables: {
        _id: encodeURLSafe(keys.publicKey)
      }
    })
    .catch(error => {
      alert(`Error getting invite #Z1u1n9 ${error.message}`);
      throw error;
    })
    .then((response: ApolloQueryResult<GetEventQueryResult>) => {
      if (response.data.invite === null) {
        throw new Error("Could not load invite #Yt3UxI");
      }
      const json = crypto.decrypt(response.data.invite.content, keys.secretKey);
      const baseInvite: Invite = parse(json);

      // If there is no reply, then return now, nothing else to do
      if (!response.data.invite.reply) {
        return baseInvite;
      }

      debugger;
      const replyJson = crypto.decrypt(
        response.data.invite.reply.content,
        keys.secretKey
      );
      const reply = parse(json);

      return { ...baseInvite, reply };
    });
};

const CREATE_INVITE_MUTATION = gql`
  mutation CreateInvite(
    $_id: ID!
    $eventId: ID!
    $invite: String!
    $invitee: String!
  ) {
    createInvite(
      invite: {
        _id: $_id
        eventId: $eventId
        invite: $invite
        invitee: $invitee
      }
    ) {
      success
      invite {
        _id
      }
    }
  }
`;

interface Keys {
  secretKey: string;
  publicKey: string;
}

interface CreateResponse {
  keys: Keys;
  invitee: Invitee;
}

export const create = async (
  name: string,
  event: Event,
  ownerKey: string
): Promise<CreateResponse> => {
  // Create a copy of the `event` with the `invitee` key removed. We don't want
  // to include this in the invitations.
  const { invitees, ...eventWithoutInvitees } = event;

  // Build a key for the new recipient
  const keys = Nacl.box.keyPair();
  const secretKey = encodeURLSafe(keys.secretKey);
  const publicKey = encodeURLSafe(keys.publicKey);
  const inviteJson = JSON.stringify({
    name,
    event: eventWithoutInvitees
  });
  const invite = crypto.encrypt(inviteJson, keys.secretKey);
  const inviteeJson = JSON.stringify({
    eventId: event._id,
    name
  });

  // Encrypt a record of who we invited, for the owner's key
  const ownerKeys = Nacl.box.keyPair.fromSecretKey(decodeURLSafe(ownerKey));
  const invitee = crypto.encrypt(inviteeJson, ownerKeys.secretKey);

  return apollo
    .mutate({
      mutation: CREATE_INVITE_MUTATION,
      variables: {
        _id: publicKey,
        eventId: event._id,
        invite,
        invitee
      }
    })
    .catch(error => {
      alert(`Error saving Event #SxA5gq ${error.message}`);
      throw error;
    })
    .then(() => {
      return {
        invitee: {
          _id: publicKey,
          eventId: event._id,
          name
        },
        keys: {
          secretKey,
          publicKey
        }
      };
    });
};
