import React from "react";
import '../stylesheets/cards.css';

type HandProps = {
    card1number: string;
    card2number: string;
    card1suit: string;
    card2suit: string;
    playerBet?: number;
}

function Hand(props: HandProps) {
    return (
        <div className="Player">
            <h1>
                Player
            </h1>
            <div className="Hand">
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
            </div>
            {props.playerBet! ?
            <div className="PlayerBet">
                {props.playerBet!}
            </div>
            : null}
            
        </div>
    );
  }

  export default Hand;