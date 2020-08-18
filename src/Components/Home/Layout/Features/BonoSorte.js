import React, {useState} from 'react';
import {Modal, Button, Form, InputGroup, Spinner} from 'react-bootstrap'
import axios from 'axios';

const BonoSorteo = ({show, onHide}) => {
    const [cantidad, setCantidad] = useState(1);
    const [loading, setLoading] = useState(false)
    const valorBono = 500;

    const comprarBonos=(e) => {
        e.preventDefault();
        setLoading(true);

        const {nombre, apellido, email, cantidad_bonos} = e.target.elements;
        axios({
            method: 'post',
            url: 'https://appjornadasmagallanicas.cl/api/api/transactions',
            data: {
                'orden_compra': 879,
                'sessionID': 'BonoSorteoSitioWeb',
                'monto': valorBono * cantidad_bonos.value,
                'cantidad': cantidad_bonos.value,
                'nombre': nombre.value.trim(),
                'apellido': apellido.value.trim(),
                'email': email.value.trim()
            }
        }).then(res => {
                setLoading(false);
                window.location.replace(`${res.data.url}?token_ws=${res.data.token_ws}`);
            });
        console.log('estamos llegando...');
    }
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Bonos de Sorteo</Modal.Title>
            </Modal.Header>
            <Form onSubmit={comprarBonos}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Nombre(s):</Form.Label>
                        <Form.Control name='nombre' type='text' placeholder='Ingrese su nombre'   required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Apellido(s):</Form.Label>
                        <Form.Control name='apellido' type='text' placeholder='Ingrese su apellido'   required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>E-mail:</Form.Label>
                        <Form.Control name='email' type='email' placeholder='Ingrese su e-mail'   required />
                    </Form.Group>
                    <Form.Group>
                    <InputGroup>
                        <InputGroup.Append>
                            <Button variant="outline-danger" onClick={() => setCantidad(cantidad === 1 ? cantidad : cantidad -1)}>-</Button>
                        </InputGroup.Append>
                        <Form.Control
                            type='number'
                            name='cantidad_bonos'
                            style={{textAlign: 'center'}}
                            value={cantidad}
                            readOnly
                            min='1'
                        />
                        <InputGroup.Append>
                        <Button variant="outline-success" onClick={() => setCantidad(cantidad +1)}>+</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button color='success' block type='submit'>
                    {
                        loading ?
                        <Spinner animation="border" />
                        :
                        <><b>${valorBono * cantidad}</b> Comprar</>

                    }
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default BonoSorteo;