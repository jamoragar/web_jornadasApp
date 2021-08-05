import React, {useState} from 'react';
import firebase from '../../../Config/Firebase';
import { Form, Button, Modal, Col, Alert, Spinner } from 'react-bootstrap';

const AgregarUsuarios = ({show, onHide}) => {
    const [alertShow, setAlertShow] = useState(false);
    const [buttonAceptarText, setButtonAceptarText] = useState(true);

    // const handleResetForm = () => {
    //     document.getElementById('myForm').reset();
    // }

    const onFormSubmit = async e => {
        e.preventDefault();

        const key = firebase.database().ref().push().key;
        const {email, password, nombre, apellido, rol} = e.target.elements;
        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        let urlencoded = new URLSearchParams();
        urlencoded.append("uid", key);
        urlencoded.append("email", email.value);
        urlencoded.append("password", password.value);
        urlencoded.append("displayName", nombre.value);
        
        const requestOptions = {
            method: 'POST',
            mode: 'no-cors',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        
        
        if(rol.value !== '0'){
            setButtonAceptarText(false);
            firebase.database().ref(`/Users`)
                .orderByChild('email')
                .equalTo(email.value)
                .once('value')
                .then(
                    snapshot => {
                        if(snapshot.val()){
                            setButtonAceptarText(true);
                            alert('La cuenta de correo que intenta ingresar, ya pertenece a otro usuario.');
                            // handleResetForm();
                        }else{
                            console.log('Creando usuario...');
                            const createUserWithFirebaseFunction = fetch("https://us-central1-jornadas2020.cloudfunctions.net/createUser", requestOptions);
                            createUserWithFirebaseFunction
                            .then(response => {
                                firebase.database().ref(`/Users/${key}`).set({
                                    nombre: nombre.value,
                                    apellido: apellido.value,
                                    email: email.value,
                                    password: password.value,
                                    tipo: 'User',
                                    subtipo: rol.value,
                                    uid: key
                                })
                                .then(response => {
                                    setButtonAceptarText(true);
                                    setAlertShow(true)
                                    setTimeout(() => {
                                        setAlertShow(false);
                                        // handleResetForm()
                                    }, 2173)
                                })
                            })
                        }
                })
                // .catch(something => console.log(something));
        }else{
            alert('Debe completar todos los campos antes de continuar.');
        };
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Form onSubmit={onFormSubmit} id='myForm'>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nuevo Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control name='email' type="email" placeholder="Ingrese el email." />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control name='password' type="password" placeholder="Ingrese una contraseña." />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control name='nombre' type='text' placeholder="Ingrese el nombre." />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Apellido:</Form.Label>
                        <Form.Control name='apellido' type='text' placeholder="Ingrese el apellido." />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rol:</Form.Label>
                        <Form.Control name='rol' as="select" defaultValue="Asignar Rol">
                            <option value='0'>Seleccionar...</option>
                            <option value='User'>Usuario</option>
                            <option value='Leo/Leon'>Leo/Leon</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" type="submit" block>
                        {buttonAceptarText ? (<div><i className="far fa-save fa-fw" />Aceptar</div>) : (<Spinner animation="border" />)}
                    </Button>
                </Modal.Footer>
                    <Alert show={alertShow} variant={'success'} onClose={() => setAlertShow(false)} dismissible>
                        Usuario creado con éxito!
                    </Alert>
            </Form>
        </Modal>
    );
}
 
export default AgregarUsuarios;