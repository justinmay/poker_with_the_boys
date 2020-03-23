import React, {ChangeEvent} from "react";
import '../stylesheets/Login.css';

type LoginProps = {
};

type LoginState = {
    username: string;
    signUp: boolean;
    venmo: string;
};

class Login extends React.Component<LoginProps, LoginState> {
    state: LoginState = { 
        username: "",
        signUp: false,
        venmo: "",
    };

    constructor(props: LoginProps) {
        super(props);
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
    login() {
        //this.state.venmo;
        //this.state.signUp;
        if(this.state.signUp) {
            //TODO: handle signup 
        } else {
            // Login 
            if (this.state.username === "admin") { //TODO: replace with server username lookup
                //TODO: route to table 
            }
        }
    }

    render() {
      return (
          <div className="loginContainer">
              <div className="loginContent">
                    <h1 className="loginHeader">Poker With The Boys</h1>
                    <h1 className="loginSymbols">♤ ♡ ♢ ♧</h1>
                    <input 
                    className="loginInput"
                    type="text" 
                    name="name" 
                    value={this.state.username} 
                    placeholder={"username"}
                    onChange={this.handleUsername}/>
                    {
                        this.state.signUp ?
                        <input 
                        className="loginInput"
                        type="text" 
                        name="name" 
                        value={this.state.venmo} 
                        placeholder={"venmo handle"}
                        onChange={this.handleVenmo}/>
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
          </div>
      )
    }
}

export default Login;