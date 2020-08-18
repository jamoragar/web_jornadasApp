import React, {useState} from 'react';
import {Modal, Button, Form, InputGroup} from 'react-bootstrap'

const BonoSorteo = ({show, onHide}) => {
    const [cantidad, setCantidad] = useState(1);
    const valorBono = 500;

    const comprarBonos=(e) => {
        e.preventDefault();

        const {nombre, apellido, email, cantidad_bonos} = e.target.elements;
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
                        name='cantidad_bonos'
                        style={{textAlign: 'center'}}
                        value={cantidad}
                        defaultValue={1}
                        aria-describedby="basic-addon2"
                        readOnly
                        min='1'
                        />
                        <InputGroup.Append>
                        <Button variant="outline-success" onClick={() => setCantidad(cantidad +1)}>+</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    </Form.Group>
                    <Button color='success' block type='submit'><b>${valorBono * cantidad}</b> Comprar</Button>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default BonoSorteo;