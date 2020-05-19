import React from "react";
import '../stylesheets/cards.css';
import {suits} from '../enums';
import {Flop} from '../interfaces';
import {getValueFromCardValueEnum} from '../helperFunctions';

type HandProps = {
    flop: Flop,
    potSize: number,
}

function TableCards(props: HandProps) {
    return (
        <div className="tableLayer">
            <div className="TablePot">
                <h2>
                    {props.potSize}
                </h2>
                    
            </div>
            <div className="tableCards">
                {
                    props.flop.card1 ? <div className="CenterCard">
                    <p className={props.flop.card1.suit === suits.Club ? "black" : props.flop.card1.suit === suits.Spade ? "green" : props.flop.card1.suit === suits.Heart ? "red" : "blue"}>
                    {getValueFromCardValueEnum(props.flop.card1.value)}{props.flop.card1.suit === suits.Club ? "♣️" : props.flop.card1.suit === suits.Spade ? "♠️" : props.flop.card1.suit === suits.Heart ? "♥" : "♦"}
                    </p>
                    </div> : null
                }
                {
                    props.flop.card2 ? <div className="CenterCard">
                    <p className={props.flop.card2.suit === suits.Club ? "black" : props.flop.card2.suit === suits.Spade ? "green" : props.flop.card2.suit === suits.Heart ? "red" : "blue"}>
                    {getValueFromCardValueEnum(props.flop.card2.value)}{props.flop.card2.suit === suits.Club ? "♣️" : props.flop.card2.suit === suits.Spade ? "♠️" : props.flop.card2.suit === suits.Heart ? "♥" : "♦"}
                    </p>
                </div>: null
                }
                {
                    props.flop.card3 ? <div className="CenterCard">
                    <p className={props.flop.card3.suit === suits.Club ? "black" : props.flop.card3.suit === suits.Spade ? "green" : props.flop.card3.suit === suits.Heart ? "red" : "blue"}>
                    {getValueFromCardValueEnum(props.flop.card3.value)}{props.flop.card3.suit === suits.Club ? "♣️" : props.flop.card3.suit === suits.Spade ? "♠️" : props.flop.card3.suit === suits.Heart ? "♥" : "♦"}
                    </p>
                </div>: null
                }
                {
                    props.flop.card4 ? <div className="CenterCard">
                    <p className={props.flop.card4.suit === suits.Club ? "black" : props.flop.card4.suit === suits.Spade ? "green" : props.flop.card4.suit === suits.Heart ? "red" : "blue"}>
                    {getValueFromCardValueEnum(props.flop.card4.value)}{props.flop.card4.suit === suits.Club ? "♣️" : props.flop.card4.suit === suits.Spade ? "♠️" : props.flop.card4.suit === suits.Heart ? "♥" : "♦"}
                    </p>
                </div>: null
                }
                {
                    props.flop.card5 ? <div className="CenterCard">
                    <p className={props.flop.card5.suit === suits.Club ? "black" : props.flop.card5.suit === suits.Spade ? "green" : props.flop.card5.suit === suits.Heart ? "red" : "blue"}>
                    {getValueFromCardValueEnum(props.flop.card5.value)}{props.flop.card5.suit === suits.Club ? "♣️" : props.flop.card5.suit === suits.Spade ? "♠️" : props.flop.card5.suit === suits.Heart ? "♥" : "♦"}
                    </p>
                </div>: null
                }
            </div>
        </div>
    )
}

export default TableCards;