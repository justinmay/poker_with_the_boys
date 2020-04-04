import React, {useState} from "react";
import '../stylesheets/table.css';
import TableImage from '../assets/poker_table.png';
import Hand from './Hand';
import {hand} from '../interfaces';
import Action from './Action';
import TableCards from './TableCards';
import {boardState} from '../enums';
import {getDefaultFlop} from '../helperFunctions';
import SitDown from './SitDown';
import SettingsOverlay from './SettingsOverlay';
import { useLocation } from "react-router-dom";
import { useSubscription} from '@apollo/react-hooks';
import {subscriptionQuery} from '../queries';

  type TableProps = { 
  }

  export function Table(Props: TableProps) {
    const location: any = useLocation();
    const [isSitting, setIsSitting] = useState(false); 
    const [showSettingsOverlay, setShowSettingsOverlay] = useState(false);
    const [seatNumber, setSeatNumber] = useState(0); // eslint-disable-next-line
    const [p1hand, setP1Hand] = useState();// eslint-disable-next-line
    const [p2hand, setP2Hand] = useState();// eslint-disable-next-line
    const [p3hand, setP3Hand] = useState();// eslint-disable-next-line
    const [p4hand, setP4Hand] = useState();// eslint-disable-next-line
    const [p5hand, setP5Hand] = useState();// eslint-disable-next-line
    const [p6hand, setP6Hand] = useState();// eslint-disable-next-line
    const [p7hand, setP7Hand] = useState();// eslint-disable-next-line
    const [p8hand, setP8Hand] = useState();// eslint-disable-next-line
    const [flop, setFlop] = useState(getDefaultFlop());    
    const { data, loading, error } = useSubscription(subscriptionQuery, { variables: { gameId: location.state.gameId } });

    function dismissSettingsOverlay() {
      setShowSettingsOverlay(false);
    }

    function sitDown(seat: number) {
      console.log(seat);
      setSeatNumber(seat);
      setIsSitting(true);
      setShowSettingsOverlay(true);
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
        {showSettingsOverlay ? <SettingsOverlay showSettingsOverlay={() => dismissSettingsOverlay()} gameId={location.state.gameId} position={seatNumber}/> : null}
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