import React, {useState, useEffect} from 'react';
import firebase from '../../../Config/Firebase';
import {Spinner} from 'react-bootstrap';

const CreateUsers = ({tipo, uid}) => {
    
    const [users, setUsers] = useState('EMPTY');

    useEffect(() => {
        firebase.database().ref('/Users').once('value')
            .then(snapshot => {
                snapshot.val() ? setUsers(snapshot.val()) : setUsers('NO_USERS_FOUND')
            });
    }, [])

    if(users){
        return (
            <div className='dash_content'>
                <h1>Usuarios</h1>
            </div>
        );
    }else{
        return (
            <div className='dash_content'>
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
            </div>
        )
    }
}
 
export default CreateUsers;