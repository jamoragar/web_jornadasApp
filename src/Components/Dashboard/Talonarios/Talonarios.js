import React, {useState, useEffect} from 'react';
import { Row, Button } from 'react-bootstrap';
import firebase from '../../../Config/Firebase';
import TableTalonarios from './TableTalonarios';

const Talonarios = ({subtipo, uid}) => {
    const [talonarios, setTalonarios] = useState('EMPTY')
    let talonarios_generados = [];
    console.log(subtipo)
    useEffect(() => {
        firebase.database().ref('/Talonarios').on('value', snapshot => {
                snapshot.val() ? setTalonarios(snapshot.val()) : setTalonarios('NO_DATA_FOUND')
            });
    }, [])

    // const generarTalonarios = (secuencia, cantidad) => {
    //     let numero_bonos = 48001
    //     for(let i = 0; i < cantidad; i++){
    //         // numero_bonos = numero_bonos + secuencia;
    //         talonarios_generados[talonarios_generados.length] = {
    //             correlativo: (numero_bonos + (secuencia * i)).toString(),
    //             asignado_usuario: false,
    //             asignado_tercero: false,
    //             asignado_externo: false,
    //             monto_recaudado: '',
    //             talonario_numero: (i + 1)
    //         }

    //         firebase.database().ref(`Talonarios/${i}`).set(talonarios_generados[i]);
    //     };
    // };
    if(subtipo === 'Admin'){
        return (
            <div className='dash_content'>
                <Row>
                    <h1>Talonarios:</h1>
                    {/* <Button className='ml-auto' variant='danger' onClick={() => generarTalonarios(40, 500)}>Generar Talonarios</Button> */}
                </Row>
                <div>
                {
                    talonarios !== 'EMPTY' ?
                    <TableTalonarios talonarios={talonarios}/>
                    :
                    <h6>Cargando...</h6>
                }
                </div>
            </div>
        );
    }else{
        return(
            <div className='dash_content'>
            <br />
                <h2>No tiene permitido ingresar a esta area.</h2>
            </div>
        );
    }
    
}
 
export default Talonarios;