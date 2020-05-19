import React, {useState, ChangeEvent} from "react";
import '../stylesheets/GameStart.css';
import {createPlayerQuery, startGameMutation, addToStackMutation} from '../queries';
import { useMutation } from "@apollo/react-hooks";
import Settings from '../settings';

type SettingsOverlayProps = {
    showSettingsOverlay: () => void;
    position: number;
    gameId: string;
    hasBoughtIn: boolean;
    setHasBoughtInTrue: () => void;
    setHasStarted:() => void;
    shouldShowStartGame: boolean;
    bigBlindSize: number;
};

export default function SettingsOverlay(props: SettingsOverlayProps) {

    const [createPlayer, {loading: createPlayerLoading, error: createPlayerError}] = useMutation(createPlayerQuery);
    const [startGameMut, {loading: startGameLoading, error: startGameError}] = useMutation(startGameMutation);
    const [buyBackInMut] = useMutation(addToStackMutation);
    const [invalidBuyin, setInvalidBuyin] = useState(false);
    const [buyIn, setBuyIn] = useState("");
    let copyLink: HTMLTextAreaElement | null = null;

    function handBuyIn() {
        if (+buyIn === 0) {
            setInvalidBuyin(true);
            return
        } else {
            setInvalidBuyin(false);
        }
        if (Settings.dev) {
            props.showSettingsOverlay();
            props.setHasBoughtInTrue();
            return;
        }
        //handle buyin
        console.log(`creating game for $${buyIn} in position ${props.position} for game ${props.gameId}`);
        const values = { variables: { stack: +buyIn, position: props.position, gameId: props.gameId } }
        createPlayer(values).then(({data}) => {
            console.log(data);
            props.showSettingsOverlay();
            props.setHasBoughtInTrue();
        }).catch(e => {
            console.log(e);
        });
    }

    function handleBuyinChange(e: ChangeEvent<HTMLInputElement>) {
        const input = +e.target.value;
        if(input) {
            setBuyIn(e.target.value);
        }
    }

    function handleBuyMore(amount: number) {
        console.log(`buying back in for ${amount}`);
        const values = { variables: { amount: amount, position: props.position, gameId: props.gameId } }
        buyBackInMut(values).then(({data}) => {
            console.log(data);
            props.showSettingsOverlay();
            props.setHasBoughtInTrue();
        }).catch(e => {
            console.log(e);
        });
    }

    function startGame() {
        console.log(`starting game ${props.gameId}`);
        const values = { variables: { gameId: props.gameId } }
        startGameMut(values).then(({data}) => {
            props.setHasStarted()
            props.showSettingsOverlay();
        }).catch(e => {
            console.log(e);
        });
    }

    function copyURLtoClipboard() {
        copyLink!.select();
        document.execCommand("copy");
        copyLink!.blur();
    }

    return(
        <div className="overlay">
            
            <div className="settingsContent lessOpacity">
                 <textarea
                    className="smolAndInvs"
                    ref={(textarea) => copyLink = textarea}
                    value={"localhost:3000/poker/" + props.gameId}
                    readOnly={true}
                />
                {props.hasBoughtIn ?
                <div className="settingsOverlayContainer">
                    {startGameLoading && <h2 className="loginInvalidUsername"> Creating Game...</h2>}
                    {startGameError && <h2 className="loginInvalidUsername"> Error creating game</h2>}
                    <h3 className="settingsFields">gameid: {props.gameId}</h3>
                    <button className="loginButton overlayButton" onClick={() => copyURLtoClipboard()}>
                        Copy Share Link
                    </button>
                    {
                        props.shouldShowStartGame ? 
                        <button className="loginButton overlayButton" onClick={() => startGame()}>
                            Start Game
                        </button> : 
                        null
                    }
                    <button className="loginButton overlayButton" onClick={() => handleBuyMore(50 * props.bigBlindSize)}>
                        Buy 50 BB
                    </button>
                    <button className="loginButton overlayButton" onClick={() => handleBuyMore(100 * props.bigBlindSize)}>
                        Buy 100 BB
                    </button>
                    <button className="loginButton overlayButton" onClick={() => handleBuyMore(100 * props.bigBlindSize)}>
                        Stand Up
                    </button>
                </div> :
                <div className="settingsOverlayContainer">
                    {createPlayerLoading && <h2 className="loginInvalidUsername"> Creating Player...</h2>}
                    {createPlayerError && <h2 className="loginInvalidUsername"> Error creating game</h2>}
                    {invalidBuyin && <h2 className="loginInvalidUsername"> Invalid Buyin</h2>}
                    <form onSubmit={event => {event.preventDefault(); handBuyIn()}}>
                        <input 
                        className="loginInput overlayInput"
                        type="text" 
                        name="name" 
                        autoComplete={"off"}
                        value={buyIn} 
                        placeholder={"stack size"}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleBuyinChange(event)}/>
                    </form>
                    <button className="loginButton overlayButton" onClick={() => handBuyIn()}>
                        Buy In
                    </button>
                </div>}
            </div>
        </div>
    )
}