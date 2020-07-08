import React from 'react';
import { Row, Button } from 'react-bootstrap';

const Alcancias = ({type, uid}) => {
    let alcancias_generadas = [];

    const generarAlcancias = (secuencia, cantidad) => {
        let k = 0
        for(let i = 1; i <= cantidad; i++){
            alcancias_generadas[alcancias_generadas.length] = {
                numero: i,
                codigo_barra: 1000 + k
            };
            
            k = k + secuencia;
        };
        console.log(alcancias_generadas);
    }

    return (
        <div className='dash_content'>
            <Row>
                <h1>Alcancias:</h1>
                <Button className='ml-auto' variant='danger' onClick={() => {generarAlcancias(1, 6000)}}>Generar Alcancias</Button>
            </Row>
        </div>
    );
}
 
export default Alcancias;