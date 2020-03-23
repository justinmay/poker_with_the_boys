import {suits, cardNumbers} from './enums';

export interface card { 
    suit: suits,
    value: cardNumbers,
}

export interface hand {
    card1: card,
    card2: card,
}

export interface flop {
    card1: card,
    card2: card,
    card3: card,
    card4: card,
    card5: card,
}