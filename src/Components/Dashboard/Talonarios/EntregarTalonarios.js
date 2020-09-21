import React, {useState, useRef} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import firebase from '../../../Config/Firebase';
import moment from 'moment';
import Swal from 'sweetalert2';
import './Alcancias.css';


const EntregarTalonarios = ({show, onHide, data}) =>{
    let inputEl = useRef([]);
    const [valueTalonario, setValueTalonario] = useState([]);
    const [cantTalonarios, setCantTalonarios] = useState([]);


    const handleTalonario = (value, input_position, key) => {
        const input_value = value;
        const position = input_position;
        const enter = key === 'Enter' ? true : false;
        if(enter === true){

        }

    };

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
                            const inputs = [];
                            for(let i = 0; i < cantTalonarios; i++){
                                inputs.push(
                                    <Form.Group key={i + 1}>
                                        <Form.Label>Talonario Nro. {i + 1}:</Form.Label>
                                        <Form.Control
                                            name={`talonario_nro${i + 1}`}
                                            ref={el => inputEl.current[i] = el}
                                            type='text'
                                            placeholder='Ingrese el correlativo del talonario a entregar.'
                                            onKeyPress={(e) => {
                                                handleTalonario(e.target.value, i, e.key);
                                                setValueTalonario([...valueTalonario, e.target.name])
                                                e.key === 'Enter' && e.preventDefault();
                                                }}
                                            />
                                    </Form.Group>
                                );
                            }
                            return inputs;
                        })
                    ()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' type='submit' block>
                        Asignar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}

export default EntregarTalonarios;