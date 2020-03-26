import {suits,cardNumbers} from "./enums";
import {hand,flop} from './interfaces';

export function getValueFromCardValueEnum(c: number) {
    switch(c) {
        case 0: 
            return "A"
        case 1:
            return "2"
        case 2: 
            return "3"
        case 3: 
            return "4"
        case 4:
            return "5"
        case 5:
            return "6"
        case 6:
            return "7"
        case 7:
            return "8"
        case 8:
            return "9"
        case 9:
            return "10"
        case 10:
            return "J"
        case 11:
            return "Q"
        case 12:
            return "K"
        default:
            return "joker"
    }
}

export function getDefaultHand():hand { 
    return {
    card1: {
      suit: suits.Club,
      value: cardNumbers.ace,
    },
    card2: {
      suit: suits.Diamond,
      value: cardNumbers.ace,
    }
  }
}

export function getDefaultFlop():flop {
    return {
        card1: {
          suit: suits.Club,
          value: cardNumbers.six,
        },
        card2: {
          suit: suits.Diamond,
          value: cardNumbers.ace,
        },
        card3: {
          suit: suits.Diamond,
          value: cardNumbers.jack,
        },
        card4: {
          suit: suits.Diamond,
          value: cardNumbers.queen,
        },
        card5: {
          suit: suits.Diamond,
          value: cardNumbers.king
        }
      }
}