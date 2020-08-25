import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import axios from "axios";
import firebase from "../../../../Config/Firebase";
import moment from "moment";

const BonoSorteo = ({ show, onHide }) => {
	const [cantidad, setCantidad] = useState(1);
	const [loading, setLoading] = useState(false);
	const valorBono = 500;
	const [numeroOrden, setNumeroOrden] = useState();

	useEffect(() => {
		firebase
			.database()
			.ref("Transbank")
			.orderByChild("numero_orden")
			.limitToLast(1)
			.on("value", (snapshot) => {
				setNumeroOrden(snapshot.val());
				console.log(numeroOrden);
			});
	}, []);

	const comprarBonos = (e) => {
		let orderToArray = [];
		e.preventDefault();
		setLoading(true);

		const { nombre, apellido, email, cantidad_bonos } = e.target.elements;

		firebase
			.database()
			.ref("Transbank")
			.orderByChild("numero_orden")
			.limitToLast(1)
			.on("value", (snapshot) => {
				setNumeroOrden(snapshot.val());
				console.log(numeroOrden);
			});
		if (numeroOrden) {
			console.log(numeroOrden);
			Object.keys(numeroOrden).forEach((key, i) => {
				orderToArray[i] = numeroOrden[key];
			});
			let key = parseInt(orderToArray[0].numero_orden) + 1;
			console.log(key);
			firebase
				.database()
				.ref()
				.child(`Transbank/orden_${key}`)
				.set({
					item: "Bono",
					cantidad: cantidad_bonos.value,
					monto: valorBono * cantidad_bonos.value,
					nombre: nombre.value,
					apellido: apellido.value,
					email: email.value,
					fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
					numero_orden: key,
					estado_de_pago: "Pendiente",
					forma_de_pago: "Pendiente",
					plataforma: "Web",
				});
			firebase
				.database()
				.ref()
				.child(`Bono_digital/${key}/`)
				.set({
					monto: valorBono * cantidad_bonos.value,
					nombre: nombre.value,
					apellido: apellido.value,
					email: email.value,
					cantidad: cantidad_bonos.value,
					numero_orden: key,
					fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
					id: key,
					estado_de_pago: "Pendiente",
					forma_de_pago: "Pendiente",
					plataforma: "web",
				});
			axios({
				method: "post",
				url: "https://appjornadasmagallanicas.cl/api/api/transactions",
				data: {
                    'item' : 'Bono',
					'orden_compra': key,
					'sessionID': "BonoSorteoSitioWeb",
					'monto': valorBono * cantidad_bonos.value,
					'cantidad': cantidad_bonos.value,
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
			console.log("estamos llegando...");
		}
	};

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Bonos de Sorteo</Modal.Title>
			</Modal.Header>
			<Form onSubmit={comprarBonos}>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Nombre(s):</Form.Label>
						<Form.Control
							name="nombre"
							type="text"
							placeholder="Ingrese su nombre"
							required
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Apellido(s):</Form.Label>
						<Form.Control
							name="apellido"
							type="text"
							placeholder="Ingrese su apellido"
							required
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>E-mail:</Form.Label>
						<Form.Control
							name="email"
							type="email"
							placeholder="Ingrese su e-mail"
							required
						/>
					</Form.Group>
					<Form.Group>
						<InputGroup>
							<InputGroup.Append>
								<Button
									variant="outline-danger"
									onClick={() =>
										setCantidad(cantidad === 1 ? cantidad : cantidad - 1)
									}
								>
									-
								</Button>
							</InputGroup.Append>
							<Form.Control
								type="number"
								name="cantidad_bonos"
								style={{ textAlign: "center" }}
								value={cantidad}
								readOnly
								min="1"
							/>
							<InputGroup.Append>
								<Button
									variant="outline-success"
									onClick={() => setCantidad(cantidad + 1)}
								>
									+
								</Button>
							</InputGroup.Append>
						</InputGroup>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button color="success" block type="submit">
						{loading ? (
							<Spinner animation="border" />
						) : (
							<>
								<b>${valorBono * cantidad}</b> Comprar
							</>
						)}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default BonoSorteo;
