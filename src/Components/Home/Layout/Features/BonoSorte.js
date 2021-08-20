import React, { useState } from "react";
import { Modal, Button, Form, InputGroup, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
// import firebase from "../../../../Config/Firebase";
// import moment from "moment";
import "./Features.css";

const BonoSorteo = ({ show, onHide }) => {
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(false);
  const valorBono = 1000;
  const [showErrorRut, setShowErrorRut] = useState(false);
  const [showErrorConexion, setShowErrorConexion] = useState(false);

  //Desarrollo
  // const URL = "http://127.0.0.1:8000/api/transactions";
  // Producción
  const URL = 'https://appjornadasmagallanicas.cl/api/api/transactions';


  const comprarBonos = (e) => {
    e.preventDefault();
    setLoading(true);

    const { nombre, apellido, rut, cantidad_bonos, telefono, email } = e.target.elements;
      const rut_validado = validaRut.validaRut(rut.value.trim());
      console.log(rut_validado)
      if(rut_validado){
        axios({
          method: "POST",
          url: URL,
          data: {
            item: "Bono Sorteo",
            // orden_compra: "JMAGALLANICAS-" + res.data,
            sessionID: "BonoSorteoSitioWeb",
            monto: valorBono * cantidad_bonos.value,
            cantidad: cantidad_bonos.value,
            nombre: nombre.value.trim(),
            apellido: apellido.value.trim(),
            rut: rut.value.trim(),
            email: email.value.trim(),
            plataforma: "Web",
            telefono: telefono.value.trim()
          }
        }).then((_res) => {
          setLoading(false);
          console.log(_res.data)
          window.location.replace(
            `${_res.data.url}?token_ws=${_res.data.token_ws}`
          );
          }).catch(err => {
            console.warn(err);
            setLoading(false);
            setShowErrorConexion(true)
            setTimeout(() => {
              setShowErrorConexion(false)
            },6000);

          });
        console.log("estamos llegando...");
      }else{
        setLoading(false);
        setShowErrorRut(true);
        setTimeout(() => {
          setShowErrorRut(false)
        },4000)
      }
  };

  //Valida RUT
  const validaRut = {
    // Valida el rut con su cadena completa "XXXXXXXX-X"
    validaRut : (rutCompleto) => {
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
        return false;
      let tmp 	= rutCompleto.split('-');
      let digv	= tmp[1]; 
      let rut 	= tmp[0];
      if ( digv == 'K' ) digv = 'k' ;
      return (validaRut.dv(rut) == digv );
    },
    dv: (T) => {
      let M=0,S=1;
      for(;T;T=Math.floor(T/10))
        S=(S+T%10*(9-M++%6))%11;
      return S?S-1:'k';
    }
  }

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
              placeholder="Ingrese su correo electrónico"
              required
            />
          </Form.Group>
          <Form.Group>
          <Form.Label>Rut:</Form.Label>
          <br />
          <Form.Label style={{fontSize: '11px'}}>(ejemplo: 12345678-9)</Form.Label>
            <Form.Control
              name="rut"
              type="text"
              placeholder="Ingrese su rut"
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
                  onClick={() => setCantidad(cantidad === 100 ? cantidad : cantidad + 1)}
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
          <p>
            <a
              className="linkBases"
              href="/pdf/BASES_SORTEO_PARCELA.pdf"
              target="_blank"
            >
              Descargar bases de sorteo aquí
            </a>
          </p>
        </Modal.Footer>
        <Alert  show={showErrorRut}
                variant="warning"
                dismissible
                onClose={() => setShowErrorRut(false)}
                >
           Rut inválido, por favor verifique que el rut este ingresado correctamente, <b>sin puntos y con guión</b>, e intente nuevamente.         
        </Alert>
        <Alert  show={showErrorConexion}
                variant="danger"
                dismissible
                onClose={() => setShowErrorConexion(false)}
                >
           Problemas de conexión con el servidor. Si el problema persisite, por favor contactar al administrador del sistema.         
        </Alert>
      </Form>
    </Modal>
  );
};

export default BonoSorteo;
