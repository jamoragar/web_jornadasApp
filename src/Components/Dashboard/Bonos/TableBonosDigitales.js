import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import moment from "moment";
import {
  OverlayTrigger,
  Tooltip,
  Button,
  Col,
  Row,
  Form,
} from "react-bootstrap";
import { InfoBono } from "./InfoBono";
import styled from "styled-components";

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 32px;
  width: 80px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => {
  return (
    <>
      <TextField
        id="search"
        type="text"
        placeholder="Busqueda..."
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <ClearButton type="button" onClick={onClear}>
        Limpiar
      </ClearButton>
    </>
  );
};

const TableBonosDigitales = ({ bonosSorteo }) => {
  const [showBono, setShowBono] = useState(false);
  const [bonoData, setBonoData] = useState(null);

  // const radios = [
  //   { name: "Transbank", value: "1" },
  //   { name: "Manuales", value: "2" },
  // ];

  let bonosSorteoToArray = [];

  const columns = [
    {
      name: "Orden de compra",
      selector: "buy_order",
      sortable: true,
      width: "14%",
    },
    {
      name: "Nombre",
      selector: "apellido",
      cell: bonosSorteo => {
        return `${bonosSorteo.nombre} ${
          bonosSorteo.apellido ? bonosSorteo.apellido : ""
        }`;
      },
      sortable: true,
      width: "12%",
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      width: "16%",
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
      width: "6%",
    },
    {
      name: "Estado",
      selector: "responseCode",
      cell: bonosSorteo => {
        switch (bonosSorteo.responseCode) {
          case "0":
            return "Aprobada";
          case "-1":
            return "Rechazo";
          case "-2":
            return "Rechazo";
          case "-3":
            return "Rechazo";
          case "-4":
            return "Rechazo";
          case "-5":
            return "Rechazo";
          default:
            return "Desconocido";
        }
      },
      sortable: true,
      width: "8%",
    },
    {
      name: "Plataforma",
      selector: "sessionId",
      cell: bonosSorteo => {
        if (
          bonosSorteo.sessionId === "BonoSorteoApp" ||
          bonosSorteo.sessionId === "DonacionApp"
        ) {
          return "App";
        } else {
          return "Web";
        }
      },
      sortable: true,
      width: "6%",
    },
    {
      name: "Metodo",
      selector: "paymentType",
      width: "5%"
    },
    {
      name: "Fecha",
      selector: "transactionDate",
      cell: bonosSorteo => {
        return moment(bonosSorteo.transactionDate).format("DD-MM-YYYY hh:mm");
      },
      sortable: true,
      width: "12%",
    },
    {
      name: "Control",
      button: true,
      width: "3%",
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
      <div>
        <Row>
          <Col>
            <p className="mt-2">Seleccione Filtro:</p>
          </Col>
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control
                as="select"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="nombre">Nombre</option>
                <option value="email">Email</option>
                <option value="numero_orden">Orden de compra</option>
                <option value="fecha">Fecha</option>
                <option value="estado_de_pago">Estado de Pago</option>
                {/* <option value="tipo">Tipo</option> */}
              </Form.Control>
            </Form.Group>
          </Form>
        </Row>
        <Row>
          <FilterComponent
            onFilter={(e) => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
          />
        </Row>
      </div>
    );
  }, [filterText]);

  const [filter, setFilter] = useState("nombre");

  const filteredItems = bonosSorteoToArray.filter((item) => {
    if (filter === "numero_orden") {
      return (
        item.buy_order.toLowerCase() &&
        item.buy_order.toLowerCase().includes(filterText.toLowerCase())
      );
    } else if (filter === "nombre") {
      try {
        return (
          item.nombre.toLowerCase() &&
          item.nombre.toLowerCase().includes(filterText.toLowerCase())
        );
      } catch (error) {
        console.log(bonosSorteoToArray);
        console.warn(error);
      }
    } else if (filter === "email") {
      return (
        item.email.toLowerCase() &&
        item.email.toLowerCase().includes(filterText.toLowerCase())
      );
    } else if (filter === "fecha") {
      return item.transactionDate && item.transactionDate.includes(filterText);
    } else if (filter === "estado_de_pago") {
      return (
        item.responseCode.toLowerCase() &&
        item.responseCode.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    // else if (filter === "tipo") {
    //   return (
    //     item.tipo &&
    //     item.tipo.includes(filterText)
    //   );
    // }
  });

  return (
    <>
    <DataTableExtensions
      columns={columns}
      data={filteredItems}
      filter={false}
			exportHeaders={true}
			print={false}
      >
      <DataTable
        fixedHeader
        fixedHeaderScrollHeight="500px"
        pagination
        paginationRowsPerPageOptions={[50, 100, 200]}
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página",
          rangeSeparatorText: "de",
        }}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        highlightOnHover
        paginationPerPage={50}
        />
    </DataTableExtensions>
      <InfoBono
        show={showBono}
        onHide={() => setShowBono(false)}
        data={bonoData}
      />
    </>
  );
};

export default TableBonosDigitales;
