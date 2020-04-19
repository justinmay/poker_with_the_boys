import React, {useState, useEffect ,useRef} from "react";
import '../stylesheets/table.css';
import TableImage from '../assets/poker_table.png';
import HandComponent from './Hand';
import {Flop, SubscriptionPlayer, Hand} from '../interfaces';
import Action from './Action';
import TableCards from './TableCards';
import SitDown from './SitDown';
import SettingsOverlay from './SettingsOverlay';
import { useLocation } from "react-router-dom";
import YourHand from './YourHand';
import { useSubscription, useQuery, useMutation} from '@apollo/react-hooks';
import {subscriptionQuery, getDataQuery, getMe, getPlayerByIDQuery} from '../queries';
import {getCardFromSubscriptionCard, getCardNumberEnumFromString, getSuitEnumFromString} from '../helperFunctions';
import {mockHand} from '../mockData';

  type TableProps = { 
  }

  function useCustomData() {

  }

  function Table(Props: TableProps) {
    const location: any = useLocation();
    const {data: meData} = useQuery(getMe);
    const [isSitting, setIsSitting] = useState(false); 
    const [hasStarted, setHasStarted] = useState(false);
    const { data, loading, error } = useSubscription(subscriptionQuery, { variables: { gameId: location.state.gameId } });
    const [hasBoughtIn, setHasBoughtIn] = useState(false);
    const [showSettingsOverlay, setShowSettingsOverlay] = useState(false);
    const shouldGetNewHand = useRef(true);
    const hasNeverGottenAHand = useRef(true);
    const [seatNumber, setSeatNumber] = useState(0);// eslint-disable-next-line
    useQuery(getDataQuery, { variables: { gameId: location.state.gameId } });
    const [getPlayerByID, {data: queryData, error: queryError}] = useMutation(getPlayerByIDQuery, { variables: { gameId: location.state.gameId , position: seatNumber} });
    
    let potSize = 0;
    let dealer = 0;
    let numPlayers = 0;
    let flop: Flop = {};
    let actionPosition = 0;
    let currBet = 0;
    let winner: number = -1;
    let player0: SubscriptionPlayer | undefined = undefined;
    let player1: SubscriptionPlayer | undefined = undefined;
    let player2: SubscriptionPlayer | undefined = undefined;
    let player3: SubscriptionPlayer | undefined = undefined;
    let player4: SubscriptionPlayer | undefined = undefined;
    let player5: SubscriptionPlayer | undefined = undefined;
    let player6: SubscriptionPlayer | undefined = undefined;
    let player7: SubscriptionPlayer | undefined = undefined;
    let me: SubscriptionPlayer | undefined = undefined;
    let username = "";
    let venmo = "";
    let state = "";
    const [currentHand, setCurrentHand] = useState(mockHand);

    if (meData) {
      username = meData.me.username;
      venmo = meData.me.venmo;
    }

    

    useEffect(() => {
      if(data) {
        me = data.change.players.find((player: SubscriptionPlayer) => {return player.user.username === username})//find the current player in the game
        if (me) {
          setIsSitting(true);
          setHasBoughtIn(true);
          setSeatNumber(me.position);
        }
        if (data.change.state !== "notStarted") {
          setHasStarted(true);
        }
      }
    });
    

    if (data) {
      

      potSize = data.change.potSize;
      dealer = data.change.dealer;
      numPlayers = data.change.numPlayers;
      currBet = data.change.curBet;
      actionPosition = data.change.action ? data.change.action : 0;
      if (data.change.state === "preflop") {
        shouldGetNewHand.current = true;
      }
      me = data.change.players.find((player: SubscriptionPlayer) => {return player.user.username === username})
      flop = {
        card1: data.change.table.length > 0 ? getCardFromSubscriptionCard(data.change.table[0]) : undefined,
        card2: data.change.table.length > 1 ? getCardFromSubscriptionCard(data.change.table[1]) : undefined,
        card3: data.change.table.length > 2 ? getCardFromSubscriptionCard(data.change.table[2]) : undefined,
        card4: data.change.table.length > 3 ? getCardFromSubscriptionCard(data.change.table[3]) : undefined,
        card5: data.change.table.length > 4 ? getCardFromSubscriptionCard(data.change.table[4]) : undefined
      }
      if (isSitting) {
        winner = data.change.winner;
        player0 = data.change.players.find((player: SubscriptionPlayer) => {return player.position === seatNumber});
        player1 = data.change.players.find((player: SubscriptionPlayer) => {return player.position === (seatNumber + 1) % 8});
        player2 = data.change.players.find((player: SubscriptionPlayer) => {return player.position === (seatNumber + 2) % 8});
        player3 = data.change.players.find((player: SubscriptionPlayer) => {return player.position === (seatNumber + 3) % 8});
        player4 = data.change.players.find((player: SubscriptionPlayer) => {return player.position === (seatNumber + 4) % 8});
        player5 = data.change.players.find((player: SubscriptionPlayer) => {return player.position === (seatNumber + 5) % 8});
        player6 = data.change.players.find((player: SubscriptionPlayer) => {return player.position === (seatNumber + 6) % 8});
        player7 = data.change.players.find((player: SubscriptionPlayer) => {return player.position === (seatNumber + 7) % 8});
      } else {
        player0 = data.change.players.find((player: SubscriptionPlayer) => {return player.position === 0});
        player1 = data.change.players.find((player: SubscriptionPlayer) => {return player.position === 1});
        player2 = data.change.players.find((player: SubscriptionPlayer) => {return player.position === 2});
        player3 = data.change.players.find((player: SubscriptionPlayer) => {return player.position === 3});
        player4 = data.change.players.find((player: SubscriptionPlayer) => {return player.position === 4});
        player5 = data.change.players.find((player: SubscriptionPlayer) => {return player.position === 5});
        player6 = data.change.players.find((player: SubscriptionPlayer) => {return player.position === 6});
        player7 = data.change.players.find((player: SubscriptionPlayer) => {return player.position === 7});
      }

      if( (hasStarted && hasNeverGottenAHand.current) || (hasStarted && shouldGetNewHand.current && data.change.state ==="newRound")) {
        const values = { variables: { gameId: location.state.gameId, position: seatNumber } };
        getPlayerByID(values).then(({data}) => {
            // saving user token to local storage
            setCurrentHand({
              card1: {
                number: getCardNumberEnumFromString(data.player.hand.card1.number),
                suit: getSuitEnumFromString(data.player.hand.card1.suit)
              },
              card2: {
                number: getCardNumberEnumFromString(data.player.hand.card2.number),
                suit: getSuitEnumFromString(data.player.hand.card2.suit)
              }
            })
        }).catch(e => {
            console.log(e);
        });
        shouldGetNewHand.current = false;
        hasNeverGottenAHand.current = false;
      }
    } 
    
    
    function dismissSettingsOverlay() {
      setShowSettingsOverlay(false);
    }

    function sitDown(seat: number) {
      setSeatNumber(seat);
      setIsSitting(true);
      setShowSettingsOverlay(true);
    }

    function player(playerInfo: SubscriptionPlayer|undefined, seatPosition: number) {
      if(isSitting) {
        return playerInfo ? <HandComponent hasStarted={hasStarted} actionPosition={actionPosition} isDealer={playerInfo.position === dealer} playerInfo={playerInfo}/> : <div className="emptyPlayer"/>
      } else {
        return playerInfo ? <HandComponent hasStarted={hasStarted} actionPosition={actionPosition} isDealer={playerInfo.position === dealer} playerInfo={playerInfo}/> : <SitDown seatNumber={seatPosition} sitDown={(seatPosition: number) => sitDown(seatPosition)}/>
      }
    }
    

    function yourHandPlayer(playerInfo: SubscriptionPlayer|undefined, seatPosition: number) {
      if(isSitting) {
        return playerInfo ? <YourHand hasStarted={hasStarted} hand={currentHand} actionPosition={actionPosition} isDealer={playerInfo.position === dealer} playerInfo={playerInfo}/> : <div className="emptyPlayer"/>
      } else {
        return playerInfo ? <HandComponent  hasStarted={hasStarted} actionPosition={actionPosition} isDealer={playerInfo.position === dealer} playerInfo={playerInfo}/> : <SitDown seatNumber={seatPosition} sitDown={(seatPosition: number) => sitDown(seatPosition)}/>
      }
    }

    return(
      <div className="tableBackground">
        {showSettingsOverlay ? <SettingsOverlay 
          setHasStarted={()=>setHasStarted(true)}
          showSettingsOverlay={() => dismissSettingsOverlay()} 
          gameId={location.state.gameId} 
          hasBoughtIn={hasBoughtIn}
          setHasBoughtInTrue={() => setHasBoughtIn(true)}
          position={seatNumber}/> 
          : null}
        {isSitting && 
          <div className="settingToggleContainer">
            <button className="settingsButtom" onClick={() => setShowSettingsOverlay(!showSettingsOverlay)}>
              {showSettingsOverlay ? "x" : "Settings"}
            </button>
          </div>
        }
        <div className="handLayer">
          <div className="row">
              { player(player3,3) }
              { player(player4,4) }
              { player(player5,5) }
          </div>

          <div className="row">
            { player(player2,2) }
            <img className="image" src={TableImage} alt={"Table"}/>
            { player(player6,6) }
          </div>

          <div className="row">
            { player(player1,1) }
            { yourHandPlayer(player0,0)}
            { player(player7,7) }
          </div>
          <TableCards flop={flop} potSize={potSize}/>
        <Action currBet={currBet} me={me!} gameId={location.state.gameId} pot={potSize} canBet={actionPosition===me?.position}/>
        </div>
      </div>
    )
  }

  export default React.memo(Table);