import React, {ChangeEvent, useState} from "react";
import '../stylesheets/Login.css';
import {Redirect} from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import {usersQuery} from '../queries';
import {Users, User} from '../interfaces';
import Settings from '../settings';

export function Login() {
    const { loading, error, data } = useQuery(usersQuery);

    if(loading) return <p>Loading...</p>; //TODO: make an actual loading screen
    if(!Settings.dev && error) return <p>Error</p>; //TODO: make an actual error screen
    console.log(data)
    const users: Users = data;
    return <LoginAfterData users={users}/>
}

type LoginAfterDataProps = {
    users: Users;
};

export function LoginAfterData(Props: LoginAfterDataProps) { // replace with Login 
    const [username, setUsername] = useState("");
    const [showSignUpScreen, setShowSignUpScreen] = useState(false);
    const [venmo, setVenmo] = useState("");
    const [showInvalidUser, setShowInvalidUser] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function login(e: any) {
        e.preventDefault();
        if(Settings.dev) {
            setIsLoggedIn(true);
        } else if(showSignUpScreen) {
            //TODO: sign up the user
        } else {
            // verify the user 
            const user = Props.users.users.find((user: User) => {
                return user.username === username
            })
            if(user) {
                //valid user login!
                console.log("login!")
                setIsLoggedIn(true);
            } else {
                //invalid user
                setShowInvalidUser(true);
            }
        }
    }
    

    return (
        <div className="loginContainer">
          {
              isLoggedIn ? <Redirect to="/poker" /> :
          
            <div className="loginContent">
                <div>
                    <h1 className="loginHeader">Poker With The Boys</h1>
                    <h1 className="loginSymbols">♤ ♡ ♢ ♧</h1>
                    
                </div>
                
                <form onSubmit={event=>login(event)}>
                    {showInvalidUser ? <h2 className="loginInvalidUsername"> Invalid Username</h2> : null}
                    {Settings.dev ? <h2 className="loginInvalidUsername"> Dev Mode - password Admin</h2> : null}
                    <input 
                    className="loginInput"
                    type="text" 
                    name="name" 
                    value={username} 
                    placeholder={"username"}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}/>
                </form>
                
                {
                    showSignUpScreen ?
                    <form onSubmit={() => "TODO"}>
                        <input 
                        className="loginInput"
                        type="text" 
                        name="name" 
                        value={venmo} 
                        placeholder={"venmo handle"}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setVenmo(event.target.value)}/>
                    </form>
                    : null
                }
                <div className="loginButtonContainer">
                    {
                        showSignUpScreen ? 
                        <button className="loginButton" onClick={() => setShowSignUpScreen(false)}>
                            Back
                        </button> : 
                        <button className="loginButton" onClick={event => login(event)}>
                            Login
                        </button>
                    }
                    <button className="loginButton" onClick={() => setShowSignUpScreen(true)}>
                        Sign Up
                    </button>
                </div>
            </div>
            }
      </div>
  )
}

export default Login;