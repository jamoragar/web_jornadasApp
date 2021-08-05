import React, { useState } from "react";
import { Form, Button, Modal, Alert, Spinner, Col } from "react-bootstrap";
import firebase from "firebase/app";

export const RecoverPassword = ({ show, onHide }) => {
    const [alertShow, setAlertShow] = useState(false);
    const [alertErrorShow, setAlertErrorShow] = useState(false);
	const [loadingText, setLoadingText] = useState("Recuperar");

	const recuperarPassword = (e) => {
		e.preventDefault();
		setLoadingText(<Spinner animation="border" size="sm" />);

		let { email } = e.target;
		console.log(email);
		firebase
			.auth()
			.sendPasswordResetEmail(email.value.trim())
			.then(() => {
                setAlertShow(true);
                setTimeout(() => onHide(false), 3000);
				console.log("email de recuperacion enviado");
            })
            .catch(()=> {
                setAlertErrorShow(true);
            })
	};

	return (
		<div>
			<Modal show={show} onHide={onHide}>
				<Form id="myForm" onSubmit={recuperarPassword}>
					<Modal.Header closeButton>
						<Modal.Title>Editar Usuario</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>Email:</Form.Label>
								<Form.Control
									name="email"
									type="email"
                                    placeholder="Ingrese el email."
                                    required
								/>
							</Form.Group>
						</Form.Row>
					</Modal.Body>
					<Modal.Footer>
                        <Button variant="success" type="submit" block>
						{loadingText}
					</Button>
					</Modal.Footer>
					<Alert
						show={alertShow}
						variant={"success"}
						onClose={() => setAlertShow(false)}
						dismissible
					>
						Se ha enviado un correo de recuperacion.
					</Alert>
                    <Alert
						show={alertErrorShow}
						variant={"danger"}
						onClose={() => setAlertErrorShow(false)}
						dismissible
					>
						Email incorrecto.
					</Alert>
				</Form>
			</Modal>
		</div>
	);
};
