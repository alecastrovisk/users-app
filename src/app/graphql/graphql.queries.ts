import { Apollo, gql } from 'apollo-angular';

const GET_USERS = gql`
  query {
    users {
      name,
      email,
      id
    }
  }
`;

export { GET_USERS };