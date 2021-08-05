import React, { useState } from "react";
import { Form,  Modal } from "react-bootstrap";

export const InfoTalonario = ({ show, onHide, data }) => {
	if (data) {
		if (data.usuario) {
		  console.log(data);
		  console.log(data.usuario);
		  return (
			<div>
			  <Modal show={show} onHide={onHide}>
				<Form id="myForm">
				  <Modal.Header closeButton>
					<Modal.Title>Información de Talonario</Modal.Title>
				  </Modal.Header>
				  <Modal.Body>
					<Form.Group>
					  <Form.Label>Numero de Talonario</Form.Label>
					  <Form.Control
						defaultValue={data.talonario_numero}
						name="Numero De Orden"
						type="text"
						placeholder="no hay datos registrados."
						readOnly
					  />
					</Form.Group>
					<Form.Group>
					  <Form.Label>Correlativo:</Form.Label>
					  <Form.Control
						defaultValue={data.correlativo}
						name="Aporte"
						type="text"
						placeholder="no hay datos registrados."
						readOnly
					  />
					</Form.Group>
					<Form.Group>
					  <Form.Label>asignada a usuario:</Form.Label>
					  <Form.Control
						defaultValue={`${data.usuario.nombre} ${data.usuario.apellido} `}
						name="email"
						type="email"
						placeholder="no hay datos registrados."
						readOnly
					  />
					</Form.Group>
					<Form.Group>
					  <Form.Label>Email:</Form.Label>
					  <Form.Control
						defaultValue={data.usuario.email}
						name="nombre"
						type="text"
						placeholder="no hay datos registrados."
						readOnly
					  />
					</Form.Group>
					<Form.Group>
					  <Form.Label>Tipo de Usuario:</Form.Label>
					  <Form.Control
						defaultValue={data.usuario.subtipo}
						name="Estado De Pago"
						type="text"
						placeholder="no hay datos registrados."
						readOnly
					  />
					</Form.Group>
					<Form.Group>
					  <Form.Label>Fecha de entrega:</Form.Label>
					  <Form.Control
						defaultValue={data.fecha_entrega}
						name="Estado De Pago"
						type="text"
						placeholder="no hay datos registrados."
						readOnly
					  />
					</Form.Group>
					{data.tercero ? (
					  <>
						<Modal.Header >
						  <Modal.Title>Asignada a tercero:</Modal.Title>
						</Modal.Header>
						<Form.Group>
						  <Form.Label>nombre:</Form.Label>
						  <Form.Control
							defaultValue={data.tercero.nombre}
							name="Forma De Pago"
							type="text"
							placeholder="no hay datos registrados."
							readOnly
						  />
						</Form.Group>
						<Form.Group>
						  <Form.Label>Email:</Form.Label>
						  <Form.Control
							defaultValue={data.tercero.correo}
							name="Fecha"
							type="text"
							placeholder="no hay datos registrados."
							readOnly
						  />
						</Form.Group>
						<Form.Group>
						  <Form.Label>Rut:</Form.Label>
						  <Form.Control
							defaultValue={data.tercero.rut}
							name="User Id"
							type="text"
							placeholder="no hay datos registrados."
							readOnly
						  />
						</Form.Group>
						<Form.Group>
						  <Form.Label>direccion:</Form.Label>
						  <Form.Control
							defaultValue={data.tercero.direccion}
							name="User Id"
							type="text"
							placeholder="no hay datos registrados."
							readOnly
						  />
						</Form.Group>
						<Form.Group>
						  <Form.Label>Fecha de Asignación:</Form.Label>
						  <Form.Control
							defaultValue={data.fecha_asignacion}
							name="User Id"
							type="text"
							placeholder="no hay datos registrados."
							readOnly
						  />
						</Form.Group>
					  </>
					) : 
					
					<>
						<Modal.Header >
						  <Modal.Title>Asignado a tercero:</Modal.Title>
						</Modal.Header>
						<Modal.Body>Este talonario aun no ha sido asignada a un tercero.</Modal.Body>
					  </>	
					}
				  </Modal.Body>
				  <Modal.Footer></Modal.Footer>
				</Form>
			  </Modal>
			</div>
		  );
		} else {
		  return (
			<div>
			  <Modal show={show} onHide={onHide}>
				<Form id="myForm">
				  <Modal.Header closeButton>
					<Modal.Title>Información de talonario</Modal.Title>
				  </Modal.Header>
				  <Modal.Body>Este talonario aun no ha sido asignada.</Modal.Body>
				  <Modal.Footer></Modal.Footer>
				</Form>
			  </Modal>
			</div>
		  );
		}
	  } else {
		return (
		  <div>
			 <Modal show={show} onHide={onHide}>
				<Form id="myForm">
				  <Modal.Header closeButton>
					<Modal.Title>Información de talonario</Modal.Title>
				  </Modal.Header>
				  <Modal.Body>Este talonario aun no ha sido asignada.</Modal.Body>
				  <Modal.Footer></Modal.Footer>
				</Form>
			  </Modal>
		  </div>
		);
	  }
	};