import { gql } from 'apollo-boost';

export const usersQuery = gql`
{
  users{
    id
    username
  }
}`;