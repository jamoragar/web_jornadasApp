import React from "react";
import { Form, Modal } from "react-bootstrap";
import moment from 'moment';

export const InfoBono = ({ show, onHide, data }) => {
  const date = moment(data.transactionDate).format("DD-MM-YYYY hh:mm");
  if (data) {
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
                  defaultValue={data.buy_order}
                  name="Numero De Orden"
                  type="text"
                  placeholder="no hay datos registrados."
                  readOnly
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Cantidad de Bonos:</Form.Label>
                <Form.Control
                  defaultValue={data.cantidad}
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
                  defaultValue={data.responseCode}
                  name="Estado De Pago"
                  type="text"
                  placeholder="no hay datos registrados."
                  readOnly
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha:</Form.Label>
                <Form.Control
                  defaultValue={date}
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
  } else {
    return null;
  }
};
