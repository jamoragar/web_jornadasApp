import React, { useState, useRef } from "react";
import { Modal, Form, Button, Alert, FormGroup } from "react-bootstrap";
import EntregaPorRango from "./EntregaPorRango";
import firebase from "../../../Config/Firebase";
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer'
import moment from "moment";
import Swal from "sweetalert2";
import "./Alcancias.css";

import ActaEntregaTalonarios from '../Actas/ActaEntregaTalonarios';
import DetalleUsuarioTalonario from "./DetalleUsuarioTalonario";

const EntregarTalonarios = ({ show, onHide, data }) => {
  let inputEl = useRef([]);
  const [valueTalonario, setValueTalonario] = useState([]);
  const [cantTalonarios, setCantTalonarios] = useState([]);
  const [modalErrorCodigo, setModalErrorCodigo] = useState(false);
  const [modalCodigoYaAsignado, setModalCodigoYaAsignado] = useState(false);
  const [alertCompletarShow, setAlertCompletarShow] = useState(false);
  const [alertFalloShow, setAlertFalloShow] = useState(false);
  const [alertExitoShow, setAlertExitoShow] = useState(false);
  const [codigoError, setCodigoError] = useState("");
  const [radioValue, setRadioValue] = useState(0);

  const handleTalonario = (value, input_position, key) => {
    const input_value = value.toString();
    const position = input_position;
    const enter = key === "Enter" ? true : false;
    if (enter === true) {
      firebase
        .database()
        .ref("/Talonarios")
        .orderByChild("correlativo")
        .equalTo(input_value)
        .once("value")
        .then((snapshot) => {
          let asignado_usuario;
          snapshot.forEach(
            (childSnapshot) =>
              (asignado_usuario = childSnapshot.val().asignado_usuario)
          );

          if (asignado_usuario === false) {
            if (
              parseInt(cantTalonarios) === 1 ||
              parseInt(cantTalonarios) === position + 1
            ) {
              inputEl.current[position].focus();
            } else {
              inputEl.current[position + 1].focus();
            }

            if (inputEl.current[position].classList.contains("error_code")) {
              inputEl.current[position].classList.remove("error_code");
            }

            inputEl.current[position].classList.add("good_code");
          } else {
            inputEl.current[position].focus();
            if (inputEl.current[position].classList.contains("good_code")) {
              inputEl.current[position].classList.remove("good_code");
            }
            inputEl.current[position].classList.add("error_code");
          }
        });
    }
  };
  const asignarTalonario = (e) => {
    e.preventDefault();

    inputEl.current.length = cantTalonarios;

    const talonarios_firebase = [];
    const talonarios_validados = [];
    let cantidad_inputs;

    Object.keys(inputEl).map((key) => {
      inputEl[key].map((input) => {
        let input_value = input["value"];
        if (input_value != "") {
          talonarios_firebase.push(input_value.trim());
        }
      });
      cantidad_inputs = inputEl[key].length;
    });

    if (
      checkIfArrayIsUnique(talonarios_firebase) &&
      talonarios_firebase.length === cantidad_inputs
    ) {
      talonarios_firebase.forEach((codigo, i) => {
        firebase
          .database()
          .ref("/Talonarios")
          .orderByChild("talonario_numero")
          .equalTo(parseInt(codigo))
          .once("value")
          .then((snapshot) => {
            let talonario_asignado;
            let data_talonario;
            snapshot.forEach((childSnapshot) => {
              talonario_asignado = childSnapshot.val().asignado_usuario;
              data_talonario = childSnapshot.val();
            });

            if (!snapshot.val()) {
              console.log("error...");
              setCodigoError(codigo);
              setModalErrorCodigo(true);
            } else if (talonario_asignado === true) {
              setCodigoError(codigo);
              setModalCodigoYaAsignado(true);
            } else {
              snapshot.forEach((childSnapshot) => {
                talonario_asignado = childSnapshot.val().asignado_usuario;
                data_talonario = childSnapshot.val();
              });

              let num_talonario = Object.getOwnPropertyNames(snapshot.val())[0];

              talonarios_validados.push(
                snapshot.val()[Object.keys(snapshot.val())]
              );

              firebase
                .database()
                .ref(`/Talonarios/${num_talonario}`)
                .update({
                  asignado_usuario: true,
                  fecha_entrega: moment().format("MM-DD-YYYY h:mm:ss a"),
                  usuario: {
                    uid: data.uid,
                    nombre: data.nombre,
                    apellido: data.apellido,
                    email: data.email,
                    subtipo: data.subtipo ? data.subtipo : null,
                  },
                });
              firebase
                .database()
                .ref(`/Users/${data.uid}/talonarios`)
                .once("value")
                .then((snapshot) => {
                  if (snapshot.val() === null) {
                    firebase
                      .database()
                      .ref(`/Users/${data.uid}/talonarios/${i}`)
                      .update({
                        talonario_numero: data_talonario.talonario_numero,
                        asignado_externo: data_talonario.asignado_externo,
                        asignado_tercero: data_talonario.asignado_tercero,
                        asignado_usuario: true,
                        correlativo: data_talonario.correlativo,
                        fecha_asignacion: moment().format(
                          "MM-DD-YYYY h:mm:ss a"
                        ),
                        fecha_recuperacion: "",
                        fecha_reinicio: "",
                        recuperada: false,
                        reset: false,
                      });
                  } else {
                    let aux_array = [];
                    aux_array.push(snapshot.val());
                    console.log(aux_array)

                    firebase
                      .database()
                      .ref(`/Users/${data.uid}/talonarios/${aux_array[0].length}`)
                      .update({
                        talonario_numero: data_talonario.talonario_numero,
                        asignado_externo: data_talonario.asignado_externo,
                        asignado_tercero: data_talonario.asignado_tercero,
                        asignado_usuario: true,
                        correlativo: data_talonario.correlativo,
                        fecha_asignacion: moment().format(
                          "MM-DD-YYYY h:mm:ss a"
                        ),
                        fecha_recuperacion: "",
                        fecha_reinicio: "",
                        recuperada: false,
                        reset: false,
                      });
                  }
                });
              Swal.fire({
                title:"Asignación Correcta!",
                text:"La asignación de talonarios ha finalizado con éxito. ¿Desea descargar el Acta de Entrega?",
                icon:"success",
                showCancelButton: true,
                confirmButtonText: `Si, descargar`,
                cancelButtonText: 'No'
              }).then(result => {
                if(result.isConfirmed){
                  generatePdfDocument(talonarios_firebase, data)
               }
              })
            }
          });
      });
    } else if (checkIfArrayIsUnique(talonarios_firebase) == false) {
      setAlertFalloShow(true);
      setTimeout(() => {
        setAlertFalloShow(false);
      }, 2817);
      console.log("tiene elementos duplicados...");
    } else {
      setAlertCompletarShow(true);
      setTimeout(() => {
        setAlertCompletarShow(false);
      }, 2817);
      console.log("debe completar todos los campos antes de asignar alcancias");
    }
  };

  const checkIfArrayIsUnique = (array) => {
    return array.length === new Set(array).size;
  };

  const handleEntregaTalonarios = (tipo_tabla) => {
    if (tipo_tabla === "asignar") {
      setRadioValue(0);
    }
    if (tipo_tabla === "rango") {
      setRadioValue(1);
    }
    if (tipo_tabla === "detalle") {
      setRadioValue(2);
    }
  };

  //Función que genera el pdf pasandole la data de alcancías al componente Acta
  const generatePdfDocument = async (talonarios, usuario) => {
    const blob = await pdf((
        <ActaEntregaTalonarios
          data = {talonarios}
          usuario = {usuario}
        />
    )).toBlob();
    saveAs(blob, 'Acta_Talonarios_2021.pdf');
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Asignar Talonarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <Form.Check
                inline
                name={`asignar_talonario`}
                type={"radio"}
                id={`asignar`}
                label={`Asignar`}
                defaultChecked
                onChange={(e) => handleEntregaTalonarios(e.target.id)}
              />
              <Form.Check
                inline
                name={`asignar_talonario`}
                type={"radio"}
                id={`rango`}
                label={`Por Rango`}
                onChange={(e) => handleEntregaTalonarios(e.target.id)}
              />
              <Form.Check
                inline
                name={`asignar_talonario`}
                type={"radio"}
                id={`detalle`}
                label={`Detalle`}
                onChange={(e) => handleEntregaTalonarios(e.target.id)}
              />
            </FormGroup>
          </Form>
          {(() => {
            if (radioValue == 0) {
              return(<Form onSubmit={asignarTalonario}>
                <Form.Group>
                  <Form.Label>
                    ¿Cuantos Talonarios va a asignarle a <b>{data.nombre}</b>?
                  </Form.Label>
                  <Form.Control
                    name="cant_talonarios"
                    type="number"
                    placeholder="Ingrese la cantidad de talonarios"
                    min="1"
                    max="50"
                    onChange={(e) => setCantTalonarios(e.target.value)}
                  />
                </Form.Group>
                {
                  //Immediately-invoked function expression (IIFE).
                  (() => {
                    const inputs = [];
                    for (let i = 0; i < cantTalonarios; i++) {
                      inputs.push(
                        <Form.Group key={i + 1}>
                          <Form.Label>Talonario Nro. {i + 1}:</Form.Label>
                          <Form.Control
                            name={`talonario_nro${i + 1}`}
                            ref={(el) => (inputEl.current[i] = el)}
                            type="text"
                            placeholder="Ingrese el correlativo del talonario a entregar."
                            onKeyPress={(e) => {
                              handleTalonario(e.target.value, i, e.key);
                              setValueTalonario([
                                ...valueTalonario,
                                e.target.name,
                              ]);
                              e.key === "Enter" && e.preventDefault();
                            }}
                          />
                        </Form.Group>
                      );
                    }
                    return inputs;
                  })()
                }
                <Button variant="success" type="submit" block>
                  Asignar
                </Button>
                <Alert
                  style={{ width: "100%" }}
                  show={alertExitoShow}
                  variant={"success"}
                  onClose={() => setAlertExitoShow(false)}
                  dismissible
                >
                  Alcancías asignadas con éxito!
                </Alert>
                <Alert
                  style={{ width: "100%" }}
                  show={alertFalloShow}
                  variant={"danger"}
                  onClose={() => setAlertFalloShow(false)}
                  dismissible
                >
                  Existen correlativos duplicados, por favor verifique.
                </Alert>
                <Alert
                  style={{ width: "100%" }}
                  show={alertCompletarShow}
                  variant={"danger"}
                  onClose={() => setAlertCompletarShow(false)}
                  dismissible
                >
                  Debe completar todos los campos antes de continuar.
                </Alert>
              </Form>);
            }
            if (radioValue == 1) {
              return <EntregaPorRango data={data} />;
            }
            if (radioValue == 2) {
                return <DetalleUsuarioTalonario data={data} />
            }
          })()}
        </Modal.Body>

        <Modal
          show={modalErrorCodigo}
          onHide={() => setModalErrorCodigo(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Error!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>
              El correlativo: {codigoError}. No existe o esta mal ingresado.
              Favor corroborar.
            </h5>
          </Modal.Body>
        </Modal>
        <Modal
          show={modalCodigoYaAsignado}
          onHide={() => setModalCodigoYaAsignado(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Error!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>
              El código: {codigoError}. Ya ha sido asignado a alguien más.
            </h5>
          </Modal.Body>
        </Modal>
      </Modal>
    </>
  );
};

export default EntregarTalonarios;
