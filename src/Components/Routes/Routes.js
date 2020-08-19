import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import Home from '../Home/Home';
import About from '../Home/Layout/About/About';
import Contacto from '../Home/Layout/Contacto/Contacto';
import Header from '../NavBar/NavBar';
import Dashboard from '../Dashboard/Dashboard';
import NotFound404 from '../404/404';
import DonarSuccess from '../PayReturn/DonarSuccess';
import DonarFailure from '../PayReturn/DonarFailure';
import BonoSuccess from '../PayReturn/BonoSuccess';
import BonoFailure from '../PayReturn/BonoFailure';

const Routes = (props) => {
    if(props){
        return(
            <>
            <BrowserRouter>
                <Header auth={props.authenticated} name={props.name} uid={props.uid}/>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/About" exact component={About} />
                    <Route path="/Contacto" exact component={Contacto} />
                    <Route path="/Dashboard/:uid" component={() => props.authenticated ? <Dashboard/> : <Home/>} />
                    <Route path='/not-found' component={NotFound404} />
                    <Route path='/Donar-exito' component={DonarSuccess}/>
                    <Route path='/Donar-fallo' component={DonarFailure}/>
                    <Route path='/Bono-exito' component={BonoSuccess}/>
                    <Route path='/Bono-fallo' component={BonoFailure}/>
                    <Route component={() => <Redirect to='/'/>} />
                </Switch>
            </BrowserRouter>
            </>
        )
    }else{
        return(
            <h1>Loading...</h1>
        )
    }
}

export default Routes;