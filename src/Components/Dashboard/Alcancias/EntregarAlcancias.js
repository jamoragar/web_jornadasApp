import React, {useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import firebase from '../../../Config/Firebase';

const EntregarAlcancias = ({show, onHide, data}) => {
    const [cantAlcancias, setCantAlcancias] = useState(0);
    const [valueAlcancia, setValueAlcancia] = useState([]);

    const asignarAlcancias = (e) => {
        e.preventDefault();

        const alcancias_firebase = [];

        valueAlcancia.map(acodigo_barra => {
            firebase.database().ref('/Alcancias').orderByChild('codigo_barra').equalTo(codigo_barra.toString()).once('value')
                .then(snapshot =>{
                    alcancias_firebase.push(snapshot.val())
                    firebase.database
                })
        })

        // firebase.database().ref('/Alcancias').orderByChild('asignada_usuario').equalTo(false).limitToFirst(parseInt(cant_alcancias.value))
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
    console.log(cantAlcancias)
    return (
        <Modal show={show} onHide={onHide}>
            <Form onSubmit={asignarAlcancias} id='formEntregarAlcancias'>
                <Modal.Header>
                    <Modal.Title>Asignar Alcancias</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>¿Cuantas Alcancias va a asignarle a <b>{data.nombre}</b> ?</Form.Label>
                        <Form.Control name='cant_alcancias' type='number' placeholder='Ingrese la cantidad de alcancias.' min="1" max="50" onChange={(e) => setCantAlcancias(e.target.value)} />
                    </Form.Group>
                    {//Immediately-invoked function expression (IIFE).
                        (() => {
                            const inputs = [];
                            for(let i = 0; i < cantAlcancias; i++){
                                    inputs.push(
                                        <Form.Group key={i + 1}>
                                            <Form.Label>Alcancia Nro. {i + 1}:</Form.Label>
                                            <Form.Control name={`alcancia_nro${i + 1}`} type='text' placeholder='Ingrese el código de barra de la alcancia a entregar.' onChange={(e) => setValueAlcancia([...valueAlcancia, e.target.value])} />
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
    );
}
 
export default EntregarAlcancias;