import React,{useState} from "react";
import { Form, Modal, Alert } from "react-bootstrap";
import firebase from '../../../Config/Firebase';

const RecepcionarAlcancias = ({ show, onHide }) => {
  //Hooks
  const [alertErrorCodigo, setAlertErrorCodigo] = useState(false);
  const [alertRecepcionado, setAlertRecepcionado] = useState(false);
  const [alertExito, setAlertExito] = useState(false);

  const handleAlcancia = (e, value, key) => {
     e.preventDefault();

     const input_value = value.trim();
     const enter = key === "Enter" ? true : false;
     if(enter){
        firebase
         .database()
         .ref('Alcancias')
         .orderByChild('codigo_barra')
         .equalTo(input_value.toString())
         .once('value')
         .then(snapshot => {
           if(snapshot.val() !== null){
             const snap_value = snapshot.val();
            if(snap_value.recepcionado && snap_value.recepcionado === true){
              console.log('ya recepcionado')
              setAlertRecepcionado(true);
              setTimeout(() => {
                setAlertRecepcionado(false)
              },1400)
             }else{
               const num_alcancia = Object.getOwnPropertyNames(snapshot.val())[0];
               console.log(snapshot.val())
               console.log('número:', num_alcancia)

               firebase.database()
                .ref('Alcancias')
                .child(`${num_alcancia}/recepcionado`)
                .set(true)
                .then(res => {
                  setAlertExito(true);
                  setTimeout(() => {
                    setAlertExito(false);
                  }, 1000);

                  document.getElementById("recepcion_form").reset();
                });
             };
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
        <Form id="recepcion_form">
          <Form.Group>
            <Form.Label>
              Ingrese el código de barra de las alcancías que desee recepcionar.
            </Form.Label>
            <Form.Control
              name="cod_barra"
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
      <Alert  variant='success'
              show={alertExito}
              onClose={() => setAlertExito(false)}
              dismissible>
        Alcacía recepcionada de forma <b>exitosa!.</b>
      </Alert>
    </Modal>
  );
};

export default RecepcionarAlcancias;
