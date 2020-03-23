import React, {ChangeEvent} from "react";
import '../stylesheets/Login.css';
import {Redirect} from "react-router-dom";

type LoginProps = {
};

type LoginState = {
    username: string;
    signUp: boolean;
    venmo: string;
    loggedIn: boolean;
    showInvalidUser: boolean;
};

class Login extends React.Component<LoginProps, LoginState> {
    
    constructor(props: LoginProps) {
        super(props);
        this.state = { 
            username: "",
            signUp: false,
            venmo: "",
            loggedIn: false,
            showInvalidUser: false,
        };

        this.handleUsername = this.handleUsername.bind(this);
        this.handleVenmo = this.handleVenmo.bind(this);
        this.login = this.login.bind(this);
    }

    /**
     * This method handles state changes for username from the venmo input 
     * @param event the HTMLInputElement event from an input
     */
    handleUsername(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            username: event.target.value,
        });
    }

    /**
     * This method handles state changes for venmo from the venmo input
     * @param event the HTMLInputElement event from an input
     */
    handleVenmo(event: ChangeEvent<HTMLInputElement>) {
        this.setState({ 
            venmo: event.target.value,
        });
    }

    /**
     * This method handles logging in and creating a user 
     * TODO: hook up to server  
     */
    login(e: any) {
        //this.state.venmo;
        //this.state.signUp;
        if(this.state.signUp) {
            //TODO: handle signup 
        } else {
            // Login 
            if (this.state.username === "admin") { //TODO: replace with server username lookup
                //TODO: route to table 
                this.setState({
                    loggedIn: true,
                });
            } else {
                //login fails
                this.setState({
                    showInvalidUser: true,
                });
                console.log("invalid user")
                e.preventDefault();
            }
        }
    }

    render() {
      return (
          <div className="loginContainer">
              {
                  this.state.loggedIn ? <Redirect to="/poker" /> :
              
                <div className="loginContent">
                    <div>
                        <h1 className="loginHeader">Poker With The Boys</h1>
                        <h1 className="loginSymbols">♤ ♡ ♢ ♧</h1>
                        
                    </div>
                    
                    <form onSubmit={this.login}>
                        {this.state.showInvalidUser ? <h2 className="loginInvalidUsername"> Invalid Username</h2> : null}
                        <input 
                        className="loginInput"
                        type="text" 
                        name="name" 
                        value={this.state.username} 
                        placeholder={"username"}
                        onChange={this.handleUsername}/>
                    </form>
                    
                    {
                        this.state.signUp ?
                        <form onSubmit={this.login}>
                            <input 
                            className="loginInput"
                            type="text" 
                            name="name" 
                            value={this.state.venmo} 
                            placeholder={"venmo handle"}
                            onChange={this.handleVenmo}/>
                        </form>
                        : null
                    }
                    <div className="loginButtonContainer">
                        {
                            this.state.signUp ? 
                            <button className="loginButton" onClick={() => this.setState({signUp: false})}>
                                Back
                            </button> : 
                            <button className="loginButton" onClick={this.login}>
                                Login
                            </button>
                        }
                        <button className="loginButton" onClick={() => this.setState({signUp: true})}>
                            Sign Up
                        </button>
                    </div>
                </div>
                }
          </div>
      )
    }
}

export default Login;