import React, { useState } from "react";
import axios from "axios";
import { Spinner, Form, InputGroup, Button } from "react-bootstrap";
import Swal from "sweetalert2";

/*    ESTE COMPONENTE SE ENCARGA DE LA VENTA MANUAL DE BONOS DE SORTEO   */
const VentaBonos = (props) => {
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(false);
  const [checkbox, setCheckBox] = useState("efectivo");
  const valorBono = 1000;
  // const [numeroOrden, setNumeroOrden] = useState();
  let orderToArray = [];

  // const url = 'http://127.0.0.1:8000/api/';
  const url = "https://appjornadasmagallanicas.cl/api/api/";

  const handleRadioButtonChange = (e) => {
    setCheckBox(e);
  };

  const comprarBonos = (e) => {
    e.preventDefault();
    setLoading(true);

    const { nombre, apellido, email, cantidad_bonos, telefono, boucher, rut } = e.target.elements;
    console.log("efectuando venta...");
    axios({
      method: "post",
      url: url + "pagoManual",
      data: {
        uid: props.uid,
        nombre_vendedor: props.nombre,
        apellido_vendedor: props.apellido,
        tipo_pago: checkbox,
        cod_boucher: checkbox === "efectivo" ? null : boucher.value.trim(),
        cant_bonos: cantidad_bonos.value,
        monto_recaudado: valorBono * cantidad,
        nombre_cliente: nombre.value.trim(),
        apellido_cliente: apellido.value.trim(),
        email: email.value.trim(),
        rut: rut.value.trim(),
        telefono: telefono.value.trim(),
      },
    }).then((res) => {
      const oc = res.data
      setLoading(false);
      Swal.fire({
        icon: "success",
        title:
          "Venta realizada con éxito! ¿Desea descargar los bonos generados?",
        showDenyButton: true,
        confirmButtonText: `Si, quiero descargarlos`,
        denyButtonText: `No, quiero finalizar esta venta`,
      }).then((result) => {
        if (result.isConfirmed) {
          let data_zip = {
            nombre_cliente: nombre.value.trim(),
            apellido_cliente: apellido.value.trim(),
            orden_compra: oc,
          };
          console.log("descargar zip...");
          axios({
            method: "post",
            url: url + "zipBonosSorteo",
            data: data_zip,
            responseType: "blob",
          }).then(
            (response) => {
              const nombre_archivo = "Bonos_" + data_zip.nombre_cliente + "_" + data_zip.apellido_cliente + ".zip";
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", nombre_archivo); //or any other extension
              document.body.appendChild(link);
              link.click();
            },
            (err) => {
              console.warn(err);
            }
          );
          //logica para consumir servicio que retorna link para descargar...
          resetForm();
        } else if (result.dismiss === Swal.DismissReason.deny) {
          console.log("reiniciando form...");
          resetForm(nombre, apellido, email, telefono, boucher, rut);
        }
      });
      //     console.log(res);
    });
  };

  const resetForm = (nombre, apellido, email, telefono, boucher, rut) => {
    nombre.value = ''
    apellido.value = ''
    email.value = ''
    telefono.value = ''
    rut.value = ''
    if(boucher && boucher.value) boucher.value = '';
    setCantidad(1);
  };
  if (props.subtipo === "Admin") {
    return (
      <div className="dash_content">
        <h1>Venta Manual de Bonos</h1>
        <Form onSubmit={comprarBonos}>
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
              placeholder="Ingrese su e-mail"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rut:</Form.Label>
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
                max="100"
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
          <Form.Group>
            <Form.Check
              inline
              name={`check_categoria`}
              type={"radio"}
              id={`efectivo`}
              label={`Pago en Efectivo`}
              defaultChecked
              onChange={(e) => handleRadioButtonChange(e.target.id)}
            />
            <Form.Check
              inline
              name={`check_categoria`}
              type={"radio"}
              id={`tarjeta`}
              label={`Pago con Tarjeta`}
              onChange={(e) => handleRadioButtonChange(e.target.id)}
            />
            <br />
            <br />
            {checkbox === "efectivo" ? null : (
              <>
                <Form.Label>Número de comprobante:</Form.Label>
                <Form.Control
                  name="boucher"
                  type="text"
                  placeholder="Ingrese el número de comprobante del boucher"
                  required
                />
              </>
            )}
          </Form.Group>

          <Button color="success" block type="submit" disabled={loading}>
            {loading ? (
              <Spinner animation="border" />
            ) : (
              <>
                <b>${valorBono * cantidad}</b> Comprar
              </>
            )}
          </Button>
        </Form>
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

export default VentaBonos;
