import { gql } from 'apollo-boost';

export const usersQuery = gql`
{
  users{
    id
    username
  }
}`;

export const signUpQuery = gql`
  mutation signUp($username: String!, $password: String!, $venmo: String) {
    signUp(username: $username, password: $password, venmo: $venmo){
      token
    }
  }
`;

export const signInQuery = gql `
mutation signIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password){
    token
  }
}
`;

export const createGameMutation = gql `
mutation createGame($BB: Int!, $SB: Int!) {
  createGame(
    sBlind: $BB,
    bBlind: $SB
)
}
`;

export const joinGameQuery = gql `
mutation joinGame($gameId: ID!) {
  joinGame(
    gameId: $gameId
) {
  players {
    position
  }

}
}
`;

export const createPlayerQuery = gql`
mutation createPlayer($stack: Int!, $position: Int!, $gameId: ID!) {
  createPlayer(stack: $stack, position: $position, gameId: $gameId)
}
`;

export const subscriptionQuery = gql`
subscription change($gameId: ID!) {
  change(gameId: $gameId){
    potSize
    dealer
    numPlayers
    table {
      number
      suit
    }
    state
    action
    players {
      stack
      position
      isFolded
      isAllIn
      betAmount
    }
  }
}
`