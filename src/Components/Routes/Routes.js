import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import Home from '../Home/Home';
import About from '../Home/Layout/About/About';
import Contacto from '../Home/Layout/Contacto/Contacto';
import Header from '../NavBar/NavBar';
import Dashboard from '../Dashboard/Dashboard';
import NotFound404 from '../404/404';
import ProcesaPago from '../PayReturn/ProcesaPago';
import DonarFailure from '../PayReturn/DonarFailure';
import PagoExito from '../PayReturn/PagoExito';
import PagoFallido from '../PayReturn/PagoFallido';
import Terminos from '../Home/Layout/Terminos/Terminos';

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
                    <Route path='/procesa-pago/' component={ProcesaPago}/>
                    <Route path='/Donar-fallo' component={DonarFailure}/>
                    <Route path='/pago-exito' component={PagoExito}/>
                    <Route path='/pago-fallido' component={PagoFallido}/>
                    <Route path='/terminos' component={Terminos} />
                    <Route component={() => <Redirect to='/'/>} />
                </Switch>
            </BrowserRouter>
            </>
        )
    }else{
        return(
			<h2>Loading...</h2>
        )
    }
}

export default Routes;