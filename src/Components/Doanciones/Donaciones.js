import React, {useState} from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';

const Donaciones = () =>{
    const [transbank, setTransbank] = useState(null)
    const generarPeticion = ()=>{
        axios({
            method: 'post', 
            url: 'http://127.0.0.1:8000/api/transactions',
            data: {
                "orden_compra": 11,
                "sessionID": "uid",
                "monto": 7500,
                "cantidad": 15,
                "nombre": "Javier",
                "apellido": "Moraga",
                "email": "javier.moragarojas@gmail.com"
            }
          }).then(response => setTransbank(response.data));
    }
    return(
        <>
        <Button className='ml-auto' variant='danger' onClick={() => generarPeticion()}>TransBank</Button>
        {transbank ? (
            <>
            <form action={transbank.url} method='post' role='form' target='mi_iframe_transbank'>
                <input type='hidden' name='token_ws' value={transbank.token_ws} />
                <button type='submit' className='btn btn-primary'>Ir a Pagar</button>
            </form>
            <iframe name='mi_iframe_transbank'></iframe>
            </>
        ) : null}
        </>
    )
};

export default Donaciones