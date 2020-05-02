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
    sBlind: $SB,
    bBlind: $BB
)
}
`;

export const joinGameQuery = gql `
mutation joinGame($gameId: ID!) {
  joinGame(
    gameId: $gameId
  )
}
`;

export const startGameMutation= gql `
mutation startGame($gameId: ID!) {
  startGame(gameId: $gameId)
}
`

export const createPlayerQuery = gql`
mutation createPlayer($stack: Int!, $position: Int!, $gameId: ID!) {
  createPlayer(stack: $stack, position: $position, gameId: $gameId)
}
`;

export const getPlayerByIDQuery = gql`
mutation player($position: Int!, $gameId: ID!) {
  player(position: $position, gameId: $gameId) {
    hand {
      card1 {
        suit
        number
      }
      card2 {
        suit
        number
      }
    }
  }
}
`

export const subscriptionQuery = gql`
subscription change($gameId: ID!) {
  change(gameId: $gameId){
    potSize
    dealer
    bigBlind
    smallBlind
    winner
    numPlayers
    table {
      number
      suit
    }
    state
    action
    curBet
    players {
      stack
      user {
        username
      }
      showCards {
        card1 {
          suit
          number
        }
        card2 {
          suit
          number
        }
      }
      position
      isFolded
      isAllIn
      betAmount
    }
  }
}
`

export const betMutation = gql`
mutation bet($amount: Int!, $gameId: ID!) {
  bet(
    amount: $amount,
    gameId: $gameId
)
}
`

export const foldMutaiton = gql`
mutation fold($gameId: ID!) {
  fold(
    gameId: $gameId
)
}
`

export const allInMutation = gql`
mutation allIn($gameId: ID!) {
  allIn(
    gameId: $gameId
)
}
`

export const getDataQuery = gql`
query getData($gameId: ID!) {
  getData(
    gameId: $gameId
  )
}
`
export const getMe = gql`
{
  me {
    username
    venmo
  }
}
`

export const addToStackMutation = gql `
mutation addToStack($position: Int!, $amount: Int!, $gameId: ID!) {
  addToStack(
    position: $position,
    amount: $amount,
    gameId: $gameId
)
}
`

export const removePlayer = gql`
mutation removePlayer($position: Int!, $gameId: ID!) {
  removePlayer(
    position: $amount,
    gameId: $gameId
)
}
`