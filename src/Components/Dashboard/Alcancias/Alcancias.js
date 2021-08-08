import React, { useState, useEffect } from "react";
import { Row, Button } from "react-bootstrap";
import firebase from "../../../Config/Firebase";
import TableAlcancias from "./TableAlcancias";

const Alcancias = ({ subtipo, uid }) => {
  var usedNums = new Array(76);
  const [alcancias, setAlcancias] = useState("EMPTY");
  let alcancias_generadas = [];

  useEffect(() => {
    const fbDatabase = firebase
      .database()
      .ref("/Alcancias")
      .on("value", (snapshot) => {
        snapshot.val()
          ? setAlcancias(snapshot.val())
          : setAlcancias("NO_DATA_FOUND");
      });

      return () => fbDatabase;
  }, []);

  // const eanCheckDigit = (s) => {
  //   let result = 0;
  //   for (let counter = s.length - 1; counter >= 0; counter--) {
  //     result = result + parseInt(s.charAt(counter)) * (1 + 2 * (counter % 2));
  //   }
  //   return (10 - (result % 10)) % 10;
  // };

  // const generarAlcancias = (secuencia, cantidad) => {
  //   let k = 1;
  //   const codBarra = "980201100000"; // Aquì inician los còdigos

  //   for (let i = 0; i < cantidad; i++) {
  //     let genCodBarra = parseInt(codBarra) + k;
  //     alcancias_generadas[alcancias_generadas.length] = {
  //       alcancia_numero: i + 1,
  //       codigo_barra:
  //         genCodBarra.toString() + eanCheckDigit(genCodBarra.toString()),
  //       asignada_usuario: false,
  //       asignada_externo: false,
  //       asignada_tercero: false,
  //       monto_recaudad: "",
  //     };

  //     firebase.database().ref(`/Alcancias/${i}`).set(alcancias_generadas[i]);

  //     k = k + secuencia;
  //   }
  //   console.log(alcancias_generadas);
  // };

  // const desAsociarAlcancias = () => {
  //   const keysConAlcancia = [];
  //   firebase
  //     .database()
  //     .ref()
  //     .child("Users")
  //     .on("value", (snapshot) => {
  //       snapshot.forEach((data) => {
  //         if (data.val().alcancias) {
  //           console.log(data.val())
  //           keysConAlcancia.push(data.key);
  //         }
  //       });
  //     });
  //   console.log(keysConAlcancia);
  //   keysConAlcancia.forEach((key) => {
  //     firebase.database().ref().child(`Users/${key}/alcancias`).remove();
  //   });
  //   firebase.database().ref().child('Alcancias').remove();
  // };

  // FUNCIÓN QUE DADO UN ARRAY DE ALCANCÍAS, LAS LOCALIZA Y ELIMINA EL USUARIO ASIGNADO A ESTA, LA FECHA DE ASIGNACIÓN Y EL ESTADO ASIGNADO
  // const eliminarAsignacionMala = () => {
  //   const arrayDeAlcancias = [
  //       "9802011001042",
  //       "9802011004029",
  //       "9802011004074",
  //       "9802011005569",
  //       "9802011005781"
  //   ];

  //   const ref = firebase.database().ref('Alcancias')

  //   arrayDeAlcancias.forEach((alcancia, i) => {
  //     ref.orderByChild('codigo_barra').equalTo(alcancia).once("value", snapshot => {
  //       const indice = parseInt(Object.keys(snapshot.val()));
  //       ref.child(`${indice}/fecha_entrega`).remove();
  //       ref.child(`${indice}/usuario`).remove();
  //       ref.child(`${indice}/asignada_usuario`).set(false);
  //     });
  //   });
  // };

  if (subtipo === "Admin") {
    return (
      <div className="dash_content">
        <Row>
          <h1>Alcancías:</h1>
          {/* <Button className='ml-auto' variant='danger' onClick={() => {generarAlcancias(1, 6000)}}>Generar Alcancías</Button>
          <Button className="ml-auto" variant="secondary" onClick={() => desAsociarAlcancias()}>Desasociar Alcancía</Button> */}
          {/* <Button className="ml-auto" variant="secondary" onClick={() => eliminarAsignacionMala()}>Desasociar alcancias con error</Button> */}
        </Row>
        <div>
          {alcancias !== "EMPTY" ? (
            <TableAlcancias alcancias={alcancias} />
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

export default Alcancias;
