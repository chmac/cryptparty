/// <reference path="../../../modules.d.ts"/>
import cryptoFactory from "chainpad-crypto";
import Nacl from "tweetnacl";
import { encodeURLSafe, decodeURLSafe } from "@stablelib/base64";

import apollo from "../../apollo";
import { gql, ApolloQueryResult } from "apollo-boost";
import { Event } from "../events";

const crypto = cryptoFactory(Nacl);

export interface NewInvite {
  name: string;
  event: Event;
}
export interface Invite extends NewInvite {
  _id: string;
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
    }
  }
`;
interface GetEventQueryResult {
  invite: {
    _id: string;
    content: string;
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

      const invite: Invite = parse(json);
      return invite;
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

export const create = async (name: string, event: Event): Promise<Keys> => {
  // Get the event from the `eventId`
  const keys = Nacl.box.keyPair();
  const inviteJson = JSON.stringify({
    name,
    event
  });
  const invite = crypto.encrypt(inviteJson, keys.secretKey);
  const inviteeJson = JSON.stringify({
    eventId: event._id,
    name
  });
  const invitee = crypto.encrypt(inviteeJson, keys.secretKey);
  const secretKey = encodeURLSafe(keys.secretKey);
  const publicKey = encodeURLSafe(keys.publicKey);

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
    .then(result => {
      return {
        secretKey,
        publicKey
      };
    });
};
