import {Hand, Card} from './interfaces';
import {suits, cardNumbers} from './enums';
export const mockSubscriptionData = {
    change: {
        table: [

        ],
        potSize: 30,
        dealer: 1,
        numPlayers: 2, 
        players: [

        ],
    }
}

export const mockAceClubCard: Card = {
    number: cardNumbers.ace,
    suit: suits.Club
}

export const mockAceSpadeCard: Card = {
    number: cardNumbers.ace,
    suit: suits.Spade
}

export const mockHand: Hand = {
    card1: mockAceClubCard,
    card2: mockAceSpadeCard
}