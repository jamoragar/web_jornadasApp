import React, {useEffect, useState} from 'react';
import * as firebase from 'firebase';
import {Spinner, Row} from 'react-bootstrap';
import TableBonosDigitales from './TableBonosDigitales';

const BonosRifa = () => {
   
    const [bonosSorteo, setBonosSorteo] = useState('EMPTY');

    useEffect(() => {
        firebase.database().ref('/Bono_digital').on('value', snapshot => {
                snapshot.val() ? setBonosSorteo(snapshot.val()) : setBonosSorteo('NO_DATA_FOUND')
            });
    }, [])

    if(bonosSorteo !== 'EMPTY'){
        return (
            <div className='dash_content'>
                <Row>
                    <h1>Bonos Digitales:</h1>
                </Row>
                <div>
                    <TableBonosDigitales bonosSorteo={bonosSorteo}/>
                </div>
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
 
export default BonosRifa;