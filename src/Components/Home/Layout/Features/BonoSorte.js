import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import axios from "axios";
import firebase from "../../../../Config/Firebase";
import moment from "moment";
import './Features.css';

const BonoSorteo = ({ show, onHide }) => {
	const [cantidad, setCantidad] = useState(1);
	const [loading, setLoading] = useState(false);
	const valorBono = 500;
	const [numeroOrden, setNumeroOrden] = useState();

	//Desarrollo
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

	const comprarBonos = (e) => {
		let orderToArray = [];
		e.preventDefault();
		setLoading(true);

		const { nombre, apellido, email, cantidad_bonos, telefono } = e.target.elements;

		firebase
			.database()
			.ref("Transbank")
			.orderByChild("numero")
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
			let key = parseInt(orderToArray[0].numero_orden.split('-')[1]) + 1;
			console.log(key);
			firebase
				.database()
				.ref()
				.child(`Transbank/orden_${key}`)
				.set({
					numero:key,
					item: "Bono",
					cantidad: cantidad_bonos.value,
					monto: valorBono * cantidad_bonos.value,
					nombre: nombre.value,
					apellido: apellido.value,
					email: email.value,
					fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
					numero_orden: 'JMAGALLANICAS-' + key,
					estado_de_pago: "Pendiente",
					forma_de_pago: "Pendiente",
					plataforma: "Web",
					telefono: telefono.value
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
					numero_orden: 'JMAGALLANICAS-' + key,
					fecha: moment().format("DD-MM-YYYY h:mm:ss a"),
					id: key,
					estado_de_pago: "Pendiente",
					forma_de_pago: "Pendiente",
					plataforma: "web",
					telefono: telefono.value
				});
			axios({
				method: "post",
				url: url,
				data: {
                    'item' : 'Bono Sorteo',
					'orden_compra': 'JMAGALLANICAS-' + key,
					'sessionID': "BonoSorteoSitioWeb",
					'monto': valorBono * cantidad_bonos.value,
					'cantidad': cantidad_bonos.value,
					'nombre': nombre.value,
					'apellido': apellido.value,
					'email': email.value,
					'plataforma': "Web",
					'telefono': telefono.value
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
						<Form.Label>Teléfono:</Form.Label>
						<Form.Control
							name="telefono"
							type="text"
							placeholder="Ingrese su nro. de teléfono"
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
					<p><a className="linkBases" href="/pdf/BASES_SORTEO_PARCELA.pdf" target="_blank">Descargar bases de sorteo aquí</a></p>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default BonoSorteo;
