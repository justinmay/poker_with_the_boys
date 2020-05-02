import {suits, cardNumbers} from './enums';

export interface Flop {
    card1?: Card;
    card2?: Card;
    card3?: Card;
    card4?: Card;
    card5?: Card;
}

export interface Users {
    users: [User];
}

export interface User { 
    id: string;
    username: string;
    venmo?: string;
    role?: string;
    player?: Player;
}

export interface Player {
    id: string;
    stack: number;
    hand: Hand;
    betAmount: number;
    isFolded: Boolean;
    position: number;
    user: User;
    game: Game;
}

export interface SubscriptionPlayer {
    stack: number;
    user: {
        username: string;
    }
    position: number;
    showCards?: {
        card1: {
            suit: string
            number: string
        }
        card2: {
            suit: string
            number: string
        }
    }
    isFolded: boolean;
    isAllIn: boolean;
    betAmount: number;
}

export interface Hand {
    card1: Card;
    card2: Card;
}

export interface Card {
    number: cardNumbers;
    suit: suits;
}

export interface Game {
    id: string;
    potSize: number;
    dealer: number;
    smallBlind: number;
    bigBlind: number;
    numPlayer: number;
    table: [Card];
    state: string;
    curBet: number;
    action: number;
}

export interface subscriptionData {
    potSize: number,
    bigBlind: number,
    smallBlind: number,
    dealer: number,
    winner: number,
    numPlayers: number,
    table: {
        number: number,
        suit: string,
    }[],
    state: string,
    action: number,
    curBet: number,
    players: SubscriptionPlayer[]
}