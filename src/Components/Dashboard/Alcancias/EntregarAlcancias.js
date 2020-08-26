import React, {useState, useRef} from 'react';
import {Modal, Form, Button, Alert} from 'react-bootstrap';
import firebase from '../../../Config/Firebase';
import './Alcancias.css'

const EntregarAlcancias = ({show, onHide, data}) => {
    const inputEl = useRef([])
    const [cantAlcancias, setCantAlcancias] = useState(0);
    const [valueAlcancia, setValueAlcancia] = useState([]);
    const [codigoInexistente, setCodigoInexistente] = useState([]);

    const handleAlcancia = (value, input_position) => {
        firebase.database().ref('/Alcancias').orderByChild('codigo_barra').equalTo(value.toString()).once('value')
            .then(snapshot =>{
                let asignada_usuario;
                snapshot.forEach(childSnapshot => asignada_usuario = childSnapshot.val().asignada_usuario)
                if(asignada_usuario === false){
                    if(parseInt(cantAlcancias) === 1 || parseInt(cantAlcancias) === (input_position + 1)){
                        inputEl.current[input_position].focus();
                    }else{
                        inputEl.current[input_position + 1].focus();
                    }
                    
                    if(inputEl.current[input_position].classList.contains('error_code')){
                        inputEl.current[input_position].classList.remove('error_code')
                    }
                    
                    inputEl.current[input_position].classList.add('good_code')
                }
                else{
                    inputEl.current[input_position].focus();
                    if(inputEl.current[input_position].classList.contains('good_code')){
                        inputEl.current[input_position].classList.remove('good_code');
                    }
                    inputEl.current[input_position].classList.add('error_code')
                }
            });
    };

    const asignarAlcancias = (e) => {
        e.preventDefault();

        const alcancias_firebase = [];
        Object.keys(inputEl).map((key) => {
            inputEl[key].map(input => {
                let name = input['name'];
                console.log(input['value'])
                alcancias_firebase.push(input.value);
            })
        });

        // valueAlcancia.map(codigo_barra => {
        //     firebase.database().ref('/Alcancias').orderByChild('codigo_barra').equalTo(codigo_barra.toString()).once('value')
        //         .then(snapshot =>{
        //             alcancias_firebase.push(snapshot.val())
        //         })
        // });



        // firebase.database().ref('/Alcancias').orderByChild('asignada_usuario').equalTo(false).limitToFirst(cantAlcancias)
        // .once("value").then(snapshot => {
        //     Object.keys(snapshot.val()).forEach((key,i) => {
        //         alcanciasToArray[i] = snapshot.val()[key];
        //         alcanciasToArray[i]['asignada_usuario'] = true
        //         firebase.database().ref(`/Alcancias/${key}`).update({
        //             asignada_usuario: true
        //         })
        //     });

        //     firebase.database().ref(`/Users/${data.uid}/alcancias`).once('value')
        //     .then(snapshot => {
        //         if(snapshot.val()){
        //             snapshot.forEach(childSnapshot => {
        //                 alcanciasToArray.push(childSnapshot.val())
        //             });
        //             firebase.database().ref(`/Users/${data.uid}`).update({alcancias:alcanciasToArray})
        //         }else{
        //             firebase.database().ref(`/Users/${data.uid}`).update({alcancias:alcanciasToArray});
        //         }
        //     })
        // })
    }
    return (
        <>
        <Modal show={show} onHide={onHide}>
            <Form onSubmit={asignarAlcancias} id='formEntregarAlcancias'>
                <Modal.Header closeButton>
                    <Modal.Title>Asignar Alcancias</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>¿Cuantas Alcancias va a asignarle a <b>{data.nombre}</b> ?</Form.Label>
                        <Form.Control name='cant_alcancias' type='number' placeholder='Ingrese la cantidad de alcancias.' min="1" max="50" onChange={e => setCantAlcancias(e.target.value)} />
                    </Form.Group>
                    {//Immediately-invoked function expression (IIFE).
                        (() => {
                            const inputs = [];
                            for(let i = 0; i < cantAlcancias; i++){
                                    inputs.push(
                                        <Form.Group key={i + 1}>
                                            <Form.Label>Alcancia Nro. {i + 1}:</Form.Label>
                                            <Form.Control
                                                name={`alcancia_nro${i + 1}`}
                                                ref={el => inputEl.current[i] = el}
                                                type='text'
                                                placeholder='Ingrese el código de barra de la alcancia a entregar.'
                                                onChange={(e) => {handleAlcancia(e.target.value, i); setValueAlcancia([...valueAlcancia, e.target.name])}} />

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
    );
}

export default EntregarAlcancias;