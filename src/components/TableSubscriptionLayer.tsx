import React from "react";
import { useSubscription} from '@apollo/react-hooks';
import {subscriptionQuery} from '../queries';
import { useLocation } from "react-router-dom";// eslint-disable-next-line
import {subscriptionData} from '../interfaces';
import Table from './Table';

type TableSubscriptionLayerProps = { 
}

export default function TableSubscriptionLayer(Props: TableSubscriptionLayerProps) {
    const location: any = useLocation();
    const {data} = useSubscription(subscriptionQuery, { variables: { gameId: location.state.gameId } });
    let subscriptionData: subscriptionData | undefined;
    if (data) {
        subscriptionData = data.change;
    } else {
        subscriptionData = undefined;
    }
    return(
        <Table subscriptionData={subscriptionData}/>
    );
}