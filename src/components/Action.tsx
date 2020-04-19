import React, { ChangeEvent, useState } from "react";
import '../stylesheets/Action.css';
import {useMutation} from '@apollo/react-hooks';
import {betMutation, foldMutaiton, allInMutation} from '../queries';
import {SubscriptionPlayer} from '../interfaces';

type ActionProps = {
    gameId: string,
    pot: number,
    me: SubscriptionPlayer,
    currBet: number,
    canBet: boolean
};

/**
 * This funciton returns the action bar: TODO move the bet component to it's own component so it doesn't refresh the whole bar 
 * @param Props props for Action bar
 */
export function Action(props: ActionProps) {
    const [betAmount, setBetAmount] = useState("0");
    const [bet, {loading: betLoading, error: betError}] = useMutation(betMutation);
    const [fold] = useMutation(foldMutaiton);
    const [allIn] = useMutation(allInMutation);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let bet = event.target.value;
        if (bet.match(/^-{0,1}\d+$/)) {
            setBetAmount(bet);
        } else if (bet === "") {
            setBetAmount(bet);
        }
        
    }

    function handleSizePress(modifier: number) {
        if (modifier > 0) {
            const amount = (props.pot * modifier);

            setBetAmount(Math.floor( amount ).toString());
        } else if (props.me) {
            setBetAmount(props.me.stack.toString());
        }
        
    }
    
    function betThisAmount() {
        if (!props.canBet) return;
        if (+betAmount === props.me.stack) {
            //if all in
            handleAllIn();
        } else {
            console.log("bet ", betAmount)
            const values = { variables: { gameId: props.gameId, amount: +betAmount} }
            bet(values)
            .then()
            .catch(e => {
                console.log(e);
            });
            
        }
    }

    function check() {
        if (props.canBet){
            console.log("check")
            const values = { variables: { gameId: props.gameId, amount: 0} }
            bet(values);
        }
        
    }

    function call() {
        if(props.canBet) {
            if(props.me.stack <= props.currBet-(+betAmount)) {
                console.log("call allin");
                handleAllIn();
            } else {
                console.log("call");
                const amount = props.me.betAmount < 0 ? props.currBet : props.currBet - props.me.betAmount;
                const values = { variables: { gameId: props.gameId, amount: amount} };
                bet(values);
            }
        }
    }

    function handefold() {
        if (props.canBet) {
            console.log("fold")
            const values = { variables: { gameId: props.gameId} }
            fold(values);
        }
    }

    function  handleAllIn() {
        if (props.canBet) {
            console.log("allin")
            const values = { variables: { gameId: props.gameId} }
            allIn(values);
        } 
    }

    if (!props.canBet) {
        return (<div></div>)
    }

    return (
        <div className="actionRow">
            {
                (props.me.betAmount === props.currBet) || (props.me.betAmount <= 0 && props.currBet <= 0) ? 
                <button className="actionButton greenBack" onClick={() => check()}>
                    <p>
                        Check
                    </p>
                </button> :
                <button className="actionButton blueBack" onClick={() => call()}>
                    <p>
                        Call
                    </p>
                </button>
            }
            <button className="actionButton redBack" onClick={() => {handefold()}}>
                <p>
                    Fold
                </p>
            </button>
            <button className="actionButton yellowBack" onClick={() => betThisAmount()}>
                <p>
                    { 
                        (props.me.betAmount === props.currBet) || (props.me.betAmount <= 0 && props.currBet <= 0) ? 
                        "Bet" :
                        "Raise"
                    }
                </p>
            </button>
            <div className="betContainer">
                <div className="betActionButtonContainer">
                    <button className="actionButton yellowBack betActionButton" onClick={() => handleSizePress(.5)}>
                        <p>
                            1/2
                        </p>
                    </button>
                    <button className="actionButton yellowBack betActionButton" onClick={() => handleSizePress(.75)}>
                        <p>
                            3/4
                        </p>
                    </button>
                    <button className="actionButton yellowBack betActionButton" onClick={() => handleSizePress(1)}>
                        <p>
                            Pot
                        </p>
                    </button>
                    <button className="actionButton yellowBack betActionButton" onClick={() => handleSizePress(-1)}>
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