import React, {useState, ChangeEvent} from "react";
import '../stylesheets/GameStart.css';
import {createPlayerQuery} from '../queries';
import { useMutation } from "@apollo/react-hooks";

type SettingsOverlayProps = {
    showSettingsOverlay: () => void;
    position: number;
    gameId: string;
};

export default function SettingsOverlay(Props: SettingsOverlayProps) {

    const [createPlayer, {loading, error}] = useMutation(createPlayerQuery);
    const [buyIn, setBuyIn] = useState(0);

    function handBuyIn() {
        //handle buyin
        Props.showSettingsOverlay();
        console.log("settings overlay seta number ",Props.position);
        console.log(`creating game for $${buyIn} in position ${Props.position} for game ${Props.gameId}`);
        const values = { variables: { stack: buyIn, position: Props.position, gameId: Props.gameId } }
        createPlayer(values).then(({data}) => {
            console.log(data);
        }).catch(e => {
            console.log(e);
        });
    }

    return(
        <div className="overlay">
            <div className="loginContent lessOpacity">
                {loading && <h2 className="loginInvalidUsername"> Loading...</h2>}
                {error && <h2 className="loginInvalidUsername"> Error creating game</h2>}
                <form onSubmit={event => {event.preventDefault(); handBuyIn()}}>
                    <input 
                    className="loginInput overlayInput"
                    type="text" 
                    name="name" 
                    autoComplete={"off"}
                    value={buyIn} 
                    placeholder={"game id"}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setBuyIn(parseInt(event.target.value))}/>
                </form>
                <button className="loginButton overlayButton" onClick={() => handBuyIn()}>
                    Buy In
                </button>
            </div>
        </div>
    )
}