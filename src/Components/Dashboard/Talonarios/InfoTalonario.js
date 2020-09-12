import React, { useState } from "react";
import { Form, Button, Modal, Alert, Spinner, Col } from "react-bootstrap";

export const InfoTalonario = ({ show, onHide, data }) => {
	if (data) {
		return (
			<div>
				<Modal show={show} onHide={onHide}>
					<Form id="myForm">
						<Modal.Header closeButton>
							<Modal.Title>Información de Talonario</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							contiene la informacion de a quiene esta asignado, fecha, estado, etc...
						</Modal.Body>
						<Modal.Footer></Modal.Footer>
					</Form>
				</Modal>
			</div>
		);
	} else {
		return null;
	}
};