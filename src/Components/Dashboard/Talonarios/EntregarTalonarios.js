import React, {useState, useRef} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';

const EntregarTalonarios = ({show, onHide, data}) =>{

    const setCantTalonarios = (cantidad) => {
        console.log(cantidad);
    }
    return(
        <>
        <Modal show={show} onHide={onHide}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Asignar Talonarios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>¿Cuantos Talonarios va a asignarle a <b>{data.nombre}?</b>?</Form.Label>
                        <Form.Control 
                            name='cant_talonarios'
                            type='number'
                            placeholder='Ingrese la cantidad de talonarios'
                            min='1'
                            max='50'
                            onChange={e => setCantTalonarios(e.target.value)} />
                    </Form.Group>
                    {//Immediately-invoked function expression (IIFE).
                        (() => {
                            console.log('IIFE')
                        })
                    ()}
                </Modal.Body>
            </Form>
        </Modal>
        </>
    )
}

export default EntregarTalonarios;