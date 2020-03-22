import React from "react";
import '../stylesheets/cards.css';

type HandProps = {
    card1number: string;
    card2number: string;
    card3number: string;
    card4number: string;
    card5number: string;
    card1suit: string;
    card2suit: string;
    card3suit: string;
    card4suit: string;
    card5suit: string;
    playerBet?: number;
}

function TableCards(props: HandProps) {
    return (
        <div className="tableLayer">
            <div className="TablePot">
                {props.playerBet!}
            </div>
            <div className="tableCards">
                <div className="Card">
                    <p className={props.card1suit === "club" ? "black" : props.card1suit === "spade" ? "green" : props.card1suit === "heart" ? "red" : "blue"}>
                    {props.card1number}{props.card1suit === "club" ? "♣️" : props.card1suit === "spade" ? "♠️" : props.card1suit === "heart" ? "♥" : "♦"}
                    </p>
                </div>
                <div className="Card">
                    <p className={props.card2suit === "club" ? "black" : props.card2suit === "spade" ? "green" : props.card2suit === "heart" ? "red" : "blue"}>
                    {props.card2number}{props.card2suit === "club" ? "♣️" : props.card2suit === "spade" ? "♠️" : props.card2suit === "heart" ? "♥" : "♦"}
                    </p>
                </div>
                <div className="Card">
                    <p className={props.card3suit === "club" ? "black" : props.card3suit === "spade" ? "green" : props.card3suit === "heart" ? "red" : "blue"}>
                    {props.card3number}{props.card3suit === "club" ? "♣️" : props.card3suit === "spade" ? "♠️" : props.card3suit === "heart" ? "♥" : "♦"}
                    </p>
                </div>
                <div className="Card">
                    <p className={props.card4suit === "club" ? "black" : props.card4suit === "spade" ? "green" : props.card4suit === "heart" ? "red" : "blue"}>
                    {props.card4number}{props.card4suit === "club" ? "♣️" : props.card4suit === "spade" ? "♠️" : props.card4suit === "heart" ? "♥" : "♦"}
                    </p>
                </div>
                <div className="Card">
                    <p className={props.card5suit === "club" ? "black" : props.card5suit === "spade" ? "green" : props.card5suit === "heart" ? "red" : "blue"}>
                    {props.card5number}{props.card5suit === "club" ? "♣️" : props.card5suit === "spade" ? "♠️" : props.card5suit === "heart" ? "♥" : "♦"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TableCards;