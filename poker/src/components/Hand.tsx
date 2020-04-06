import React from "react";
import '../stylesheets/cards.css';
import {SubscriptionPlayer} from '../interfaces';

type HandProps = {
    playerInfo: SubscriptionPlayer,
    isDealer: boolean,
    actionPosition: number
}

function HandComponent(props: HandProps) {

    return (
        <div className="Player">
            <h1 className={props.isDealer ? "dealer" : "notDealer"}>
                {props.playerInfo.user.username}
            </h1>
            <div className={props.actionPosition && props.actionPosition === props.playerInfo.position ? "ActionHand":"Hand"}>
                <div className={props.playerInfo.isFolded ? "Folded" : "Card"}>
                    {props.playerInfo.showCards ? <p className={props.playerInfo.showCards.card1.suit === "c" ? "black" : props.playerInfo.showCards.card1.suit === "s" ? "green" : props.playerInfo.showCards.card1.suit === "h" ? "red" : "blue"}>
                        {props.playerInfo.showCards.card1.number}{props.playerInfo.showCards.card1.suit === "c" ? "♣️" : props.playerInfo.showCards.card1.suit === "s" ? "♠️" : props.playerInfo.showCards.card1.suit === "h" ? "♥" : "♦"}
                    </p> : null}
                </div>
                <div className={props.playerInfo.isFolded ? "Folded" : "Card"}>
                    {props.playerInfo.showCards ? <p className={props.playerInfo.showCards.card2.suit === "c" ? "black" : props.playerInfo.showCards.card2.suit === "s" ? "green" : props.playerInfo.showCards.card2.suit === "h" ? "red"  : "blue"}>
                        {props.playerInfo.showCards.card2.number}{props.playerInfo.showCards.card2.suit === "c" ? "♣️" : props.playerInfo.showCards.card2.suit === "s" ? "♠️" : props.playerInfo.showCards.card2.suit === "h" ? "♥" : "♦"}
                    </p> : null }
                </div>
            </div>
            <div className="playerStack">
                {props.playerInfo.stack}
            </div>
            {props.playerInfo.betAmount > 0 ?
            <div className="PlayerBet">
                {props.playerInfo.betAmount}
            </div>
            : null}
            
        </div>
    );
  }

  export default HandComponent;