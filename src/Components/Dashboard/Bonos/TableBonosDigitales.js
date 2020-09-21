import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import { OverlayTrigger, Tooltip, Form, Button, Col } from "react-bootstrap";
import { InfoBono } from "./InfoBono";

const FilterComponent = ({ filterText, onFilter, onClear }) => {
  return (
    <>
      <Col>
        <Form>
          <Form.Group>
            <Form.Control
              id="search"
              type="text"
              placeholder="Buscar por nombre"
              value={filterText}
              onChange={onFilter}
            />
          </Form.Group>
        </Form>
      </Col>
      <Col>
        <Button type="button" onClick={onClear}>
          Limpiar
        </Button>
      </Col>
    </>
  );
};

const TableBonosDigitales = ({ bonosSorteo }) => {
  const [showBono, setShowBono] = useState(false);
  const [bonoData, setBonoData] = useState(null);
  const [filtrarPor, setFiltrarPor] = useState("nombre"); //se guarda la informacion de select del formulario de "filtrar por:"
  let bonosSorteoToArray = [];
  console.log(filtrarPor);

  const columns = [
    {
      name: "Orden de compra",
      selector: "numero_orden",
      sortable: true,
      width: "15%",
    },
    {
      name: "Nombre",
      selector: (bonosSorteo) => {
        return `${bonosSorteo.nombre} ${
          bonosSorteo.apellido ? bonosSorteo.apellido : ""
        }`;
      },
      sortable: true,
      width: "15%",
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      width: "15%",
    },
    {
      name: "Telefono",
      selector: "telefono",
      sortable: true,
      width: "10%",
    },
    {
      name: "Cantidad",
      selector: "cantidad",
      sortable: true,
      width: "5%",
    },
    {
      name: "Estado del pago",
      selector: "estado_de_pago",
      sortable: true,
      width: "10%",
    },
    {
      name: "Plataforma",
      selector: "plataforma",
      sortable: true,
      width: "5%",
    },
    {
      name: "Fecha",
      selector: "fecha",
      sortable: true,
      width: "10%",
    },
    {
      name: "Control",
      button: true,
      width: "10%",
      cell: (data) => {
        return (
          <div style={{ display: "flex" }}>
            <OverlayTrigger
              id={"ver"}
              placement={"left"}
              overlay={
                <Tooltip id={"tooltip-bottom"}>
                  <strong>Ver</strong>
                </Tooltip>
              }
            >
              <div
                style={{ cursor: "pointer" }}
                className="text-success"
                onClick={() => {
                  setShowBono(true);
                  setBonoData(data);
                }}
              >
                <i
                  className="fas fa-fw fa-search fa-lg"
                  style={{ width: "35px", height: "20px" }}
                />
              </div>
            </OverlayTrigger>
          </div>
        );
      },
    },
  ];

  Object.keys(bonosSorteo).forEach((key, i) => {
    bonosSorteoToArray[i] = bonosSorteo[key];
  });

  const [filterText, setFilterText] = useState("");

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText("");
      }
    };
    return (
      <>
        <Col>
          <p>Seleccione Filtro:</p>
        </Col>
        <Col>
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control
                name="filtrar"
                as="select"
                onChange={(e) => setFiltrarPor(e.target.value)}
              >
                <option value="orde_de_compra">Orden De Compra</option>
                <option value="nombre">Nombre</option>
                <option value="email">Email</option>
                <option value="telefono">Telefono</option>
                <option value="estado_de_pago">Estado De Pago</option>
                <option value="plataforma">Plataforma</option>
                <option value="fecha">Fecha</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      </>
    );
  }, [filterText]);

  const filteredItems = bonosSorteoToArray.filter(
    (item) =>
      item.nombre.toLowerCase() &&
      item.nombre.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={filteredItems}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        pagination
        paginationRowsPerPageOptions={[1000]}
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página",
          rangeSeparatorText: "de",
          // selectAllRowsItem: true,
          // selectAllRowsItemText: "Todo",
        }}
        paginationPerPage={1000}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        highlightOnHover
      />
      <InfoBono
        show={showBono}
        onHide={() => setShowBono(false)}
        data={bonoData}
      />
    </>
  );
};

export default TableBonosDigitales;
