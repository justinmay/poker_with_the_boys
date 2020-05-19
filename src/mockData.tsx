import {Hand, Card} from './interfaces';
import {suits, cardNumbers} from './enums';

export const mockFlop: Card[] = [
    {
        value: cardNumbers.ace,
        suit: suits.Club
    },
    {
        value: cardNumbers.ace,
        suit: suits.Club
    },
    {
        value: cardNumbers.ace,
        suit: suits.Club
    }
]

export const mockAceClubCard: Card = {
    value: cardNumbers.ace,
    suit: suits.Club
}

export const mockAceSpadeCard: Card = {
    value: cardNumbers.ace,
    suit: suits.Spade
}

export const mockHand: Hand = {
    card1: mockAceClubCard,
    card2: mockAceSpadeCard
}

export const mockSubscriptionData = {
    change: {
        table: mockFlop,
        potSize: 30,
        dealer: 1,
        numPlayers: 2, 
        players: [

        ],
    }
}