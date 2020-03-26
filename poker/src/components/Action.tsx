import React, { ChangeEvent, useState } from "react";
import '../stylesheets/Action.css';

type ActionProps = {
};

/**
 * This funciton returns the action bar: TODO move the bet component to it's own component so it doesn't refresh the whole bar 
 * @param Props props for Action bar
 */
export function Action(Props: ActionProps) {
    const [bet, setBet] = useState("0");

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let bet = event.target.value;
        if (bet.match(/^-{0,1}\d+$/)) {
            setBet(bet);
        } else if (bet === "") {
            setBet(bet);
        }
        
    }

    return (
        <div className="actionRow">
            <button className="actionButton greenBack">
                <p>
                    Check
                </p>
            </button>
            <button className="actionButton long blueBack">
                <p>
                    Check > Fold
                </p>
            </button>
            <button className="actionButton redBack">
                <p>
                    Fold
                </p>
            </button>
            <button className="actionButton yellowBack">
                <p>
                    Bet 1/2
                </p>
            </button>
            <button className="actionButton yellowBack">
                <p>
                    Bet 3/4
                </p>
            </button>
            <button className="actionButton yellowBack">
                <p>
                    Bet Pot
                </p>
            </button>
            <button className="actionButton yellowBack">
                <p>
                    Rip It
                </p>
            </button>
            <button className="actionButton yellowBack">
                <p>
                    Bet
                </p>
            </button>
            <form className="actionButton long">
                    <input 
                    className="input yellowBack"
                    type="text" 
                    name="name" 
                    value={bet} 
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}/>
            </form>
        </div>
    )
}

export default Action