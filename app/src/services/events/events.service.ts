import apollo from "../../apollo";
import { gql } from "apollo-boost";
import fp from "lodash/fp";

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
    .then(fp.get("data.event"));
};

(window as any).getById = getById;
