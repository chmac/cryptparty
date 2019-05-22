/// <reference path="../../../modules.d.ts"/>
import crypto from "chainpad-crypto";

import apollo from "../../apollo";
import { gql } from "apollo-boost";
import fp from "lodash/fp";

const { Nacl } = crypto;

const GET_EVENT = gql`
  query getEvent($_id: ID!) {
    event(_id: $_id) {
      _id
      content
    }
  }
`;

export const getById = async (_id: string) => {
  return apollo
    .query({
      query: GET_EVENT,
      variables: {
        _id
      }
    })
    .catch(error => {
      alert(`Error getting event #QA3Ekl ${error.message}`);
      throw error;
    })
    .then(fp.get("data.event"));
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
      console.log("secretKey #tzAWzu", secretKey);
      return {
        secretKey,
        publicKey
      };
    });
};

(window as any).getById = getById;
