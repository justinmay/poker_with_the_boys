import {suits, cardNumbers} from './enums';

export interface card { 
    suit: suits;
    value: cardNumbers;
}

export interface hand {
    card1: card;
    card2: card;
}

export interface flop {
    card1: card;
    card2: card;
    card3: card;
    card4: card;
    card5: card;
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

export interface Hand {
    card1: Card;
    card2: Card;
}

export interface Card {
    number: string;
    suit: string;
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