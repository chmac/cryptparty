import { gql, ApolloQueryResult } from "apollo-boost";
import Nacl from "tweetnacl";
import { encodeURLSafe, decodeURLSafe } from "@stablelib/base64";

import apollo from "../../apollo";

export enum Reply {
  NO = 0,
  YES = 1,
  MAYBE = 2
}

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
  secretKey: string,
  reply: Reply
) => {
  // TODO Generate inviteeId from secretKey
  // TODO Construct encrypted content

  return apollo
    .mutate({
      mutation: SEND_REPLY_MUTATION,
      variables: {
        eventId,
        inviteId: "def",
        content: "encrypted coming soon"
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
