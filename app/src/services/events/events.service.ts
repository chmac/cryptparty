/// <reference path="../../../modules.d.ts"/>
import cryptoFactory from "chainpad-crypto";
import Nacl from "tweetnacl";
import { encodeURLSafe, decodeURLSafe } from "@stablelib/base64";

import apollo from "../../apollo";
import { gql, ApolloQueryResult } from "apollo-boost";

const crypto = cryptoFactory(Nacl);

// This is what a decrypted event looks like
export interface NewEvent {
  description: string;
}
export interface Event extends NewEvent {
  _id: string;
}

// @TODO Figure out how to convert gql tags into types
const GET_EVENT = gql`
  query getEvent($_id: ID!) {
    event(_id: $_id) {
      _id
      content
    }
  }
`;
interface GetEventQueryResult {
  event: {
    _id: string;
    content: string;
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
      }
    })
    .catch(error => {
      alert(`Error getting event #QA3Ekl ${error.message}`);
      throw error;
    })
    .then((response: ApolloQueryResult<GetEventQueryResult>) => {
      if (response.data.event === null) {
        throw new Error("Could not load event #RMLJzZ");
      }
      const json = crypto.decrypt(response.data.event.content, keys.secretKey);

      const event: Event = JSON.parse(json);
      return event;
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
  const json = JSON.stringify(event);
  const encrypted = crypto.encrypt(json, keys.secretKey);
  const secretKey = encodeURLSafe(keys.secretKey);
  const publicKey = encodeURLSafe(keys.publicKey);

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
    .then(result => {
      return {
        secretKey,
        publicKey
      };
    });
};
