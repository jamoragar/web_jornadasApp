import React, { useRef, useState } from "react";
import {
	Modal,
	Button,
	Form,
	Overlay,
	Tooltip,
	Spinner
} from "react-bootstrap";
import Handler from "../Handler/Handler";
import useErr from "../Hook/useErr";
import firebase from "../../Config/Firebase";
import { RecoverPassword } from "./RecoverPassword";

const Login = ({ show, onHide }) => {
	const [loadingText, setLoadingText] = useState("Ingresar");
	const [showToolTip, setShowTooltip] = useState(false);
	const [showRecoverpassword, setShowRecoverPassword] = useState(false);
	const Err = useErr();
	const { err, setErr } = Err;
	const target = useRef(null);

	const loginSubmit = (e) => {
		e.preventDefault();
		setLoadingText(<Spinner animation="border" size="sm" />);

		let { email, password } = e.target;

		email = email.value.trim();
		password = password.value.trim();

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((auth) => {
				setLoadingText("Ingresar");
				if (auth) {
					onHide();
				}
			})
			.catch((error) => {
				setShowTooltip(true);
				setLoadingText("Ingresar");
				setErr({
					code: error.code,
					message: Handler(error.code),
				});
				setTimeout(() => setShowTooltip(false), 3500);
			});
	};

	return (
		<Modal show={show} onHide={onHide}>
			<Form onSubmit={loginSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>Iniciar Sesión</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId="formGroupEmail">
						<Form.Label>Email:</Form.Label>
						<Form.Control
							name="email"
							type="email"
							placeholder="Ingrese su email."
							required
						/>
					</Form.Group>
					<Form.Group controlId="formGroupPassword">
						<Form.Label>Contraseña:</Form.Label>
						<Form.Control
							name="password"
							type="password"
							placeholder="Ingrese su contraseña."
							required
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" type="submit" ref={target} block>
						{loadingText}
					</Button>
					<Overlay
						target={target.current}
						show={showToolTip}
						placement="bottom"
						onHide={() => setShowTooltip(false)}
						rootClose={true}
					>
						{(props) => {
							return (
								<Tooltip
									className="tooltip-error"
									{...props}
									show={props.show.toString()}
								>
									{err.message}
								</Tooltip>
							);
						}}
					</Overlay>
					<Button variant="danger" onClick={onHide} block>
						Cancelar
					</Button>
				</Modal.Footer>
			</Form>
			<Button variant="light" onClick={()=> setShowRecoverPassword(true)} block>
				Olvidaste tu contraseña?
			</Button>
			<RecoverPassword show={showRecoverpassword} onHide={()=> setShowRecoverPassword(false)}/> 
		</Modal>
	);
};

export default Login;
