import React, { useState } from "react";
import { Form, Button, Modal, Alert, Spinner, Col } from "react-bootstrap";
import * as firebase from "firebase";

export const EditarEmpresa = ({ show, onHide, data }) => {
    const [alertShow, setAlertShow] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleUpdate = (e) => {
		e.preventDefault();
		setLoading(true);
		const { nombre, representante, telefono, rol } = e.target.elements;
		let uid = data.uid;
		firebase
			.database()
			.ref()
			.child(`Users/${uid}`)
			.update({
				nombre: nombre.value.trim(),
                representante: representante.value.trim(),
                telefono: telefono.value.trim(),
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
							<Modal.Title>Editar Empresa</Modal.Title>
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
								<Form.Label>Nombre de Empresa:</Form.Label>
								<Form.Control
									defaultValue={data.nombre}
									name="nombre"
									type="text"
									placeholder="Ingrese el nombre de la empresa."
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Representante Legal:</Form.Label>
								<Form.Control
									defaultValue={data.representante}
									name="representante"
									type="text"
									placeholder="Ingrese nombre de representante."
								/>
							</Form.Group>
                            <Form.Group>
								<Form.Label>Teléfono de Contacto:</Form.Label>
								<Form.Control
									defaultValue={data.telefono}
									name="telefono"
									type="text"
									placeholder="Ingrese Teléfono de Contacto."
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Rol:</Form.Label>
								<Form.Control
									name="rol"
									as="select"
									defaultValue={data.subtipo}
									required
								>
                                    <option value={data.subtipo}>{`Actual: ${data.subtipo}...`}</option>
									<option value="User">Usuario</option>
									<option value="Company">Empresa</option>
									<option value="Leo/Leon">Leo/Leon</option>
									<option value="Externo">Externo</option>
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
