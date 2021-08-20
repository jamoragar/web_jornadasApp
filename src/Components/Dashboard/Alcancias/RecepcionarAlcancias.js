import React,{useState} from "react";
import { Form, Modal, Alert } from "react-bootstrap";
import firebase from '../../../Config/Firebase';

const RecepcionarAlcancias = ({ show, onHide }) => {
  //Hooks
  const [alertErrorCodigo, setAlertErrorCodigo] = useState(false);
  const [alertRecepcionado, setAlertRecepcionado] = useState(false);
  const handleAlcancia = (e, value, key) => {
     e.preventDefault();

     const input_value = value.trim();
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
           if(snapshot.val() !== null){
            if(snapshot.val()[0].recepcionado === true){
              console.log('ya recepcionado')
              setAlertRecepcionado(true);
              setTimeout(() => {
                setAlertRecepcionado(false)
              },1400)
             }else{
               const num_alcancia = Object.getOwnPropertyNames(snapshot.val())[0];
               console.log(snapshot.val())
               console.log('número:', num_alcancia)
               //
               // Actualizar la alcancía en firebase con el estado recepcionado:true
               //
             }
           }else{
             console.log('error');
             setAlertErrorCodigo(true);
             setTimeout(() => {
               setAlertErrorCodigo(false)
             },1400)            
           }
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
      <Alert  variant='danger'
              show={alertErrorCodigo}
              onClose={() => setAlertErrorCodigo(false)}
              dismissible>
        El código que ingreso <b>no existe.</b>
      </Alert>
      <Alert  variant='warning'
              show={alertRecepcionado}
              onClose={() => setAlertRecepcionado(false)}
              dismissible>
        El código que ingreso ya <b>ha sido recepcionado.</b>
      </Alert>
    </Modal>
  );
};

export default RecepcionarAlcancias;
