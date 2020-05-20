import React, { ChangeEvent, useState } from "react";
import '../stylesheets/Action.css';
import {useMutation} from '@apollo/react-hooks';
import {betMutation, foldMutaiton, allInMutation, showCardsMutation} from '../queries';
import {SubscriptionPlayer} from '../interfaces';

type ActionProps = {
    gameId: string,
    pot: number,
    me: SubscriptionPlayer,
    currBet: number,
    actionIsOnYou: boolean,
    isFolded: boolean,
    hasStarted: boolean,
    alreadyBetAmount: number,
};

/**
 * This funciton returns the action bar: TODO move the bet component to it's own component so it doesn't refresh the whole bar 
 * @param Props props for Action bar
 */
export function Action(props: ActionProps) {
    const [willBetAmount, setWillBetAmount] = useState("0");
    const [isCheckFold, setIsCheckFold] = useState(false);
    const [isCallX, setIsCallX] = useState(0);
    const [isCallAny, setIsCallAny] = useState(false);
    const [bet] = useMutation(betMutation);
    const [fold] = useMutation(foldMutaiton);
    const [allIn] = useMutation(allInMutation);
    const [showCards] = useMutation(showCardsMutation);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let bet = event.target.value;
        if (bet.match(/^-{0,1}\d+$/)) {
            setWillBetAmount(bet);
        } else if (bet === "") {
            setWillBetAmount(bet);
        }
        
    }

    function handleShowCards() {
        console.log("Show Cards");
        const values = { variables: { gameId: props.gameId} }
        showCards(values)
        .then()
        .catch(e => {
            console.log(e);
        });
    }

    function handleSizePress(modifier: number) {
        if (modifier > 0) {
            const amount = (props.pot * modifier);

            setWillBetAmount(Math.floor( amount ).toString());
        } else if (props.me) {
            setWillBetAmount(props.me.stack.toString());
        }
        
    }
    
    function betThisAmount() {
        if (!props.actionIsOnYou) return;
        if (+willBetAmount === props.me.stack) {
            //if all in
            handleAllIn();
            setWillBetAmount("0");
        } else if (+willBetAmount > 0){
            console.log("bet ", willBetAmount)
            const values = { variables: { gameId: props.gameId, amount: +willBetAmount} }
            bet(values)
            .then()
            .catch(e => {
                console.log(e);
            });
            setWillBetAmount("0");
        }
    }

    function check() {
        if (props.actionIsOnYou){
            console.log("check")
            const checkAmount = props.alreadyBetAmount < 0 ? 0 : props.alreadyBetAmount;
            const values = { variables: { gameId: props.gameId, amount: checkAmount} }
            bet(values);
            setWillBetAmount("0");
        }
        
    }

    function call() {
        if(props.actionIsOnYou) {
            if(props.me.stack <= props.currBet-(+willBetAmount)) {
                console.log("call allin");
                handleAllIn();
            } else {
                const amount = props.currBet;
                console.log("call",amount);
                const values = { variables: { gameId: props.gameId, amount: amount} };
                bet(values);
            }
            setWillBetAmount("0");
        }
    }

    function handefold() {
        if (props.actionIsOnYou) {
            console.log("fold")
            const values = { variables: { gameId: props.gameId} }
            fold(values);
            setWillBetAmount("0");
        }
    }

    function  handleAllIn() {
        if (props.actionIsOnYou) {
            console.log("allin")
            const values = { variables: { gameId: props.gameId} }
            allIn(values);
        } 
        setWillBetAmount("0");
    }

    if(!props.hasStarted || !props.me){
        return(
            <div></div>
        )
    }

    if(isCallX > 0 && isCallX < props.currBet) {
        setIsCallX(0)
    }

    if(isCheckFold && props.actionIsOnYou ) {
        if ((props.me.betAmount === props.currBet) || (props.me?.betAmount <= 0 && props.currBet <= 0)) {
            // check
            check();
        } else {
            // fold
            handefold();
        }
        setIsCheckFold(false);
    } else if (isCallAny && props.actionIsOnYou) {
        // call any
        call();
        setIsCallAny(false);
    } else if (isCallX && props.actionIsOnYou) {
        call();
    }

    if(props.isFolded) {
        return(
            <div className="actionRow">
                <button className="actionButton greyBack" onClick={() => showCards()}>
                    <p>
                        Show Cards
                    </p>
                </button>
            </div>
        )
    }

    if(!props.actionIsOnYou) {
        return(
            <div className="actionRow">
                <button className={`actionButton medium ${isCheckFold ? "greenBack" : ""}`} onClick={() => {setIsCheckFold(!isCheckFold); setIsCallAny(false); setIsCallX(0)}}>
                    <p>
                        Check/Fold
                    </p>
                </button>
                {
                    props.currBet > 0 && props.currBet > props.me.betAmount && 
                    <button className={`actionButton medium ${isCallX ? "greenBack" : ""}`} onClick={() => {setIsCallX(isCallX ? 0 : props.currBet);setIsCallAny(false);setIsCheckFold(false)}}>
                        <p>
                            Call {props.currBet}
                        </p>
                    </button>
                }
                
                <button className={`actionButton medium ${isCallAny ? "greenBack" : ""}`} onClick={() => {setIsCallAny(!isCallAny); setIsCheckFold(false); setIsCallX(0)}}>
                    <p>
                        Call Any
                    </p>
                </button>
            </div>
        )
    }

    return (
        <div className="actionRow">
            {
                (props.me.betAmount === props.currBet) || (props.me?.betAmount <= 0 && props.currBet <= 0) ? 
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
            <button className="actionButton redBack" onClick={() => handleAllIn()}>
                <p>
                    All In
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
                    <button className="actionButton betActionButton yellowBack" onClick={() => handleSizePress(.5)}>
                        <p>
                            1/2
                        </p>
                    </button>
                    <button className="actionButton betActionButton yellowBack" onClick={() => handleSizePress(.75)}>
                        <p>
                            3/4
                        </p>
                    </button>
                    <button className="actionButton betActionButton yellowBack" onClick={() => handleSizePress(1)}>
                        <p>
                            Pot
                        </p>
                    </button>
                    <button className="actionButton betActionButton yellowBack" onClick={() => handleSizePress(3)}>
                        <p>
                            3x
                        </p>
                    </button>
                </div>
                <form className={`actionButton long ${props.actionIsOnYou ? 'actionText':'actionText'}`}>
                        <input 
                        className="input yellowBack"
                        type="text" 
                        name="name" 
                        value={willBetAmount} 
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}/>
                </form>
            </div>
            <button className="actionButton greyBack" onClick={() => handleShowCards()}>
                <p>
                    Show Cards
                </p>
            </button>
            
        </div>
    )
}

export default Action