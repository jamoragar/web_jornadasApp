import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoutes = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            restricted ?
                <Redirect to="/Home" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoutes;