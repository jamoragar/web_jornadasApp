import React from 'react';
import { Row, Button } from 'react-bootstrap';
import firebase from '../../../Config/Firebase';

const Talonarios = ({type, uid}) => {
    let talonarios_generados = [];
    const generarTalonarios = (secuencia, cantidad) => {

        for(let i = 0; i < cantidad; i++){
            talonarios_generados[talonarios_generados.length] = {
                talonario_numero: i + 1,
                asignado_usuario: false,
                asignado_tercero: false,
                asignado_externo: false,
                monto_recaudado: ''
            }

            firebase.database().ref(`Talonarios/${i}`).set(talonarios_generados[i]);
        };
    };

    return (
        <div className='dash_content'>
            <Row>
                <h1>Talonarios:</h1>
                <Button className='ml-auto' variant='danger' onClick={() => generarTalonarios(1, 60)}>Generar Talonarios</Button>
            </Row>
        </div>
    );
}
 
export default Talonarios;