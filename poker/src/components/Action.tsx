import React, { ChangeEvent } from "react";
import '../stylesheets/Action.css';

type ActionProps = {
};
type ActionState = {
  bet: number; // like this
};

class Action extends React.Component<ActionProps, ActionState> {
    constructor(props: ActionProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    state: ActionState = {
        // optional second annotation for better type inference
        bet: 0
    };

    handleChange(event: ChangeEvent<HTMLInputElement>) {
        let bet = event.target.value;
        if (bet.match(/^-{0,1}\d+$/)) {
            this.setState({
                bet: parseInt(bet)
            })
        } else if (bet === "") {
            this.setState({
                bet: 0
            })
        }
        
    }

    render() {
    return (
        <div className="actionRow">
            <button className="actionButton greenBack">
                <p>
                    Check
                </p>
            </button>
            <button className="actionButton long blueBack">
                <p>
                    Check > Fold
                </p>
            </button>
            <button className="actionButton redBack">
                <p>
                    Fold
                </p>
            </button>
            <button className="actionButton yellowBack">
                <p>
                    Bet 1/2
                </p>
            </button>
            <button className="actionButton yellowBack">
                <p>
                    Bet 3/4
                </p>
            </button>
            <button className="actionButton yellowBack">
                <p>
                    Bet Pot
                </p>
            </button>
            <button className="actionButton yellowBack">
                <p>
                    Rip It
                </p>
            </button>
            <button className="actionButton yellowBack">
                <p>
                    Bet
                </p>
            </button>
            <form className="actionButton long">
                    <input 
                    className="input yellowBack"
                    type="text" 
                    name="name" 
                    value={this.state.bet} 
                    onChange={this.handleChange}/>
            </form>
        </div>
    )}
}

export default Action