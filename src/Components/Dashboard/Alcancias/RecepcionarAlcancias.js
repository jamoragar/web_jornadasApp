import React from "react";
import { Form, Modal } from "react-bootstrap";
import firebase from '../../../Config/Firebase';

const RecepcionarAlcancias = ({ show, onHide }) => {

  const handleAlcancia = (e, value, key) => {
     e.preventDefault();

     const input_value = value;
     const enter = key === "Enter" ? true : false;
     console.log('handling alcancía...');
     if(enter){
        firebase
         .database()
         .ref('Alcancias')
         .orderByChild('codigo_barra')
         .equalTo(input_value.toString())
         .once('value')
         .then(snapshot => {
            const num_alcancia = Object.getOwnPropertyNames(snapshot.val())[0];
            console.log(snapshot.val())
            console.log('número:', num_alcancia)
         });
     }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Recepción de Alcancías</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>
              Ingrese el código de barra de las alcancías que desee recepcionar.
            </Form.Label>
            <Form.Control
              name="cant_alcancias"
              type="text"
              placeholder="Código de barra de alcancía."
              onKeyPress={(e) => handleAlcancia(e, e.target.value, e.key)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RecepcionarAlcancias;
