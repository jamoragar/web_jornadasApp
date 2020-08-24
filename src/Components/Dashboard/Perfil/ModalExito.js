import React from "react";
import { Modal, Button } from "react-bootstrap";
import {handleLogOut} from '../../../Config/Firebase'

export const ModalExito = ({ show, onHide }) => {
	
	const close = () => {
		onHide();
		handleLogOut();
	};

	return (
		<>
			<Modal show={show} onHide={onHide}>
				<Modal.Header closeButton>
					<Modal.Title>Perfil</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Su información ha sido actualizada de forma exitosa.
				</Modal.Body>
				<Modal.Footer>
					<Button color="success" block onClick={close}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
