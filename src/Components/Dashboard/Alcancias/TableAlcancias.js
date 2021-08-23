import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import {
  OverlayTrigger,
  Tooltip,
  Button,
  Col,
  Row,
  Form, } from "react-bootstrap";
import { InfoAlcancia } from "./InfoAlcancia";
import RecepcionarAlcancias from "./RecepcionarAlcancias";
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

const TableAlcancias = ({ alcancias }) => {
  const [showAlcancia, setShowAlcancia] = useState(false);
  const [showRecepcionarAlcancias, setShowRecepcionarAlcancias] =
    useState(false);
  // const [loading, setLoading] = useState(true);
  const [alcanciasData, setAlcanciasData] = useState(null);
  let alcanciasToArray = [];

  const columns = [
    {
      name: "Número",
      selector: "alcancia_numero",
      sortable: true,
      width: "7.5%",
    },
    {
      name: "Código de barra",
      selector: "codigo_barra",
      sortable: true,
      width: "12%",
    },
    {
      name: "Asignada",
      selector: "asignada_usuario",
      cell: (alcancias) => {
        return `${alcancias.asignada_usuario ? "Si" : "No"}`;
      },
      sortable: true,
      width: "8%",
    },
    {
      name: "Asignada a tercero",
      selector: "asignada_tercero",
      cell: (alcancias) => {
        return `${alcancias.asignada_tercero ? "Si" : "No"}`;
      },
      sortable: true,
      width: "8%",
    },
    {
      name: "Asignada a externo",
      selector: "asignada_externo",
      cell: (alcancias) => {
        return `${alcancias.asignada_externo ? "Si" : "No"}`;
      },
      sortable: true,
      width: "8%",
    },
    {
      name: "Recuperada",
      selector: "recuperada",
      cell: (alcancias) => {
        return `${alcancias.recuperada ? "Si" : "No"}`;
      },
      sortable: true,
      width: "8%",
    },
    {
      name: "Recepción Encargado",
      selector: 'recepcionado',
      cell : (alcancias) => {
        return `${alcancias.recepcionado ? "Si" : "No"}`
      }
    },
    {
      name: "Fecha",
      selector: "fecha_asignacion",
      cell: (alcancias) => {
        return `${
          alcancias.fecha_entrega ? alcancias.fecha_entrega : "N.A"
        }`;
      },
      sortable: true,
      width: "15%",
    },
    {
      name: "Encargado(a)",
      selector: "nombre",
      cell: alcancias => {
        return alcancias.usuario ? `${alcancias.usuario.nombre} ${alcancias.usuario.apellido}`: 'N.A.'
      },
      sortable: true,
      width: "15%"
    },
    {
      name: "Control",
      button: true,
      width: "5%",
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
                  setShowAlcancia(true);
                  setAlcanciasData(data);
                }}
              >
                <i
                  className="fas fa-fw fa-search fa-lg"
                  style={{ width: "35px", height: "20px" }}
                />
              </div>
            </OverlayTrigger>
            {/* <OverlayTrigger
              id={"desasociar"}
              placement={"right"}
              overlay={
                <Tooltip id={"tooltip-bottom"}>
                  <strong>Desasociar</strong>
                </Tooltip>
              }
            >
              <div
                style={{ cursor: "pointer" }}
                className="text-danger"
                onClick={() => {
                  console.log(data);
                }}
              >
                <i
                  className="fas fa-undo-alt fa-lg"
                  style={{ width: "35px", height: "20px" }}
                />
              </div>
            </OverlayTrigger> */}
          </div>
        );
      },
    },
  ];

  Object.keys(alcancias).forEach((key, i) => {
    alcanciasToArray[i] = alcancias[key];
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
                <option value="codigo_barra">Codigo de barra</option>
                <option value="nombre">Nombre</option>
                {/* <option value="alcancia_numero">Numero de alcancia</option>
                <option value="asignada_usuario">Asignada</option>
                <option value="recuperada">Recuperada</option> */}
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

  const [filter, setFilter] = useState("codigo_barra");

  const filteredItems = alcanciasToArray.filter((item) => {
    if (filter === "codigo_barra") {
      return (
        item.codigo_barra.toLowerCase() &&
        item.codigo_barra.toLowerCase().includes(filterText.toLowerCase())
      );
      // } else if (filter === "alcancia_numero") {
      //   return item.alcancia_numero;
      // } else if (filter === "asignada_usuario") {
      //   return (
      //     item.asignada_usuario.toLowerCase() &&
      //     item.asignada_usuario.toLowerCase().includes(filterText.toLowerCase())
      //   );
      // } else if (filter === "recuperada") {
      //   return (
      //     item.recuperada &&
      //     item.recuperada.includes(filterText)
      //   );
    }else if(filter === "nombre"){
      if(item.usuario){
        return (
          item.usuario.nombre.toLowerCase() &&
          item.usuario.nombre.toLowerCase().includes(filterText.toLocaleLowerCase())
        )
      }
    }
  });

  return (
    <>
      <Button
        variant="danger"
        onClick={() => setShowRecepcionarAlcancias(true)}
      >
        Recepcionar Alcancías
      </Button>
      <DataTableExtensions
        columns={columns}
        data={filteredItems}
        filter={false}
        exportHeaders={true}
        print={false}>
        <DataTable
          fixedHeader
          loading={alcancias}
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
      <InfoAlcancia
        show={showAlcancia}
        onHide={() => setShowAlcancia(false)}
        data={alcanciasData}
      />
      <RecepcionarAlcancias
        show={showRecepcionarAlcancias}
        onHide={() => setShowRecepcionarAlcancias(false)}
      />
    </>
  );
};

export default TableAlcancias;
