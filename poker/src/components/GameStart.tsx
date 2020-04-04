import React, {ChangeEvent, useState} from "react";
import { useMutation} from '@apollo/react-hooks';
import {createGameMutation, joinGameQuery} from '../queries';
import '../stylesheets/GameStart.css';
import Settings from '../settings';
import {Redirect} from "react-router-dom";

type GameStartProps = {
};

export default function GameStart(Props: GameStartProps) {
    const [startGameWorkflow, setStartGameWorkflow] = useState(false);
    const [bigBlind, setBigBlind] = useState(0);
    const [smallBlind, setSmallBlind] = useState(0);
    const [gameId, setGameId] = useState("");
    const [createGame, { loading: createGameLoading, error: createGameError }] = useMutation(createGameMutation);
    const [joinGame, { loading: joinGameLoading, error: joinGameError }] = useMutation(joinGameQuery);
    const [startGame, setStartGame] = useState(false);

    function startNewGame() {
        if (Settings.dev) {
            setStartGame(true);
            return;
        }
        if (startGameWorkflow) {
            const values = { variables: { BB: bigBlind, SB: smallBlind} };
            console.log(bigBlind,smallBlind);
            createGame(values).then(e => {
                console.log(e.data.createGame);
                setGameId(e.data.createGame);
                setStartGame(true);
            }).catch(e => {
                console.log(e.toString());
            });
        } else {
            setStartGameWorkflow(true);
        }
    }

    function startGameWithID() {
        if (Settings.dev) {
            setStartGame(true);
            return;
        }
        const values = { variables: { gameId} };
        joinGame(values).then(e => {
            console.log(e);
            if(e.data.joinGame) {
                setStartGame(true);
            } else {
                console.log("wrong gameid") //TODO PUT IN USER RESPONSE
            }
        }).catch(error => {
            console.log("join game error");
            console.log(error);
        })
        
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        startGameWithID();
    }
    
    return (
        <div className="loginContainer">
            {
                startGame && <Redirect to={{pathname: '/poker', state:{gameId: gameId}}}/> 
            }
            <div className="loginContent lessOpacity">
                {createGameLoading ? <h2 className="loginInvalidUsername"> Hang Tight, Creating Game...</h2>: null}
                {joinGameLoading ? <h2 className="loginInvalidUsername"> Hang Tight, Joining Game...</h2>: null}
                {createGameError ? <h2 className="loginInvalidUsername"> {createGameError.toString() === "Error: Network error: Failed to fetch" ? "Can't connect to server" : "Can't create game"} </h2> : null}
                {joinGameError ? <h2 className="loginInvalidUsername"> {joinGameError.toString() === "Error: Network error: Failed to fetch" ? "Can't connect to server" : "Wrong Game ID"} </h2> : null}
                <button className="loginButton overlayButton" onClick={() => startNewGame()}>
                    New Game
                </button>
                
                {
                    startGameWorkflow ? 
                    <div>
                        
                        <form onSubmit={event => {event.preventDefault();startNewGame();}}>
                            <input 
                            className="loginInput overlayInput"
                            type="text" 
                            name="name" 
                            autoComplete={"off"}
                            value={bigBlind} 
                            placeholder={"big blind size"}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setBigBlind(parseInt(event.target.value))}/>
                        </form>
                        <form onSubmit={event => {event.preventDefault();startNewGame();}}>
                            <input 
                            className="loginInput overlayInput"
                            type="text" 
                            name="name" 
                            autoComplete={"off"}
                            value={smallBlind} 
                            placeholder={"small blind size"}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setSmallBlind(parseInt(event.target.value))}/>
                        </form>
                    </div> :
                    <div>
                        <button className="loginButton overlayButton" onClick={() => startGameWithID()}>
                        Join Game
                        </button>
                        <form onSubmit={event => handleSubmit(event)}>
                            <input 
                            className="loginInput overlayInput"
                            type="text" 
                            name="name" 
                            autoComplete={"off"}
                            value={gameId} 
                            placeholder={"game id"}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setGameId(event.target.value)}/>
                        </form>
                    </div>
                }
                
                
            </div>
        </div>
    )
}