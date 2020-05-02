import React from "react";
import '../stylesheets/cards.css';
import {SubscriptionPlayer, Hand} from '../interfaces';
import {suits} from '../enums';
import {getValueFromCardValueEnum} from '../helperFunctions';

type HandProps = {
    playerInfo: SubscriptionPlayer,
    hand: Hand,
    isDealer: boolean,
    isActionOnPlayer: boolean,
    hasStarted: boolean,
    isWinner: boolean,
}

function YourHandComponent(props: HandProps) {
    return (
        <div className="Player">
            <h1 className={props.isDealer ? "dealer" : "notDealer"}>
                {props.playerInfo.user.username}
            </h1>
            {
                props.hasStarted ? 
                <div className={ props.isWinner ? "GoldenCards" : props.isActionOnPlayer ? "ActionHand" : "Hand"}>
                    <div className={props.playerInfo.isFolded ? "Folded" : "Card"}>
                        <p className={props.hand.card1.suit === suits.Club ? "black" : props.hand.card1.suit === suits.Spade ? "green" : props.hand.card1.suit === suits.Heart ? "red" : "blue"}>
                            {getValueFromCardValueEnum(props.hand.card1.value)}{props.hand.card1.suit === suits.Club ? "♣️" : props.hand.card1.suit === suits.Spade ? "♠️" : props.hand.card1.suit === suits.Heart ? "♥" : "♦"}
                        </p> 
                    </div>
                    <div className={props.playerInfo.isFolded ? "Folded" : "Card"}>
                        <p className={props.hand.card2.suit === suits.Club ? "black" : props.hand.card2.suit === suits.Spade ? "green" : props.hand.card2.suit === suits.Heart ? "red"  : "blue"}>
                            {getValueFromCardValueEnum(props.hand.card2.value)}{props.hand.card2.suit === suits.Club ? "♣️" : props.hand.card2.suit === suits.Spade ? "♠️" : props.hand.card2.suit === suits.Heart ? "♥" : "♦"}
                        </p>  
                    </div>
                </div>:
                <div className="Hand"/>
                }
                <div className="playerStack">
                    {props.playerInfo.stack}
                </div>
                {props.playerInfo.betAmount > -1 ?
                <div className="PlayerBet">
                    {props.playerInfo.betAmount === 0 ? "check" : props.playerInfo.betAmount}
                </div>
                : null
            }
            
        </div>
    );
  }

  export default YourHandComponent;