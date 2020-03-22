import React from "react";
import '../stylesheets/Action.css';

type ActionProps = {
};
type ActionState = {
  count: number; // like this
};

class Action extends React.Component<ActionProps, ActionState> {
  state: ActionState = {
    // optional second annotation for better type inference
    count: 0
  };

  render() {
    return (
        <div className="actionRow">
            <button className="actionButton">
                <p>
                    Buy
                </p>
            </button>
        </div>
    )}
}

export default Action