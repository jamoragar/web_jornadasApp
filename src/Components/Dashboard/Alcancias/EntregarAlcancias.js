import React, { useState, useRef } from "react";
import { Modal, Form, Button, Alert, FormGroup, Spinner } from "react-bootstrap";
import { saveAs } from 'file-saver';
import firebase from "../../../Config/Firebase";
import DetalleUsuarioAlcancias from "./DetalleUsuarioAlcancias";
import ActaEntregaAlcancias from "../Actas/ActaEntregaAlcancias";
import { PDFDownloadLink, pdf } from '@react-pdf/renderer'
import "./Alcancias.css";
import moment from "moment";
import Swal from "sweetalert2";

const EntregarAlcancias = ({ show, onHide, data }) => {
  console.log(data)
  let inputEl = useRef([]);
  const [cantAlcancias, setCantAlcancias] = useState(0);
  const [alertExitoShow, setAlertExitoShow] = useState(false);
  const [alertFalloShow, setAlertFalloShow] = useState(false);
  const [alertCompletarShow, setAlertCompletarShow] = useState(false);
  const [alertaCodigoErroneoShow, setAlertaCodigoErroneoShow] = useState(false);
  const [modalErrorCodigo, setModalErrorCodigo] = useState(false);
  const [modalCodigoYaAsignado, setModalCodigoYaAsignado] = useState(false);
  const [codigoError, setCodigoError] = useState("");
  const [valueAlcancia, setValueAlcancia] = useState([]);
  const [radioValue, setRadioValue] = useState(0);
  const [loadingFirebaseWriting, setLoadingFirebaseWriting] = useState(false);

  const handleAlcancia = (value, input_position, key) => {
    const input_value = value;
    const position = input_position;
    const enter = key === "Enter" ? true : false;
    if (enter) {
      firebase
        .database()
        .ref("/Alcancias")
        .orderByChild("codigo_barra")
        .equalTo(input_value.toString())
        .once("value")
        .then((snapshot) => {
          let asignada_usuario;
          snapshot.forEach(
            (childSnapshot) =>
              (asignada_usuario = childSnapshot.val().asignada_usuario)
          );
          if (asignada_usuario === false) {
            if (
              parseInt(cantAlcancias) === 1 ||
              parseInt(cantAlcancias) === position + 1
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

  //Función que genera el pdf pasandole la data de alcancías al componente Acta
  const generatePdfDocument = async (alcancias, usuario) => {
    const blob = await pdf((
        <ActaEntregaAlcancias
            data = {alcancias}
            usuario = {usuario}
        />
    )).toBlob();
    saveAs(blob, 'Acta_Alcancias_2021.pdf');
    };

  const checkIfArrayIsUnique = (array) => {
    return array.length === new Set(array).size;
  };

  const codigoErroneo = (codigo) => {
    setAlertaCodigoErroneoShow(true);
    setTimeout(() => {
      setAlertaCodigoErroneoShow(false);
    }, 2000);
    return (
      <Alert
        style={{ width: "100%" }}
        show={alertaCodigoErroneoShow}
        variant={"danger"}
        onClose={() => setAlertaCodigoErroneoShow(false)}
        dismissible
      >
        El código {codigo} no existe o esta mal ingresado.
      </Alert>
    );
  };

  const asignarAlcancias = (e) => {
    e.preventDefault();
    setLoadingFirebaseWriting(true);


    inputEl.current.length = cantAlcancias;

    const alcancias_firebase = [];
    const alcancias_validadas = [];
    let cantidad_inputs;

    Object.keys(inputEl).map((key) => {
      inputEl[key].map((input) => {
        let input_value = input["value"];
        if (input_value != "") {
          alcancias_firebase.push(input_value.trim());
        }
      });
      cantidad_inputs = inputEl[key].length;
    });
    const snapshotToArray = (snapshot) => {
      Object.entries(snapshot).map((e) => Object.assign(e[1], { key: e[0] }));
    };

    if (checkIfArrayIsUnique(alcancias_firebase) && alcancias_firebase.length === cantidad_inputs) {
      // Validamos que los codigos de las alcancias existan en la bd
      
      
      alcancias_firebase.map((codigo, i) => {
        firebase
          .database()
          .ref("/Alcancias")
          .orderByChild("codigo_barra")
          .equalTo(codigo.toString())
          .once("value")
          .then((snapshot) => {
            let alcancia_asignada;
            let data_alcancia;

            snapshot.forEach((childSnapshot) => {
              alcancia_asignada = childSnapshot.val().asignada_usuario;
              data_alcancia = childSnapshot.val();
            });

            if (!snapshot.val()) {
              console.log("error...");
              setCodigoError(codigo);
              setModalErrorCodigo(true);
            } else if (alcancia_asignada == true) {
              setCodigoError(codigo);
              setModalCodigoYaAsignado(true);
            } else {
              snapshot.forEach((childSnapshot) => {
                alcancia_asignada = childSnapshot.val().asignada_usuario;
                data_alcancia = childSnapshot.val();
              });

              let num_alcancia = Object.getOwnPropertyNames(snapshot.val())[0];

              alcancias_validadas.push(
                snapshot.val()[Object.keys(snapshot.val())]
              );
              firebase
                .database()
                .ref(`/Alcancias/${num_alcancia}`)
                .update({
                  asignada_usuario: true,
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
                .ref(`/Users/${data.uid}/alcancias`)
                .once("value", snapshot => {
                  if (snapshot.val() === null) {
                     console.log('creando alcancías por primera vez...')
                     firebase
                       .database()
                       .ref(`/Users/${data.uid}/alcancias/${i}`)
                       .update({
                         alcancia_numero: data_alcancia.alcancia_numero,
                         asignada_externo: data_alcancia.asignada_externo,
                         asignada_tercero: data_alcancia.asignada_tercero,
                         asignada_usuario: true,
                         codigo_barra: data_alcancia.codigo_barra,
                         fecha_asignacion: moment().format(
                           "MM-DD-YYYY h:mm:ss a"
                         ),
                         fecha_recuperacion: "",
                         fecha_reinicio: "",
                         monto_recaudad: "",
                         recuperada: false,
                         reset: false,
                       });
                   } else {
                     console.log('el usuario tiene alcancias, ahora se le actualizan con las nuevas')
                     let aux_array = [];
                     aux_array.push(snapshot.val());
                     aux_array = aux_array.flat();
                     firebase
                       .database()
                       .ref(`/Users/${data.uid}/alcancias/${aux_array.length}`)
                       .update({
                         alcancia_numero: data_alcancia.alcancia_numero,
                         asignada_externo: data_alcancia.asignada_externo,
                         asignada_tercero: data_alcancia.asignada_tercero,
                         asignada_usuario: true,
                         codigo_barra: data_alcancia.codigo_barra,
                         fecha_asignacion: moment().format(
                           "MM-DD-YYYY h:mm:ss a"
                         ),
                         fecha_recuperacion: "",
                         fecha_reinicio: "",
                         monto_recaudad: "",
                         recuperada: false,
                         reset: false,
                       });
                   }
                })

            }
            if(alcancias_validadas.length - 1 == i) {
              Swal.fire({
                icon: 'success',
                title: 'Asignación Correcta!',
                text: 'La asignación de alcancía ha finalizado con éxito. ¿Desea descargar el acta de entrega?',
                showCancelButton: true,
                confirmButtonText: `Si, descargar`,
                cancelButtonText: 'No'
              }).
                then(result => {
                  setLoadingFirebaseWriting(false)
                  if(result.isConfirmed){
                    generatePdfDocument(alcancias_firebase, data)
                  }
                });
            }
          })
        });


      

      // setTimeout(() =>{
      //     console.log(alcancias_validadas)
      //     if(alcancias_validadas.length == cantidad_inputs){
      //         console.log('llegamos...')
      //         alcancias_validadas.map(alcancia => {
      //             firebase.database().ref().child(`/Alcancias/${(parseInt(alcancia.alcancia_numero) - 1)}/`).update({
      //                 asignada_usuario: true
      //             });
      //             firebase.database().ref().child(`/Users/${data.uid}/`).update({
      //                 alcancias:{
      //                     alcancia_numero: alcancia.alcancia_numero,
      //                     asignada_externo: alcancia.asignada_externo,
      //                     asignada_tercero: alcancia.asignada_tercero,
      //                     asignada_usuario: true,
      //                     codigo_barra: alcancia.codigo_barra,
      //                     fecha_asignacion: moment().format('MM-DD-YYYY h:mm:ss a'),
      //                     fecha_recuperacion: "",
      //                     fecha_reinicio: "",
      //                     monto_recaudad: "",
      //                     recuperada: false,
      //                     reset: false

      //                 }
      //             })
      //         })
      //     }
      //     setAlertExitoShow(true)
      // },2000)

      // setTimeout(() => {
      //     setAlertExitoShow(false);
      // }, 5479);
    } else if (checkIfArrayIsUnique(alcancias_firebase) == false) {
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

    //     firebase.database().ref(`/Users/${data.uid}/alcancias`).once('value')
    //     .then(snapshot => {
    //         if(snapshot.val()){
    //             snapshot.forEach(childSnapshot => {
    //                 alcanciasToArray.push(childSnapshot.val())
    //             });
    //             firebase.database().ref(`/Users/${data.uid}`).update({alcancias:alcanciasToArray})
    //         }else{
    //             firebase.database().ref(`/Users/${data.uid}`).update({alcancias:alcanciasToArray});
    //         }
    //     })
    // })
  };
  const handleEntregaAlcancia = (tipo_tabla) => {
    if (tipo_tabla === "asignar") {
      setRadioValue(0);
    }
    if (tipo_tabla === "detalle") {
      setRadioValue(1);
    }
  };
  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Asignar Alcancías</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <Form.Check
                inline
                name={`asignar_alcancia`}
                type={"radio"}
                id={`asignar`}
                label={`Asignar`}
                defaultChecked
                onChange={(e) => handleEntregaAlcancia(e.target.id)}
              />
              <Form.Check
                inline
                name={`asignar_alcancia`}
                type={"radio"}
                id={`detalle`}
                label={`Detalle`}
                onChange={(e) => handleEntregaAlcancia(e.target.id)}
              />
            </FormGroup>
          </Form>
          {radioValue == 0 ? (
            <Form onSubmit={asignarAlcancias} id="formEntregarAlcancias">
              <Form.Group>
                <Form.Label>
                  ¿Cuantas Alcancías va a asignarle a <b>{data.nombre}</b> ?
                </Form.Label>
                <Form.Control
                  name="cant_alcancias"
                  type="number"
                  placeholder="Ingrese la cantidad de alcancias."
                  min="1"
                  max="50"
                  onChange={(e) => setCantAlcancias(e.target.value)}
                />
              </Form.Group>
              {
                //Immediately-invoked function expression (IIFE).
                (() => {
                  const inputs = [];
                  for (let i = 0; i < cantAlcancias; i++) {
                    inputs.push(
                      <Form.Group key={i + 1}>
                        <Form.Label>Alcancia Nro. {i + 1}:</Form.Label>
                        <Form.Control
                          name={`alcancia_nro${i + 1}`}
                          ref={(el) => (inputEl.current[i] = el)}
                          type="text"
                          placeholder="Ingrese el código de barra de la alcancía a entregar."
                          onKeyPress={(e) => {
                            handleAlcancia(e.target.value, i, e.key);
                            setValueAlcancia([...valueAlcancia, e.target.name]);
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
                {loadingFirebaseWriting ? <Spinner animation="border" /> : 'Asignar'}
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
                Existen Códigos duplicados, por favor verifique.
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
            </Form>
            
          ) : (
            <DetalleUsuarioAlcancias data={data} />
          )}
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
              El código: {codigoError}. No existe o esta mal ingresado. Favor
              corroborar.
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

export default EntregarAlcancias;
