import React, {useEffect, useState} from 'react';
import {useParams, Link, Redirect} from 'react-router-dom';
import firebase from '../../Config/Firebase'
import './Dashboard.css';

const Dashboard = () => {
    let { uid } = useParams();
    const [userData, setUserData] = useState('Empty');

    useEffect(() => {
        firebase.database().ref(`/Users/${uid}`).once('value').then(snapshot => {
            snapshot.val() ?
                setUserData(snapshot.val())
            :
                setUserData('Error')
        });
    }, []);
    if(userData === 'Empty'){
        return (
            <h1>Cargando Perfil...</h1>
        );
    }
    else if(userData === 'Error'){
        return(
            <Redirect to='/not-found' />
        );
    }else if(userData){
        return(
            <div className='sideNav'>
                <ul className='sideNav-nav'>
                    <li className='sideNav-item'>
                        <Link className='sideNav-link' to='#'>
                            <i className="fas fa-users fa-fw fa-3x" />
                            <span className='link-text'>Crear Usuarios</span>
                        </Link>
                    </li>
                    <li className='sideNav-item'>
                        <Link className='sideNav-link' to='#'>
                            <i className="fas fa-donate fa-fw fa-3x" />
                            <span className='link-text'>Alcancias</span>
                        </Link>
                    </li>
                    <li className='sideNav-item'>
                        <Link className='sideNav-link' to='#'>
                            <i className="fas fa-receipt fa-fw fa-3x" />
                            <span className='link-text'>Bonos de Rifa</span>
                        </Link>
                    </li>
                    <li className='sideNav-item'>
                        <Link className='sideNav-link' to='#'>
                            <i className="fas fa-hand-holding-usd fa-fw fa-3x" />
                            <span className='link-text'>Donaciones</span>
                        </Link>
                    </li>
                    <li className='sideNav-item'>
                        <Link className='sideNav-link' to='#'>
                            <i className="far fa-calendar-alt fa-fw fa-3x" />
                            <span className='link-text'>Eventos</span>
                        </Link>
                    </li>
                    <li className='sideNav-item'>
                        <Link className='sideNav-link' to='#'>
                            <i className="fas fa-door-open fa-fw fa-3x" />
                            <span className='link-text'>Salir</span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}
 
export default Dashboard;