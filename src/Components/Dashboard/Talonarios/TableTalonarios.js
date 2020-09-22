import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { OverlayTrigger, Tooltip, Col, Form, Button } from "react-bootstrap";
import { InfoTalonario } from "./InfoTalonario";
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
      <TextField id="search" type="text" placeholder="correlativo" aria-label="Search Input" value={filterText} onChange={onFilter} />
    <ClearButton type="button" onClick={onClear}>Limpiar</ClearButton>
    </>
  );
};

const TableAlcancias = ({ talonarios }) => {
  const [showTalonario, setShowTalonario] = useState(false);
  const [talonariosData, setTalonariosData] = useState(null);
  let talonariosToArray = [];




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

  const filteredItems = talonariosToArray.filter(
    (item) =>
      item.talonario_numero &&
      item.talonario_numero.includes(filterText)
  );

	return (
		<>
			<DataTable
				columns={columns}
				data={filteredItems}
				fixedHeader
				fixedHeaderScrollHeight="500px"
				pagination
				paginationRowsPerPageOptions={[50,100]}
				paginationComponentOptions={{
					rowsPerPageText: "Filas por página",
					rangeSeparatorText: "de",
				}}
				loading={talonarios}
				paginationPerPage={50}
				subHeader
				subHeaderComponent={subHeaderComponentMemo}
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
