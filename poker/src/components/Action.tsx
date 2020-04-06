import React, { ChangeEvent, useState } from "react";
import '../stylesheets/Action.css';
import {useMutation} from '@apollo/react-hooks';
import {betMutation, foldMutaiton, allInMutation} from '../queries';
import {SubscriptionPlayer} from '../interfaces';

type ActionProps = {
    gameId: string,
    pot: number,
    me: SubscriptionPlayer,
    currBet: number
};

/**
 * This funciton returns the action bar: TODO move the bet component to it's own component so it doesn't refresh the whole bar 
 * @param Props props for Action bar
 */
export function Action(props: ActionProps) {
    const [betAmount, setBetAmount] = useState("0");
    const [bet, {loading: betLoading, error: betError}] = useMutation(betMutation);
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let bet = event.target.value;
        if (bet.match(/^-{0,1}\d+$/)) {
            setBetAmount(bet);
        } else if (bet === "") {
            setBetAmount(bet);
        }
        
    }
    
    function betThisAmount(amount: number) {
        const values = { variables: { gameId: props.gameId, amount: amount} }
        bet(values);
    }

    function call() {
        const amount = props.me.betAmount < 0 ? props.currBet : props.currBet - props.me.betAmount;
        console.log(amount);
        const values = { variables: { gameId: props.gameId, amount: amount} };
        bet(values);
    }

    return (
        <div className="actionRow">
            <button className="actionButton greenBack" onClick={() => betThisAmount(0)}>
                <p>
                    Check
                </p>
            </button>
            <button className="actionButton blueBack" onClick={() => call()}>
                <p>
                    Call
                </p>
            </button>
            <button className="actionButton redBack">
                <p>
                    Fold
                </p>
            </button>
            <button className="actionButton yellowBack">
                <p>
                    Bet
                </p>
            </button>
            <div className="betContainer">
                <div className="betActionButtonContainer">
                    <button className="actionButton yellowBack betActionButton">
                        <p>
                            3/4
                        </p>
                    </button>
                    <button className="actionButton yellowBack betActionButton">
                        <p>
                            1/2
                        </p>
                    </button>
                    <button className="actionButton yellowBack betActionButton">
                        <p>
                            Pot
                        </p>
                    </button>
                    <button className="actionButton yellowBack betActionButton">
                        <p>
                            Rip It
                        </p>
                    </button>
                </div>
                <form className="actionButton long actionText">
                        <input 
                        className="input yellowBack"
                        type="text" 
                        name="name" 
                        value={betAmount} 
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}/>
                </form>
            </div>
            
        </div>
    )
}

export default Action