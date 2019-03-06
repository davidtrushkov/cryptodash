import React from 'react';
import {AppContext} from '../App/AppProvider';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';
import {SelectableTile, DisabledTile, DeletableTile} from '../Shared/Tile';

export default function ({coinKey, topSection}) {
    return <AppContext.Consumer>
        {({coinList}) => {
            let coin = coinList[coinKey];
            let TileClass = SelectableTile;

            if (topSection) {
                TileClass = DeletableTile;
            }
            return <TileClass>
                <CoinHeaderGrid topSection={topSection} name={coin.CoinName} symbol={coin.Symbol} />
                <CoinImage coin={coin} />
            </TileClass>
        }}
    </AppContext.Consumer>
}
