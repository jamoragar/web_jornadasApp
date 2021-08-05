import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {history} from './Routes';

const PrivateRoutes = ({component: Component, authenticated}) => {
    return (
        <Route render={props => (
            authenticated ?
                <Component {...props} />
            : <Redirect to="/Home" />
        )} />
    );
};

export default PrivateRoutes;