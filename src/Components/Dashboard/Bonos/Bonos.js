import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { Spinner, Row, Form, FormGroup } from "react-bootstrap";
import axios from "axios";
import TableBonosDigitales from "./TableBonosDigitales";
import TableBonosManuales from "./TableBonosManuales";

const BonosRifa = ({ subtipo }) => {
  const [bonosSorteo, setBonosSorteo] = useState("EMPTY");
  const [radioValue, setRadioValue] = useState("transbank");

  const API_TRANSBANK = 'https://www.appjornadasmagallanicas.cl/api/api/obtieneBonosVendidos';
  const API_MANUAL = 'https://www.appjornadasmagallanicas.cl/api/api/obtieneBonosManuales';
  // const API_TRANSBANK = "http://127.0.0.1:8000/api/obtieneBonosVendidos";
  // const API_MANUAL = "http://127.0.0.1:8000/api/obtieneBonosManuales";

  useEffect(() => {
    // firebase.database().ref('/Bono_digital').on('value', snapshot => {
    //         snapshot.val() ? setBonosSorteo(snapshot.val()) : setBonosSorteo('NO_DATA_FOUND')
    //     });
    axios.get(`${API_TRANSBANK}`).then((res) => {
      setBonosSorteo(res.data);
    });
  }, []);

  const handleTableData = (tipo_tabla) => {
    if (tipo_tabla === "transbank") {
      axios.get(`${API_TRANSBANK}`).then((res) => {
        setRadioValue(tipo_tabla);
        setBonosSorteo(res.data);
      });
    }
    if (tipo_tabla === "manual") {
      axios.get(`${API_MANUAL}`).then((res) => {
        setRadioValue(tipo_tabla);
        setBonosSorteo(res.data);
      });
    }
    console.log("cargando: ", tipo_tabla);
  };

  if (bonosSorteo !== "EMPTY") {
    if (subtipo === "Admin") {
      return (
        <div className="dash_content">
          <Row>
            <h1>Bonos Digitales:</h1>
            <br />
          </Row>
          <Row>
            <Form>
              <FormGroup>
                <Form.Check
                  inline
                  name={`check_table`}
                  type={"radio"}
                  id={`transbank`}
                  label={`Transbank`}
                  defaultChecked
                  onChange={(e) => handleTableData(e.target.id)}
                />
                <Form.Check
                  inline
                  name={`check_table`}
                  type={"radio"}
                  id={`manual`}
                  label={`Venta Manual`}
                  onChange={(e) => handleTableData(e.target.id)}
                />
              </FormGroup>
            </Form>
          </Row>
          <div>
            {radioValue === "transbank" ? (
              <TableBonosDigitales bonosSorteo={bonosSorteo} />
            ) : (
              <TableBonosManuales bonosSorteo={bonosSorteo} />
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
  } else {
    return (
      <div className="dash_content">
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
      </div>
    );
  }
};

export default BonosRifa;
