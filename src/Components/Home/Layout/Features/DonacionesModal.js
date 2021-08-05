import React, { useState, useEffect } from "react";
import { Form, Button, Modal, InputGroup, Spinner } from "react-bootstrap";
import axios from "axios";
import firebase from "../../../../Config/Firebase";
import moment from "moment";

const DonacionesModal = ({ show, onHide }) => {
	const [loading, setLoading] = useState(false);
    const [numeroOrden, setNumeroOrden] = useState();

	// //Desarrollo
	// const url = 'http://127.0.0.1:8000/api/transactions';
	// Producción
	const url = 'https://appjornadasmagallanicas.cl/api/api/transactions';

	useEffect(() => {
		firebase
			.database()
			.ref("Transbank")
			.orderByChild("numero")
			.limitToLast(1)
			.on("value", (snapshot) => {
				setNumeroOrden(snapshot.val());
			});
	}, []);

	const donar = (e) => {
		e.preventDefault();
		setLoading(true);
		let orderToArray = [];

		const { nombre, apellido, email, monto } = e.target.elements;
		firebase
			.database()
			.ref("Transbank")
			.orderByChild("numero")
			.limitToLast(1)
			.on("value", (snapshot) => {
				console.log(snapshot.val())
				setNumeroOrden(snapshot.val());
			});
		if (numeroOrden) {
			console.log(numeroOrden);
			Object.keys(numeroOrden).forEach((key, i) => {
				orderToArray[i] = numeroOrden[key];
			});
			let key = parseInt(orderToArray[0].numero_orden.split('-')[1]) + 1;
			console.log(key);
			firebase
				.database()
				.ref()
				.child(`Transbank/orden_${key}`)
				.set({
					numero: key,
					item: "Aporte",
					monto: parseInt(monto.value),
					nombre: nombre.value,
					apellido: apellido.value,
					fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
					numero_orden: 'JMAGALLANICAS-'  + key,
					estado_de_pago: "Pendiente",
					forma_de_pago: "Pendiente",
					plataforma: "web",
					email: email.value,
				});
			firebase
				.database()
				.ref()
				.child(`Donaciones/${key}`)
				.set({
					aporte: parseInt(monto.value),
					nombre: nombre.value,
					apellido: apellido.value,
					fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
					numero_orden: 'JMAGALLANICAS-' + key,
					estado_de_pago: "Pendiente",
					forma_de_pago: "Pendiente",
					email: email.value,
					plataforma: "web",
				});
			axios({
				method: "post",
				url: url,
				data: {
                    'item': 'Aporte',
					'orden_compra': 'JMAGALLANICAS-' + key,
					'sessionID': "DonacionSitioWeb",
					'monto': parseInt(monto.value),
					'cantidad': 1,
					'nombre': nombre.value,
					'apellido': apellido.value,
					'email': email.value,
					'plataforma': "Web",
				},
			}).then((res) => {
				setLoading(false);
				window.location.replace(
					`${res.data.url}?token_ws=${res.data.token_ws}`
				);
			});
		}
	};

	return (
		<>
			<Modal show={show} onHide={onHide}>
				<Modal.Header closeButton>
					<Modal.Title>Donaciones</Modal.Title>
				</Modal.Header>
				<Form onSubmit={donar}>
					<Modal.Body>
						<Form.Group>
							<Form.Label>Nombre(s):</Form.Label>
							<Form.Control
								type="text"
								name="nombre"
								placeholder="Ingrese su nombre."
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Apellido(s):</Form.Label>
							<Form.Control
								type="text"
								name="apellido"
								placeholder="Ingrese su apellido."
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>E-mail:</Form.Label>
							<Form.Control
								type="email"
								name="email"
								placeholder="Ingrese su email."
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Monto a donar:</Form.Label>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text>$</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
									type="number"
									name="monto"
									required
									defaultValue="500"
									min="500"
									step="100"
								/>
							</InputGroup>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button color="success" block type="submit">
							{loading ? <Spinner animation="border" /> : "Donar"}
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default DonacionesModal;
