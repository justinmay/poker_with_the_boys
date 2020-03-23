import React from "react";
import '../stylesheets/table.css';
import TableImage from '../assets/poker_table.png';
import Hand from './Hand';
import Action from './Action';
import TableCards from './TableCards';
import {hand, flop} from '../interfaces';
import {suits, cardNumbers, boardState} from '../enums';

  type TableProps = {
  };

  type TableState = {
    p1hand?: hand;
    p2hand?: hand;
    p3hand?: hand;
    p4hand?: hand;
    p5hand?: hand;
    p6hand?: hand;
    p7hand?: hand;
    p8hand?: hand;
    flop: flop;
  };

  var temporaryHand: hand = {
    card1: {
      suit: suits.Club,
      value: cardNumbers.six,
    },
    card2: {
      suit: suits.Diamond,
      value: cardNumbers.two,
    }
  }

  var tempFlop: flop = {
    card1: {
      suit: suits.Club,
      value: cardNumbers.six,
    },
    card2: {
      suit: suits.Diamond,
      value: cardNumbers.ace,
    },
    card3: {
      suit: suits.Diamond,
      value: cardNumbers.jack,
    },
    card4: {
      suit: suits.Diamond,
      value: cardNumbers.queen,
    },
    card5: {
      suit: suits.Diamond,
      value: cardNumbers.king
    }
  }

  class Table extends React.Component<TableProps, TableState> {
    state: TableState = {
      // optional second annotation for better type inference
      p1hand: temporaryHand,
      p2hand: undefined,
      p3hand: temporaryHand,
      p4hand: undefined,
      p5hand: undefined,
      p6hand: undefined,
      p7hand: undefined,
      p8hand: undefined,
      flop: tempFlop,
    };

    render() {
      return (
        <div className="tableBackground">
            <TableCards flop={this.state.flop} boardState={boardState.flop}/>
            <div className="handLayer">
                <div className="row">
                    { this.state.p1hand ? <Hand hand={this.state.p1hand} playerName="player" show={false}/> : <div className="emptyPlayer"/>}
                    { this.state.p2hand ? <Hand hand={this.state.p2hand} playerName="player" show={false}/> : <div className="emptyPlayer"/>}
                    { this.state.p3hand ? <Hand hand={this.state.p3hand} playerName="player" show={false}/> : <div className="emptyPlayer"/>}
                </div>

                <div className="row">
                <Hand hand={temporaryHand} playerName="player" show={false}/>
                <img className="image" src={TableImage} alt={"Table"}/>
                <Hand hand={temporaryHand} playerName="player" show={false}/>
                </div>

                <div className="row">
                  <Hand hand={temporaryHand} playerName="player" show={false}/>
                  <Hand hand={temporaryHand} playerName="player" show={true}/>
                  <Hand hand={temporaryHand} playerName="player" show={false}/>
                </div>
                <Action/>
            </div>
        </div>
      );
    }
  }

  export default Table;