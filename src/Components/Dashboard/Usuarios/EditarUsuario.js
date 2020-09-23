import React, { useState } from "react";
import { Form, Button, Modal, Alert, Spinner, Col } from "react-bootstrap";
import * as firebase from "firebase";

export const EditarUsuario = ({ show, onHide, data }) => {
	const [alertShow, setAlertShow] = useState(false);
	const [loading, setLoading] = useState(false);

	

	const handleUpdate = (e) => {
		e.preventDefault();
		setLoading(true);
		const { nombre, apellido, rol } = e.target.elements;
		let uid = data.uid;
		firebase
			.database()
			.ref()
			.child(`Users/${uid}`)
			.update({
				nombre: nombre.value.trim(),
				apellido: apellido.value.trim(),
				subtipo: rol.value,
			})
			.then(() => {
				console.log("Datos Actualizados con exito.");
				setLoading(false);
				setAlertShow(true);
			})
			.catch(() => {
				console.log("No se ha logrado actualizar el email");
				setLoading(false);
			});
	};

	if (data) {
		return (
			<div>
				<Modal show={show} onHide={onHide}>
					<Form id="myForm" onSubmit={handleUpdate}>
						<Modal.Header closeButton>
							<Modal.Title>Editar Usuario</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Row>
								<Form.Group as={Col}>
									<Form.Label>Email:</Form.Label>
									<Form.Control
										defaultValue={data.email}
										name="email"
										type="email"
                                        placeholder="Ingrese el email."
                                        readOnly
									/>
								</Form.Group>
							</Form.Row>
							<Form.Group>
								<Form.Label>Nombre:</Form.Label>
								<Form.Control
									defaultValue={data.nombre}
									name="nombre"
									type="text"
									placeholder="Ingrese el nombre."
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Apellido:</Form.Label>
								<Form.Control
									defaultValue={data.apellido}
									name="apellido"
									type="text"
									placeholder="Ingrese el apellido."
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Cambiar SubTipo:</Form.Label>
								<Form.Control
									name="rol"
									as="select"
									defaultValue={data.subtipo}
									required
								>
									<option value={data.subtipo}>{`Actual: ${data.subtipo}...`}</option>
									<option value="User">Usuario</option>
									<option value="Leo/Leon">Leo/Leon</option>
								</Form.Control>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="success" type="submit" block>
								{loading ? <Spinner animation="border" /> : "Actualizar"}
							</Button>
						</Modal.Footer>
						<Alert
							show={alertShow}
							variant={"success"}
							onClose={() => setAlertShow(false)}
							dismissible
						>
							Datos Actualizados con éxito!
						</Alert>
					</Form>
				</Modal>
			</div>
		);
	} else {
		return null;
	}
};
