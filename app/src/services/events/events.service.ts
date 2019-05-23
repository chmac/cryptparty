/// <reference path="../../../modules.d.ts"/>
import cryptoFactory from "chainpad-crypto";
import Nacl from "tweetnacl";

import apollo from "../../apollo";
import { gql, ApolloQueryResult } from "apollo-boost";

const crypto = cryptoFactory(Nacl);

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

export const getBySecretKey = async (secretKey: string) => {
  const keys = Nacl.box.keyPair.fromSecretKey(
    Nacl.util.decodeBase64(secretKey)
  );

  return apollo
    .query({
      query: GET_EVENT,
      variables: {
        _id: Nacl.util.encodeBase64(keys.publicKey)
      }
    })
    .catch(error => {
      alert(`Error getting event #QA3Ekl ${error.message}`);
      throw error;
    })
    .then(
      (response: ApolloQueryResult<GetEventQueryResult>): string => {
        return crypto.decrypt(response.data.event.content, keys.secretKey);
      }
    );
};

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($_id: ID!, $content: String!) {
    createEvent(_id: $_id, content: $content) {
      success
    }
  }
`;

interface Keys {
  secretKey: string;
  publicKey: string;
}

export const create = async (content: string): Promise<Keys> => {
  const keys = Nacl.box.keyPair();
  const encrypted = crypto.encrypt(content, keys.secretKey);
  const secretKey = Nacl.util.encodeBase64(keys.secretKey);
  const publicKey = Nacl.util.encodeBase64(keys.publicKey);

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
