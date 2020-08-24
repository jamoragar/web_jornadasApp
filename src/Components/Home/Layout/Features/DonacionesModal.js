import React, {useState} from 'react';
import {Form, Button, Modal, InputGroup, Spinner} from 'react-bootstrap';
import axios from 'axios';

const DonacionesModal = ({show, onHide}) => {
    const [loading, setLoading] = useState(false);

    const donar = (e) => {
        e.preventDefault();
        setLoading(true);

        const {nombre, apellido, email, monto} = e.target.elements;
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/transactions',
            data: {
                'orden_compra': 737,
                'sessionID': 'DonacionSitioWeb',
                'monto': parseInt(monto.value),
                'cantidad': 1,
                'nombre': nombre.value.trim(),
                'apellido': apellido.value.trim(),
                'email': email.value.trim()
            }
        }).then(res => {
                setLoading(false);
                window.location.replace(`${res.data.url}?token_ws=${res.data.token_ws}`);
            });
    }

    return(
        <>
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Donaciones</Modal.Title>
            </Modal.Header>
            <Form onSubmit={donar}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Nombre(s):</Form.Label>
                        <Form.Control type='text' name='nombre' placeholder='Ingrese su nombre.' required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Apellido(s):</Form.Label>
                        <Form.Control type='text' name='apellido' placeholder='Ingrese su apellido.' required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>E-mail:</Form.Label>
                        <Form.Control type='email' name='email' placeholder='Ingrese su email.' required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Monto a donar:</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type='number' name='monto' required defaultValue='500' min='500' step='100'/>
                        </InputGroup>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button color='success' block type='submit'>
                        {
                            loading ?
                            <Spinner animation="border" />
                            :
                            'Donar'
                        }
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    );
};

export default DonacionesModal;