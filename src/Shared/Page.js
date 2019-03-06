import React from 'react';
import {AppContext} from '../App/AppProvider';

export default function ({name, children}) {
    return <AppContext.Consumer>
        {/*Extract page from props */}
        {({page}) => {
            {/* Check if the name is NOT equal to the page I pass in */}
            if (page !== name) {
                return null;
            }
            return <div>{children}</div>
        }}
    </AppContext.Consumer>;
}