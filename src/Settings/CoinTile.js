import React from 'react';
import {AppContext} from '../App/AppProvider';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';
import {SelectableTile, DisabledTile, DeletableTile} from '../Shared/Tile';

function clickCoinHandler(topSection, coinKey, addCoin, removeCoin) {
    return topSection ? () => {
        removeCoin(coinKey)
    } : () => {
        addCoin(coinKey)
    }    
}

export default function ({coinKey, topSection}) {
    return <AppContext.Consumer>
        {({coinList, addCoin, removeCoin, isInFavorites}) => {
            let coin = coinList[coinKey];
            let TileClass = SelectableTile;

            /* If a coin is in the top section of favorites bar, show the deletable tile for that particular coin, else if the coin is already
                in your favoites bar then disable the coin from being clicked to go to favorites bar again */
            if (topSection) {
                TileClass = DeletableTile;
            } else if (isInFavorites(coinKey)) {
                TileClass = DisabledTile;
            }

            return <TileClass
                onClick={ clickCoinHandler(topSection, coinKey, addCoin, removeCoin) }>
                <CoinHeaderGrid 
                    topSection={topSection} 
                    name={coin.CoinName} 
                    symbol={coin.Symbol} />
                <CoinImage coin={coin} />
            </TileClass>
        }}
    </AppContext.Consumer>
}
