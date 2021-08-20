import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import firebase from "../../../Config/Firebase";
import TableTalonarios from "./TableTalonarios";

const Talonarios = ({ subtipo, uid }) => {
  const [talonarios, setTalonarios] = useState("EMPTY");
  console.log(subtipo);
  useEffect(() => {
    const fb = firebase
      .database()
      .ref("/Talonarios")
      .on("value", (snapshot) => {
        snapshot.val()
          ? setTalonarios(snapshot.val())
          : setTalonarios("NO_DATA_FOUND");
      })
    

    return () => fb;
  }, []);

  // const generarTalonarios = (secuencia, cantidad) => {
  //   let talonarios_generados = [];
  //   let numero_bonos = 1;
  //   for (let i = 0; i < cantidad; i++) {
  //     // numero_bonos = numero_bonos + secuencia;
  //     talonarios_generados[talonarios_generados.length] = {
  //       correlativo: ((i + 1) * secuencia).toString(),
  //       asignado_usuario: false,
  //       asignado_tercero: false,
  //       asignado_externo: false,
  //       monto_recaudado: "",
  //       talonario_numero: i + 1,
  //     };
  //       firebase.database().ref(`Talonarios/${i}`).set(talonarios_generados[i]);
  //   }
  //   console.log(`Se han generado: ${talonarios_generados.length} talonarios.`);
  // };

  // const desAsociarTalonarios = () => {
  //   const keysTalonarios = [];
  //   firebase
  //     .database()
  //     .ref('Users')
  //     .once("value", snapshot => {
  //       snapshot.forEach((data) => {
  //         if (data.val().talonarios) {
  //           console.log(data.val());
  //           keysTalonarios.push(data.key);
  //         }
  //       });
  //     });
  //   keysTalonarios.forEach((key) => {
  //     firebase.database().ref().child(`Users/${key}/talonarios`).remove();
  //   });
  // };

  if (subtipo === "Admin") {
    return (
      <div className="dash_content">
        <Row>
          <h1>Talonarios:</h1>
           {/* <Button
            className="ml-auto"
            variant="danger"
            onClick={() => generarTalonarios(20, 15000)}
          >
            Generar Talonarios
          </Button>
          <Button
            className="ml-auto"
            variant="secondary"
            onClick={() => desAsociarTalonarios()}
          >
            Desasociar Talonarios
          </Button> */}
        </Row>
        <div>
          {talonarios !== "EMPTY" ? (
            <TableTalonarios talonarios={talonarios} />
          ) : (
            <h6>Cargando...</h6>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="dash_content">
        <br />
        <h2>No tiene permitido ingresar a esta area.</h2>
      </div>
    );
  }
};

export default Talonarios;
