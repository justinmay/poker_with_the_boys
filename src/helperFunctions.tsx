
import {suits, cardNumbers} from './enums';
import {Card} from './interfaces';

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

export function getCardNumberEnumFromString(s: string) {
  switch(s) {
    case "A": 
        return cardNumbers.ace
    case "2":
        return cardNumbers.two
    case "3": 
        return cardNumbers.three
    case "4": 
        return cardNumbers.four
    case "5":
        return cardNumbers.five
    case "6":
        return cardNumbers.six
    case "7":
        return cardNumbers.seven
    case "8":
        return cardNumbers.eight
    case "9":
        return cardNumbers.nine
    case "T":
        return cardNumbers.ten
    case "J":
        return cardNumbers.jack
    case "Q":
        return cardNumbers.queen
    case "K":
        return cardNumbers.king
    default:
      return cardNumbers.ace
  }
}

export function getSuitEnumFromString(s: string) {
  switch(s) {
    case "s":
      return suits.Spade
    case "d":
      return suits.Diamond
    case "h":
      return suits.Heart
    case "c":
      return suits.Club
    default:
      return suits.Spade
  }
}

export function getCardFromSubscriptionCard(card: any) {
  const ret: Card = {
    value: getCardNumberEnumFromString(card.value),
    suit: getSuitEnumFromString(card.suit)
  }
  return ret
}