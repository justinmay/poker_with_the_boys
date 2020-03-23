import React from "react";
import '../stylesheets/cards.css';
import {hand} from '../interfaces';
import {suits} from '../enums';
import {getValueFromCardValueEnum} from '../helperFunctions';

type HandProps = {
    hand: hand;
    playerName: string;
    playerBet?: number;
    show: boolean;
}

function Hand(props: HandProps) {

    return (
        <div className="Player">
            <h1>
                {props.playerName}
            </h1>
            <div className="Hand">
                <div className="Card">
                    {props.show ? <p className={props.hand.card1.suit === suits.Club ? "black" : props.hand.card1.suit === suits.Spade ? "green" : props.hand.card1.suit === suits.Heart ? "red" : "blue"}>
                        {getValueFromCardValueEnum(props.hand.card1.value)}{props.hand.card1.suit === suits.Club ? "♣️" : props.hand.card1.suit === suits.Spade ? "♠️" : props.hand.card1.suit === suits.Heart ? "♥" : "♦"}
                    </p> : null}
                </div>
                <div className="Card">
                    {props.show ? <p className={props.hand.card2.suit === suits.Club ? "black" : props.hand.card2.suit === suits.Spade ? "green" : props.hand.card2.suit === suits.Heart ? "red" : "blue"}>
                        {getValueFromCardValueEnum(props.hand.card2.value)}{props.hand.card2.suit === suits.Club ? "♣️" : props.hand.card2.suit === suits.Spade ? "♠️" : props.hand.card2.suit === suits.Heart ? "♥" : "♦"}
                    </p> : null }
                </div>
            </div>
            {props.playerBet ?
            <div className="PlayerBet">
                {props.playerBet!}
            </div>
            : null}
            
        </div>
    );
  }

  export default Hand;