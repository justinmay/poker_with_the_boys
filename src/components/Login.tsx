import React, {ChangeEvent, useState} from "react";
import '../stylesheets/Login.css';
import {Redirect, useParams} from "react-router-dom";
import { useMutation} from '@apollo/react-hooks';
import {signUpQuery, signInQuery} from '../queries';
import Settings from '../settings';
import {AUTH_TOKEN} from '../constants';
import {createGameMutation, joinGameQuery} from '../queries';

interface LoginParams {
    gameid: string
}

type LoginAfterDataProps = {
};

export function Login(Props: LoginAfterDataProps) { 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showSignUpScreen, setShowSignUpScreen] = useState(false);
    const [venmo, setVenmo] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);// eslint-disable-next-line
    const [signUp, {  loading: signUpLoading, error: signUpError }] = useMutation(signUpQuery);// eslint-disable-next-line
    const [signIn, { loading: signInLoading, error: signInError}] = useMutation(signInQuery, { errorPolicy: 'all' });
    const params = useParams<LoginParams>();
    const [isGoToGame, setIsGoToGame] = useState(false);
    const [joinGame, { loading: joinGameLoading, error: joinGameError }] = useMutation(joinGameQuery);    

    function login(e: any) {
        e.preventDefault();
        if(Settings.dev) {
            setIsLoggedIn(true);
        } else if(showSignUpScreen) {
            handleSignUp(e)
        } else {
            const values = {variables: {username, password}};
            signIn(values).then( ({data}) => {
                //getting the token 
                _saveUserData(data.signIn.token);
                
                
            }).catch(e => {
                console.log(e);
              });
        }
    }

    function _saveUserData(token: string) {
        localStorage.setItem(AUTH_TOKEN, token);
        console.log("token",token);
        routeToNextScreen();
    }

    function routeToNextScreen() {
        //checking for valid gameID
        if (params.gameid) {
            const gameId = params.gameid
            const values = { variables: { gameId} };
            joinGame(values).then(e => {
                console.log("join game", e);
                if(e.data.joinGame) {
                    setIsGoToGame(true);
                } else {
                    console.log("invalid gameid") //TODO PUT IN USER RESPONSE
                    setIsLoggedIn(true);
                }
            }).catch(error => {
                console.log("join game error");
                console.log(error);
            })
            
        } else {
            setIsLoggedIn(true);
        }
    }

    function handleSignUp(e: any) { //todo: TEST THIS
        e.preventDefault(); 
        if(showSignUpScreen) {
            const values = { variables: { username, password, venmo } }
            signUp(values).then(({data}) => {
                // saving user token to local storage
                console.log(data)
                _saveUserData(data.signUp.token);
            }).catch(e => {
                console.log(e);
            });
        }
        setShowSignUpScreen(true);
    }

    return (
        <div className="loginContainer">
            {
               isGoToGame && <Redirect to={{ pathname: `/poker/${params.gameid}` }} /> 
            }
            {
            isLoggedIn ?
            <Redirect to={{pathname: '/GameStart'}} /> :
          
            <div className="loginContent">
                <div>
                    <h1 className="loginHeader">Poker With The Boys</h1>
                    <h1 className="loginSymbols">♤ ♡ ♢ ♧</h1>
                </div>

                <form onSubmit={event=>login(event)}>
                    {Settings.dev ? <h2 className="loginInvalidUsername"> Dev Mode - password Admin</h2> : null}
                    {signInLoading || signUpLoading ? <h2 className="loginInvalidUsername"> Loading...</h2> : null}
                    {signInError && !showSignUpScreen ? <h2 className="loginInvalidUsername"> {signInError.toString() === "Error: Network error: Failed to fetch" ? "Can't connect to server" : "Invalid Username or Password"} </h2> : null}
                    {signUpError && showSignUpScreen ? <h2 className="loginInvalidUsername"> {signUpError.toString() === "Error: Network error: Failed to fetch" ? "Can't connect to server" : "Username already taken"} </h2> : null}
                    <input 
                    className="loginInput"
                    type="text" 
                    name="name" 
                    value={username} 
                    autoComplete={"off"}
                    placeholder={"username"}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}/>
                </form>

                <form onSubmit={event=>login(event)}>
                    <input 
                    className="loginInput"
                    type="password" 
                    name="name" 
                    value={password} 
                    placeholder={"password"}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}/>
                </form>
                
                {
                    showSignUpScreen ?
                    <form onSubmit={event=>login(event)}>
                        <input 
                        className="loginInput"
                        type="text" 
                        name="name" 
                        value={venmo} 
                        autoComplete={"off"}
                        placeholder={"venmo handle"}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setVenmo(event.target.value)}/>
                    </form>
                    : null
                }
                <div className="loginButtonContainer">
                    {
                        showSignUpScreen ? 
                        <button className="loginButton" onClick={() => {setShowSignUpScreen(false);}}>
                            Back
                        </button> : 
                        <button className="loginButton" onClick={event => login(event)}>
                            Login
                        </button>
                    }
                    <button className="loginButton" onClick={event => handleSignUp(event)}>
                        Sign Up
                    </button>
                </div>
            </div>
            }
      </div>
  )
}

export default Login;