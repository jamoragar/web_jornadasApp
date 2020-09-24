import React from "react";
import { Form, Modal } from "react-bootstrap";

export const InfoDonacion = ({ show, onHide, data }) => {
	if (data) {
        if(data.tipo === 'Usuario'){
            return (
                <div>
                    <Modal show={show} onHide={onHide}>
                        <Form id="myForm">
                            <Modal.Header closeButton>
                                <Modal.Title>Información de donación</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group>
                                    <Form.Label>Numero de orden:</Form.Label>
                                    <Form.Control
                                        defaultValue={data.numero_orden}
                                        name="Numero De Orden"
                                        type="text"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Aporte:</Form.Label>
                                    <Form.Control
                                        defaultValue={data.aporte}
                                        name="Aporte"
                                        type="text"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        defaultValue={data.email}
                                        name="email"
                                        type="email"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control
                                        defaultValue={`${data.nombre} ${data.apellido}`}
                                        name="nombre"
                                        type="text"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Estado del pago:</Form.Label>
                                    <Form.Control
                                        defaultValue={data.estado_de_pago}
                                        name="Estado De Pago"
                                        type="text"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Forma de pago:</Form.Label>
                                    <Form.Control
                                        defaultValue={data.forma_de_pago}
                                        name="Forma De Pago"
                                        type="text"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Fecha:</Form.Label>
                                    <Form.Control
                                        defaultValue={data.fecha}
                                        name="Fecha"
                                        type="text"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Id de usuario:</Form.Label>
                                    <Form.Control
                                        defaultValue={data.uid}
                                        name="User Id"
                                        type="text"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer></Modal.Footer>
                        </Form>
                    </Modal>
                </div>
            );
        }else{
            return (
                <div>
                    <Modal show={show} onHide={onHide}>
                        <Form id="myForm">
                            <Modal.Header closeButton>
                                <Modal.Title>Información de donación</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group>
                                    <Form.Label>Numero de orden:</Form.Label>
                                    <Form.Control
                                        defaultValue={data.numero_orden}
                                        name="Numero De Orden"
                                        type="text"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Aporte:</Form.Label>
                                    <Form.Control
                                        defaultValue={data.aporte}
                                        name="Aporte"
                                        type="text"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control
                                        defaultValue={data.nombre}
                                        name="nombre"
                                        type="text"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Representante:</Form.Label>
                                    <Form.Control
                                        defaultValue={data.representante}
                                        name="Representante"
                                        type="text"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        defaultValue={data.email}
                                        name="email"
                                        type="email"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Telefono:</Form.Label>
                                    <Form.Control
                                        defaultValue={data.telefono}
                                        name="telefono"
                                        type="phone"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Estado del pago:</Form.Label>
                                    <Form.Control
                                        defaultValue={data.estado_de_pago}
                                        name="Estado De Pago"
                                        type="text"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Forma de pago:</Form.Label>
                                    <Form.Control
                                        defaultValue={data.forma_de_pago}
                                        name="Forma De Pago"
                                        type="text"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                                {data.certificado? 
                                <Form.Group>
                                <Form.Label>Certificado de aporte:</Form.Label>
                                <Form.Control
                                    defaultValue="Si"
                                    name="certificado"
                                    type="text"
                                    placeholder="no hay datos registrados."
                                    readOnly
                                />
                            </Form.Group>
                            :
                            <Form.Group>
                                    <Form.Label>Certificado de aporte:</Form.Label>
                                    <Form.Control
                                        defaultValue="No"
                                        name="certificado"
                                        type="text"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>    
                            
                            }
                                <Form.Group>
                                    <Form.Label>Fecha:</Form.Label>
                                    <Form.Control
                                        defaultValue={data.fecha}
                                        name="Fecha"
                                        type="text"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Id de usuario:</Form.Label>
                                    <Form.Control
                                        defaultValue={data.uid}
                                        name="User Id"
                                        type="text"
                                        placeholder="no hay datos registrados."
                                        readOnly
                                    />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer></Modal.Footer>
                        </Form>
                    </Modal>
                </div>
            );
        }
		
	} else {
		return null;
	}
};
