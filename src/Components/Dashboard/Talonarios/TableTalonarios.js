import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { OverlayTrigger, Tooltip, Col, Form, Button } from "react-bootstrap";
import { InfoTalonario } from "./InfoTalonario";

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

const TableAlcancias = ({ talonarios }) => {
  const [showTalonario, setShowTalonario] = useState(false);
  const [talonariosData, setTalonariosData] = useState(null);
  const [filtrarPor, setFiltrarPor] = useState("nombre"); //se guarda la informacion de select del formulario de "filtrar por:"
  let talonariosToArray = [];

  const columns = [
    {
      name: "Numero de Talonario",
      selector: "talonario_numero",
      sortable: true,
      width: "7.5%",
    },
    {
      name: "correlativo",
      selector: "correlativo",
      sortable: true,
      width: "10%",
    },
    {
      name: "Asignado",
      selector: (talonarios) => {
        return `${talonarios.asignado_usuario ? "Si" : "No"}`;
      },
      sortable: true,
      width: "10%",
    },
    {
      name: "Asignado a tercero",
      selector: (talonarios) => {
        return `${talonarios.asignado_tercero ? "Si" : "No"}`;
      },
      sortable: true,
      width: "10%",
    },
    {
      name: "Asignado a externo",
      selector: (talonarios) => {
        return `${talonarios.asignado_externo ? "Si" : "No"}`;
      },
      sortable: true,
      width: "10%",
    },
    {
      name: "Recuperada",
      selector: (talonarios) => {
        return `${talonarios.recuperado ? "Si" : "No"}`;
      },
      sortable: true,
      width: "10%",
    },
    {
      name: "Fecha",
      selector: (talonarios) => {
        return `${talonarios.fecha_asignacion ? "Si" : "N.A"}`;
      },
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
                  setShowTalonario(true);
                  setTalonariosData(data);
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
  Object.keys(talonarios).forEach((key, i) => {
    talonariosToArray[i] = talonarios[key];
  });

//   const [filterText, setFilterText] = useState("");

//   const subHeaderComponentMemo = useMemo(() => {
//     const handleClear = () => {
//       if (filterText) {
//         setFilterText("");
//       }
//     };
//     return (
//       <>
//         <Col>
//           <p>Seleccione Filtro:</p>
//         </Col>
//         <Col>
//           <Form>
//             <Form.Group controlId="exampleForm.ControlSelect1">
//               <Form.Control
//                 name="filtrar"
//                 as="select"
//                 onChange={(e) => setFiltrarPor(e.target.value)}
//               >
//                 <option value="orde_de_compra">Orden De Compra</option>
//                 <option value="nombre">Nombre</option>
//                 <option value="email">Email</option>
//                 <option value="telefono">Telefono</option>
//                 <option value="estado_de_pago">Estado De Pago</option>
//                 <option value="plataforma">Plataforma</option>
//                 <option value="fecha">Fecha</option>
//               </Form.Control>
//             </Form.Group>
//           </Form>
//         </Col>
//         <FilterComponent
//           onFilter={(e) => setFilterText(e.target.value)}
//           onClear={handleClear}
//           filterText={filterText}
//         />
//       </>
//     );
//   }, [filterText]);

	const columns = [
		{
			name: "Numero de Talonario",
			selector: "correlativo",
			sortable: true,
			width: "7.5%",
		},
		{
			name: "correlativo",
			selector: "talonario_numero",
			sortable: true,
			width: "10%",
		},
		{
			name: "Asignado",
			selector: (talonarios) => { return `${talonarios.asignado_usuario? 'Si':'No'}`
			},
			sortable: true,
			width: "10%",
		},
		{
			name: "Asignado a tercero",
			selector:  (talonarios) => { return `${talonarios.asignado_tercero? 'Si':'No'}`
        },
			sortable: true,
			width: "10%",
		},
		{
			name: "Asignado a externo",
			selector:  (talonarios) => { return `${talonarios.asignado_externo? 'Si':'No'}`
        },
			sortable: true,
			width: "10%",
		},
		{
			name: "Recuperada",
			selector: (talonarios) => { return `${talonarios.recuperado? 'Si':'No'}`
        },
			sortable: true,
			width: "10%",
		},
		{
			name: "Fecha",
			selector: (talonarios) => { return `${talonarios.fecha_asignacion? 'Si':'N.A'}`
        },
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
									setShowTalonario(true);
									setTalonariosData(data);
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
	Object.keys(talonarios).forEach((key, i) => {
		talonariosToArray[i] = talonarios[key];
	});

	return (
		<>
			<DataTable
				columns={columns}
				data={talonariosToArray}
				fixedHeader
				fixedHeaderScrollHeight="500px"
				pagination
				paginationRowsPerPageOptions={[500]}
				paginationComponentOptions={{
					rowsPerPageText: "Filas por página",
					rangeSeparatorText: "de",
				}}
				loading={talonarios}
				paginationPerPage={500}
				subHeader
				persistTableHead
                highlightOnHover
			/>
			<InfoTalonario
				show={showTalonario}
				onHide={() => setShowTalonario(false)}
				data={talonariosData}
			/>
		</>
	);
};

export default TableAlcancias;
