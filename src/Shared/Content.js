import React from 'react';
import {AppContext} from '../App/AppProvider';

export default function (props) {
    return <AppContext.Consumer>
        {({coinList, prices, firstVist}) => {
            
            if(!coinList) {
                return <div>Loading Coins</div>
            }

            if (!firstVist && !prices) {
                return <div>Loading Prices</div>
            }

            return <div>{ props.children }</div>
        }}
    </AppContext.Consumer>
}