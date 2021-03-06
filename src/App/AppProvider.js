import React from 'react';
import _ from 'lodash';

const cc = require('cryptocompare');

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard',
            favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setFilteredCoins: this.setFilteredCoins
        }
    }

    // Add coin to favorites
    addCoin = key => {
        // Get the coin in favorites from state and set them to "favorites" variable
        let favorites = [...this.state.favorites];

        // If the length of the favorites array is LESS THAN the MAX-FAVORITES constant (10), then push key into favorites. Then set the new state
        if (favorites.length < MAX_FAVORITES) {
            favorites.push(key);
            this.setState({favorites});
        }
    }

    // Remove coin from favorites
    removeCoin = key => {
        // Get the coin in favorites from state and set them to "favorites" variable
        let favorites = [...this.state.favorites];
 
        // Remove coin from favorites array
        this.setState({favorites: _.pull(favorites, key)});
    }

    // Check if certain coin is in favorites array
    // Used to disable the coin tile if coin already in favorites bar
    isInFavorites = key => _.includes(this.state.favorites, key)

    // When this component mounts, fetch all the coins from API and Prices
    componentDidMount = () => {
        this.fetchCoins();
        this.fetchPrices();
    }

    // Fetch coins from API
    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
    }

    fetchPrices = async () => {
        if (this.state.firstVisit) return
        let prices = await this.prices();
        this.setState({prices});
    }

    prices = async () => {
        // Set "returnData" to an empty array
        let returnData = [];

        // Do a for loop over a users "favorites" crypto coins
        for (let i = 0; i < this.state.favorites.length; i++) {
            // Try to get the price data from API
            try {
                // Take in symbol and currency of coin
                let priceData = await cc.priceFull(this.state.favorites[i], 'USD');

                // Then push the data into "returnData"
                returnData.push(priceData);

                // Else if we have error, log error
            } catch (e) {
                console.log('Fetch price error: ', e);
            }
        }
        return returnData;
    }

    // Confirm your favorite coins by setting them in local storage 
    confirmFavorites = () => {
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        }, () => {
            this.fetchPrices();
        });

        localStorage.setItem('cryptoDash', JSON.stringify({
            favorites: this.state.favorites
        }));
    }

    savedSettings() {
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));

        if (!cryptoDashData) {
            return {page: 'settings', firstVisit: true}
        }

        let {favorites} = cryptoDashData;
        return {favorites};
    }

    setPage = page => this.setState({page});


    // Filtered coins comes in and we set that on our app
    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins}) 

    render() {
        return (
            <AppContext.Provider value={this.state}>
                { this.props.children }
            </AppContext.Provider>
        )
    }
}