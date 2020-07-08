import React from 'react';
import {Row, Button} from 'react-bootstrap';

const BonosRifa = ({type, uid}) => {
    let bonoSorteo_generadas = [];

    const generarBonoSorteo = (secuencia, cantidad) => {
        let k = 0
        for(let i = 1; i <= cantidad; i++){
            bonoSorteo_generadas[bonoSorteo_generadas.length] = {
                numero: i,
                bono_rifa: 20001 + k,
                nombre: '',
                telefono: '',
                direccion: '',
                isAviable: true 
            };
            
            k = k + secuencia;
        };
        console.log(bonoSorteo_generadas);
    }

    return (
        <div className='dash_content'>
            <Row>
                <h1>Bonos de Sorteo:</h1>
                <Button className='ml-auto' variant='danger' onClick={() => {generarBonoSorteo(1, 40001)}}>Generar Bono</Button>
            </Row>
        </div>
    );
}
 
export default BonosRifa;