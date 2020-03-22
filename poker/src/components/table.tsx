import React from "react";
import '../stylesheets/table.css';
import TableImage from '../assets/poker_table.png';
import Hand from './Hand';
import Action from './Action';
import TableCards from './TableCards';

  type TableProps = {
  };
  type TableState = {
    count: number; // like this
  };

  class Table extends React.Component<TableProps, TableState> {
    state: TableState = {
      // optional second annotation for better type inference
      count: 0
    };

    render() {
      return (
        <div className="tableBackground">
            <TableCards
            card1number={"10"}
            card2number={"J"}
            card3number={"Q"}
            card4number={"K"}
            card5number={"A"}
            card1suit={"club"}
            card2suit={"club"}
            card3suit={"club"}
            card4suit={"club"}
            card5suit={"club"}
            />
            <div className="handLayer">
                <div className="row">
                    <Hand card1number={"4"} card1suit={"club"} card2number={"K"} card2suit={"heart"}/>
                    <Hand card1number={"6"} card1suit={"diamond"} card2number={"2"} card2suit={"heart"}/>
                    <Hand card1number={"6"} card1suit={"diamond"} card2number={"2"} card2suit={"heart"}/>
                </div>

                <div className="row">
                <Hand card1number={"6"} card1suit={"diamond"} card2number={"2"} card2suit={"heart"}/>
                <img className="image" src={TableImage} alt={"Table"}/>
                <Hand card1number={"A"} card1suit={"spade"} card2number={"2"} card2suit={"heart"}/>
                </div>

                <div className="row">
                    <Hand card1number={"J"} card1suit={"club"} card2number={"2"} card2suit={"heart"} playerBet={200}/>
                    <Hand card1number={"6"} card1suit={"diamond"} card2number={"2"} card2suit={"heart"}/>
                    <Hand card1number={"6"} card1suit={"diamond"} card2number={"2"} card2suit={"heart"}/>
                </div>
                <Action/>
            </div>
        </div>
      );
    }
  }

  export default Table;