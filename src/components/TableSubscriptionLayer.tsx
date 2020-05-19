import React from "react";
import { useSubscription} from '@apollo/react-hooks';
import {subscriptionQuery} from '../queries';
import { useLocation, Redirect } from "react-router-dom";// eslint-disable-next-line
import {subscriptionData} from '../interfaces';
import Table from './Table';
import { useParams } from 'react-router-dom';
import {AUTH_TOKEN} from '../constants';

interface TableSubscriptionLayerParams {
    gameid: string
}

type TableSubscriptionLayerProps = { 
}

export default function TableSubscriptionLayer(Props: TableSubscriptionLayerProps) {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const params = useParams<TableSubscriptionLayerParams>();
    const location: any = useLocation();
    let gameID = location.state ? location.state.gameId : params.gameid; 
    const {data} = useSubscription(subscriptionQuery, { variables: { gameId: gameID } });
    let subscriptionData: subscriptionData | undefined;

    if (Notification.permission !== "denied") {
        Notification.requestPermission();
    }

    if (!authToken) {
        return (
            <Redirect to={{pathname: `/login/${params.gameid}`}} />
        )
    }

    if (data) {
        subscriptionData = data.change;
    } else {
        subscriptionData = undefined;
    }
    return(
        <Table subscriptionData={subscriptionData} gameid={gameID}/>
    );
}