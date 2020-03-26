import React, {useState} from "react";
import '../stylesheets/SitDown.css';

type SitDownProps = {
    seatNumber: number;
    sitDown: any;
};

export default function SitDown(Props: SitDownProps) {
    function handleClick() {
        Props.sitDown(Props.seatNumber);
        //TODO: send seat nubmer to server 
    }
    return (
        <div className="emptyPlayer">
            <button className="Card sitDownButton" onClick={handleClick}>
                Sit Down 
            </button>
        </div>
    );
}