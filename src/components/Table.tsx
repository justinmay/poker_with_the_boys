import React, {useState ,useRef, useEffect} from "react";
import '../stylesheets/table.css';
import TableImage from '../assets/poker_table.png';
import HandComponent from './Hand';
import {Flop, SubscriptionPlayer, subscriptionData} from '../interfaces';
import Action from './Action';
import TableCards from './TableCards';
import SitDown from './SitDown';
import SettingsOverlay from './SettingsOverlay';
import YourHand from './YourHand';
import { useQuery, useMutation} from '@apollo/react-hooks';
import { getDataQuery, getMe, getPlayerByIDQuery} from '../queries';
import {getCardFromSubscriptionCard, getCardNumberEnumFromString, getSuitEnumFromString} from '../helperFunctions';
import {mockHand} from '../mockData';
import AudioController from './AudioController';

  type TableProps = { 
    subscriptionData: subscriptionData | undefined;
    gameid: string;
  }

  function Table(Props: TableProps) {
    // query to trigger subscription publish 
    useQuery(getDataQuery, { variables: { gameId: Props.gameid } });
    // Get subscription data
    const data = Props.subscriptionData;
    console.log("data", data);
    // Get user data 
    const {data: meData} = useQuery(getMe);
    let me: SubscriptionPlayer | undefined = undefined;
    let username = "";
    let venmo = "";
    if (meData) {
      username = meData.me ? meData.me.username : "";
      venmo = meData.me ? meData.me.venmo: "";
    }
    if (data) {
      me = data.players.find((player: SubscriptionPlayer) => {return player.user.username === username})//find the current player in the game
    }
    // Set States
    const [isSitting, setIsSitting] = useState(me !== undefined ? true : false); 
    const [hasBoughtIn, setHasBoughtIn] = useState(me ? true : false);
    const [seatNumber, setSeatNumber] = useState(me ? me.position : 0);
    const [hasStarted, setHasStarted] = useState(data ? data.state !== "notStarted" : false);
    const [showSettingsOverlay, setShowSettingsOverlay] = useState(false);
    const shouldGetNewHand = useRef(true);
    const hasNeverGottenAHand = useRef(true);
    const [currentHand, setCurrentHand] = useState(mockHand);
    const [getPlayerByID,] = useMutation(getPlayerByIDQuery, { variables: { gameId: Props.gameid , position: seatNumber} });

    useEffect(() => {
      if(data) {
        if (me) {
          setIsSitting(true);
          setHasBoughtIn(true);
          setSeatNumber(me.position);
        } else {
          // if the game is done set sitting false 
          if(isSitting) {
            setIsSitting(false);
          }
          if(hasBoughtIn) {
            setHasBoughtIn(false);
          }
        }
        if (data.state !== "notStarted") {
          setHasStarted(true);
        }
      }
    });

    let flop: Flop = {};
    let player0: SubscriptionPlayer | undefined = undefined;
    let player1: SubscriptionPlayer | undefined = undefined;
    let player2: SubscriptionPlayer | undefined = undefined;
    let player3: SubscriptionPlayer | undefined = undefined;
    let player4: SubscriptionPlayer | undefined = undefined;
    let player5: SubscriptionPlayer | undefined = undefined;
    let player6: SubscriptionPlayer | undefined = undefined;
    let player7: SubscriptionPlayer | undefined = undefined;

    if (data) {
      if (data.state === "preflop") {
        shouldGetNewHand.current = true;
      }
      
      flop = {
        card1: data.table.length > 0 ? getCardFromSubscriptionCard(data.table[0]) : undefined,
        card2: data.table.length > 1 ? getCardFromSubscriptionCard(data.table[1]) : undefined,
        card3: data.table.length > 2 ? getCardFromSubscriptionCard(data.table[2]) : undefined,
        card4: data.table.length > 3 ? getCardFromSubscriptionCard(data.table[3]) : undefined,
        card5: data.table.length > 4 ? getCardFromSubscriptionCard(data.table[4]) : undefined
      }
      if (isSitting) {
        player0 = data.players.find((player: SubscriptionPlayer) => {return player.position === seatNumber});
        player1 = data.players.find((player: SubscriptionPlayer) => {return player.position === (seatNumber + 1) % 8});
        player2 = data.players.find((player: SubscriptionPlayer) => {return player.position === (seatNumber + 2) % 8});
        player3 = data.players.find((player: SubscriptionPlayer) => {return player.position === (seatNumber + 3) % 8});
        player4 = data.players.find((player: SubscriptionPlayer) => {return player.position === (seatNumber + 4) % 8});
        player5 = data.players.find((player: SubscriptionPlayer) => {return player.position === (seatNumber + 5) % 8});
        player6 = data.players.find((player: SubscriptionPlayer) => {return player.position === (seatNumber + 6) % 8});
        player7 = data.players.find((player: SubscriptionPlayer) => {return player.position === (seatNumber + 7) % 8});
      } else {
        player0 = data.players.find((player: SubscriptionPlayer) => {return player.position === 0});
        player1 = data.players.find((player: SubscriptionPlayer) => {return player.position === 1});
        player2 = data.players.find((player: SubscriptionPlayer) => {return player.position === 2});
        player3 = data.players.find((player: SubscriptionPlayer) => {return player.position === 3});
        player4 = data.players.find((player: SubscriptionPlayer) => {return player.position === 4});
        player5 = data.players.find((player: SubscriptionPlayer) => {return player.position === 5});
        player6 = data.players.find((player: SubscriptionPlayer) => {return player.position === 6});
        player7 = data.players.find((player: SubscriptionPlayer) => {return player.position === 7});
      }

      if( (hasStarted && hasNeverGottenAHand.current) || (hasStarted && shouldGetNewHand.current && data.state ==="newRound")) {
        const values = { variables: { gameId: Props.gameid, position: seatNumber } };
        getPlayerByID(values).then(({data}) => {
            // saving user token to local storage
            setCurrentHand({
              card1: {
                value: getCardNumberEnumFromString(data.player.hand.card1.value),
                suit: getSuitEnumFromString(data.player.hand.card1.suit)
              },
              card2: {
                value: getCardNumberEnumFromString(data.player.hand.card2.value),
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

    function notifyMe() {
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        //alert("This browser does not support desktop notification");
      }
    
      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification("It's your turn!");
      }
    }

    useEffect(() => {
      if(data && me && data.action !== undefined && data.action === me.position) {
        console.log("it's your turn!")
        notifyMe();
      }
    });

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
        return playerInfo ? <HandComponent 
          hasStarted={hasStarted} 
          isActionOnPlayer={data && data.action !== undefined ? data.action === playerInfo.position : false} 
          isDealer={data ? playerInfo.position === data.dealer : false} 
          playerInfo={playerInfo}
          isWinner={data ? data.winners.includes(playerInfo.position)  : false}
          /> : <div className="emptyPlayer"/>
      } else {
        return playerInfo ? <HandComponent 
          hasStarted={hasStarted} 
          isActionOnPlayer={data && data.action !== undefined ? data.action === playerInfo.position : false} 
          isDealer={data ? playerInfo.position === data.dealer : false} 
          playerInfo={playerInfo}
          isWinner={data ? data.winners.includes(playerInfo.position) : false}/> : 
          <SitDown seatNumber={seatPosition} sitDown={(seatPosition: number) => sitDown(seatPosition)}/>
      }
    }
    

    function yourHandPlayer(playerInfo: SubscriptionPlayer|undefined, seatPosition: number) {
      if(isSitting) {
        return playerInfo ? <YourHand 
          hasStarted={hasStarted} 
          hand={currentHand} 
          isActionOnPlayer={data && data.action !== undefined ? data.action === playerInfo.position : false} 
          isDealer={data ? playerInfo.position === data.dealer : false} 
          playerInfo={playerInfo}
          isWinner={data ? data.winners.includes(playerInfo.position) : false}/> : 
          <div className="emptyPlayer"/>
      } else {
        return playerInfo ? <HandComponent  
          hasStarted={hasStarted} 
          isActionOnPlayer={data && data.action !== undefined ? data.action === playerInfo.position : false} 
          isDealer={data ? playerInfo.position === data.dealer : false} 
          playerInfo={playerInfo}
          isWinner={data ? data.winners.includes(playerInfo.position) : false}/> : 
          <SitDown seatNumber={seatPosition} sitDown={(seatPosition: number) => sitDown(seatPosition)}/>
      }
    }

    return(
      <div className="tableBackground">
        {showSettingsOverlay ? <SettingsOverlay 
          setHasStarted={()=>setHasStarted(true)}
          showSettingsOverlay={() => dismissSettingsOverlay()} 
          gameId={Props.gameid} 
          hasBoughtIn={hasBoughtIn}
          setHasBoughtInTrue={() => setHasBoughtIn(true)}
          position={seatNumber}
          bigBlindSize={data ? data.bigBlind : 0}
          shouldShowStartGame={data ? data.players.length > 1: false}/> 
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
          <TableCards flop={flop} potSize={data ? data.potSize: 0}/>
          <Action currBet={data ? data.curBet : 0} 
          me={me!} gameId={Props.gameid} 
          pot={data ? data.potSize: 0} 
          actionIsOnYou={data ? data.action===me?.position : 0===me?.position}
          isFolded={false}
          alreadyBetAmount={me ? me.betAmount: 0}
          hasStarted={hasStarted}/>
          </div>
          <AudioController subscriptionData={data} me={me}/>
      </div>
    )
  }

  export default React.memo(Table);