import { gql, ApolloQueryResult } from "apollo-boost";

import apollo from "../../apollo";
import { encryptToTwoKeys } from "../encryption";

export enum Reply {
  NO = 0,
  YES = 1,
  MAYBE = 2
}

export const replyToString = (reply: Reply): string => {
  switch (reply) {
    case Reply.YES: {
      return "Yes";
    }
    case Reply.NO: {
      return "No";
    }
    case Reply.MAYBE: {
      return "Maybe";
    }
  }
};

interface SendReplyMutationResult {
  result: boolean;
  reply: {
    _id: string;
  };
}

const SEND_REPLY_MUTATION = gql`
  mutation SendReplyMutation($eventId: ID!, $inviteId: ID!, $content: String!) {
    sendReply(
      reply: { eventId: $eventId, inviteId: $inviteId, content: $content }
    ) {
      success
    }
  }
`;

export const sendReply = async (
  eventId: string,
  inviteId: string,
  secretKey: string,
  reply: Reply
) => {
  const unecnrypted = JSON.stringify({ reply });
  const content = encryptToTwoKeys(
    // Set the public key (their key) as the `eventId` because this is event
    // owner's public key.
    eventId,
    // Use our secret key as "my key" so we can also read the encrypted value of
    // the reply
    secretKey,
    unecnrypted
  );

  return apollo
    .mutate({
      mutation: SEND_REPLY_MUTATION,
      variables: {
        eventId,
        inviteId,
        content
      }
    })
    .catch(error => {
      alert(`Error sending reply #JGdK73 ${error.message}`);
      throw error;
    })
    .then((response: ApolloQueryResult<SendReplyMutationResult>) => {
      // Respond with something...
    });
};
