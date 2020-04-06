import React, {useState, ChangeEvent} from "react";
import '../stylesheets/GameStart.css';
import {createPlayerQuery} from '../queries';
import { useMutation } from "@apollo/react-hooks";
import Settings from '../settings';

type SettingsOverlayProps = {
    showSettingsOverlay: () => void;
    position: number;
    gameId: string;
    hasBoughtIn: boolean;
    setHasBoughtInTrue: () => void;
};

export default function SettingsOverlay(props: SettingsOverlayProps) {

    const [createPlayer, {loading, error}] = useMutation(createPlayerQuery);
    const [invalidBuyin, setInvalidBuyin] = useState(false);
    const [buyIn, setBuyIn] = useState("");

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

    return(
        <div className="overlay">
            <div className="loginContent lessOpacity">
                {props.hasBoughtIn ?
                <div>
                    <h3 className="settingsFields">gameid: {props.gameId}</h3>
                </div> :
                <div >
                    {loading && <h2 className="loginInvalidUsername"> Loading...</h2>}
                    {error && <h2 className="loginInvalidUsername"> Error creating game</h2>}
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