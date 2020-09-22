import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { InfoDonacion } from "./InfoDonacion";
import styled from 'styled-components';


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
      <TextField id="search" type="text" placeholder="Nombre" aria-label="Search Input" value={filterText} onChange={onFilter} />
    <ClearButton type="button" onClick={onClear}>Limpiar</ClearButton>
    </>
  );
};

const TableDonaciones = ({ donaciones }) => {
  const [showDonacion, setShowDonacion] = useState(false);
  const [donacionData, setDonacionData] = useState(null);
  let donacionesToArray = [];

  const columns = [
    {
      name: "Orden de compra",
      selector: "numero_orden",
      sortable: true,
      width: "15%",
    },
    {
      name: "Nombre",
      selector: (donaciones) => {
        return `${donaciones.nombre} ${
          donaciones.apellido ? donaciones.apellido : ""
        }`;
      },
      sortable: true,
      width: "20%",
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      width: "17.5%",
    },
    {
      name: "Aporte",
      selector: "aporte",
      sortable: true,
      width: "10%",
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
      width: "10%",
    },
    {
      name: "Fecha",
      selector: "fecha",
      sortable: true,
      width: "15%",
    },
    {
      name: "Control",
      button: true,
      width: "20%",
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
                  setShowDonacion(true);
                  setDonacionData(data);
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
  Object.keys(donaciones).forEach((key, i) => {
    donacionesToArray[i] = donaciones[key];
  });

  const [filterText, setFilterText] = useState("");

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText]);

  const filteredItems = donacionesToArray.filter(
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
        paginationRowsPerPageOptions={[20, 40, 50, 100]}
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página",
          rangeSeparatorText: "de",
          selectAllRowsItem: true,
          selectAllRowsItemText: "Todo",
        }}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        highlightOnHover
      />
      <InfoDonacion
        show={showDonacion}
        onHide={() => setShowDonacion(false)}
        data={donacionData}
      />
    </>
  );
};

export default TableDonaciones;
