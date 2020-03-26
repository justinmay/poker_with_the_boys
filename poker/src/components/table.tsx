import React, {useState} from "react";
import '../stylesheets/table.css';
import TableImage from '../assets/poker_table.png';
import Hand from './Hand';
import {hand} from '../interfaces';
import Action from './Action';
import TableCards from './TableCards';
import {boardState} from '../enums';
import {getDefaultHand, getDefaultFlop} from '../helperFunctions';
import SitDown from './SitDown';

  type TableProps = {
  };

  export function Table(Props: TableProps) {
    // eslint-disable-next-line
    const [isSitting, setIsSitting] = useState(false); // eslint-disable-next-line
    const [p1hand, setP1Hand] = useState(getDefaultHand());// eslint-disable-next-line
    const [p2hand, setP2Hand] = useState(getDefaultHand());// eslint-disable-next-line
    const [p3hand, setP3Hand] = useState(getDefaultHand());// eslint-disable-next-line
    const [p4hand, setP4Hand] = useState(getDefaultHand());// eslint-disable-next-line
    const [p5hand, setP5Hand] = useState(getDefaultHand());// eslint-disable-next-line
    const [p6hand, setP6Hand] = useState(getDefaultHand());// eslint-disable-next-line
    const [p7hand, setP7Hand] = useState();// eslint-disable-next-line
    const [p8hand, setP8Hand] = useState();// eslint-disable-next-line
    const [flop, setFlop] = useState(getDefaultFlop());

    function sitDown(seat: number) {
      console.log(seat)
      setIsSitting(true);
    }
    function player(hand: hand|undefined, seatNumber: number) {
      if(isSitting) {
        return hand ? <Hand hand={hand} playerName="player" show={true}/> : <div className="emptyPlayer"/>
      } else {
        return hand ? <Hand hand={hand} playerName="player" show={true}/> : <SitDown seatNumber={seatNumber} sitDown={(seatNumber: number) => sitDown(seatNumber)}/>
      }
    }

    return(
      <div className="tableBackground">
            <TableCards flop={flop} boardState={boardState.flop}/>
            <div className="handLayer">
                <div className="row">
                    { player(p1hand,1) }
                    { player(p2hand,2) }
                    { player(p3hand,3) }
                </div>

                <div className="row">
                  { player(p4hand,4) }
                  <img className="image" src={TableImage} alt={"Table"}/>
                  { player(p5hand,5) }
                </div>

                <div className="row">
                  { player(p6hand,6) }
                  { player(p7hand,7) }
                  { player(p8hand,8) }
                </div>
                <Action/>
            </div>
        </div>
    )
  }

  export default Table;