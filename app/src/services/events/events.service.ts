/// <reference path="../../../modules.d.ts"/>
import cryptoFactory from "chainpad-crypto";
import Nacl from "tweetnacl";
import { encodeURLSafe, decodeURLSafe } from "@stablelib/base64";

import apollo from "../../apollo";
import { gql, ApolloQueryResult } from "apollo-boost";
import { Reply } from "../replies";
import { decryptFromTwoKeys } from "../encryption";

const crypto = cryptoFactory(Nacl);

// This is what a decrypted event looks like
export interface NewEvent {
  description: string;
}
export interface EventWithId extends NewEvent {
  _id: string;
}
export interface Invitee {
  _id: string;
  name: string;
  reply?: {
    reply: Reply;
  };
}
export interface Event extends EventWithId {
  invitees: Invitee[];
}

// @TODO Figure out how to convert gql tags into types
const GET_EVENT = gql`
  query getEvent($_id: ID!) {
    event(_id: $_id) {
      _id
      content
      invitees {
        _id
        content
        reply {
          content
        }
      }
    }
  }
`;

interface EncryptedInvitee {
  _id: string;
  content: string;
  reply?: {
    content: string;
  };
}
interface GetEventQueryResult {
  event: {
    _id: string;
    content: string;
    invitees?: EncryptedInvitee[];
  };
}

const parse = (json: string) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    throw new Error(`Invalid Event data. #rpxQVx ${e.message}`);
  }
};

export const getBySecretKey = async (secretKey: string): Promise<Event> => {
  const keys = Nacl.box.keyPair.fromSecretKey(decodeURLSafe(secretKey));

  return apollo
    .query({
      query: GET_EVENT,
      variables: {
        _id: encodeURLSafe(keys.publicKey)
      },
      fetchPolicy: "network-only"
    })
    .catch(error => {
      alert(`Error getting event #QA3Ekl ${error.message}`);
      throw error;
    })
    .then((response: ApolloQueryResult<GetEventQueryResult>) => {
      const { event } = response.data;
      if (response.data.event === null) {
        throw new Error("Could not load event #RMLJzZ");
      }
      const json = crypto.decrypt(response.data.event.content, keys.secretKey);

      const getInvitees = () => {
        if (event.invitees && event.invitees.length) {
          return event.invitees.map(doc => {
            const json = crypto.decrypt(doc.content, keys.secretKey);
            const data = parse(json);
            const invitee = { ...data, _id: doc._id };

            // If there is no reply, return `invitee` at this point
            if (!doc.reply) {
              return { ...invitee, reply: null };
            }

            // Decrypt the reply
            const replyJson = decryptFromTwoKeys(
              doc._id,
              secretKey,
              doc.reply.content
            );
            const reply = JSON.parse(replyJson);
            return { ...invitee, reply };
          });
        } else {
          return [];
        }
      };

      return {
        ...parse(json),
        invitees: getInvitees()
      };
    });
};

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($_id: ID!, $content: String!) {
    createEvent(event: { _id: $_id, content: $content }) {
      success
    }
  }
`;

interface Keys {
  secretKey: string;
  publicKey: string;
}

export const create = async (event: NewEvent): Promise<Keys> => {
  const keys = Nacl.box.keyPair();
  const secretKey = encodeURLSafe(keys.secretKey);
  const publicKey = encodeURLSafe(keys.publicKey);
  const json = JSON.stringify({ ...event, _id: publicKey });
  const encrypted = crypto.encrypt(json, keys.secretKey);

  return apollo
    .mutate({
      mutation: CREATE_EVENT_MUTATION,
      variables: {
        _id: publicKey,
        content: encrypted
      }
    })
    .catch(error => {
      alert(`Error saving Event #SxA5gq ${error.message}`);
      throw error;
    })
    .then(() => {
      return {
        secretKey,
        publicKey
      };
    });
};
