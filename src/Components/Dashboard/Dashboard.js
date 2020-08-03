import React, {useEffect, useState} from 'react';
import { useParams, Link, Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateUsers from './Usuarios/Usuarios';
import Alcancias from './Alcancias/Alcancias';
import BonosRifa from './Bonos/Bonos';
import Donaciones from './Donaciones/Donaciones';
import Talonarios from './Talonarios/Talonarios';
import Perfil from './Perfil/Perfil';
import firebase, {handleLogOut} from '../../Config/Firebase';
import {Spinner} from 'react-bootstrap';
import './Dashboard.css';

const Dashboard = () => {
    let { uid } = useParams();
    const [userData, setUserData] = useState('Empty');

    useEffect(() => {
        firebase.database().ref(`/Users/${uid}`).once('value').then(snapshot => {
            snapshot.val() ?
                setUserData(snapshot.val()) : setUserData('Error')
        });
    }, [uid]);
    
    if(userData === 'Empty'){
        return (
            <>
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="dark" />
            </>
        );
    }
    else if(userData === 'Error'){
        return(
            <Redirect to='/not-found' />
        );
    }else if(userData){
        return(
            <BrowserRouter>
                <div className='sideNav'>
                    <ul className='sideNav-nav'>
                        <li className='sideNav-item'>
                            <Link className='sideNav-link' to={`/Dashboard/${uid}/createUsers`}>
                                <i className="fas fa-users fa-fw fa-3x" />
                                <span className='link-text'>Crear Usuarios</span>
                            </Link>
                        </li>
                        <li className='sideNav-item'>
                            <Link className='sideNav-link' to={`/Dashboard/${uid}/Alcancias`}>
                                <i className="fas fa-donate fa-fw fa-3x" />
                                <span className='link-text'>Alcancias Entregadas</span>
                            </Link>
                        </li>
                        <li className='sideNav-item'>
                            <Link className='sideNav-link' to={`/Dashboard/${uid}/Talonarios`}>
                                <i className="far fa-clipboard fa-fw fa-3x" />
                                <span className='link-text'>Talonarios Entregados</span>
                            </Link>
                        </li>
                        <li className='sideNav-item'>
                            <Link className='sideNav-link' to={`/Dashboard/${uid}/bonosRifa`}>
                                <i className="fas fa-receipt fa-fw fa-3x" />
                                <span className='link-text'>Bonos Digitales Vendidos</span>
                            </Link>
                        </li>
                        <li className='sideNav-item'>
                            <Link className='sideNav-link' to={`/Dashboard/${uid}/Eventos`}>
                                <i className="fab fa-delicious fa-fw fa-3x" />
                                <span className='link-text'>Bingos Digitales Vendidos</span>
                            </Link>
                        </li>
                        <li className='sideNav-item'>
                            <Link className='sideNav-link' to={`/Dashboard/${uid}/Donaciones`}>
                                <i className="fas fa-hand-holding-usd fa-fw fa-3x" />
                                <span className='link-text'>Donaciones Digitales</span>
                            </Link>
                        </li>
                        <li className='sideNav-item' onClick={handleLogOut}>
                            <Link className='sideNav-link' to='#'>
                                <i className="fas fa-door-open fa-fw fa-3x" />
                                <span className='link-text'>Salir</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route exact path='/Dashboard/:uid/' component={() => userData === 'Error' ?  <Redirect to='/not-found' /> : <CreateUsers {...userData} />} />
                    <Route exact path='/Dashboard/:uid/createUsers' component={() => userData === 'Error' ?  <Redirect to='/not-found' /> : <CreateUsers {...userData} />} />
                    <Route exact path='/Dashboard/:uid/Alcancias' component={() => userData === 'Error' ?  <Redirect to='/not-found' /> : <Alcancias {...userData} />} />
                    <Route exact path='/Dashboard/:uid/bonosRifa' component={() => userData === 'Error' ?  <Redirect to='/not-found' /> : <BonosRifa {...userData} />} />
                    <Route exact path='/Dashboard/:uid/Donaciones' component={() => userData === 'Error' ?  <Redirect to='/not-found' /> : <Donaciones {...userData} />} />
                    <Route exact path='/Dashboard/:uid/Talonarios' component={() => userData === 'Error' ?  <Redirect to='/not-found' /> : <Talonarios {...userData} />} />
                    <Route exact path='/Dashboard/:uid/Perfil' component={() => userData === 'Error' ?  <Redirect to='/not-found' /> : <Perfil {...userData} />} />
                </Switch>
            </BrowserRouter>
        );
    }
};
 
export default Dashboard;