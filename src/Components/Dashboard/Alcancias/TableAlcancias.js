import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { OverlayTrigger, Tooltip, Col, Form, Button } from "react-bootstrap";
import {InfoAlcancia} from './InfoAlcancia'
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
      <TextField id="search" type="text" placeholder="Codigo de barra" aria-label="Search Input" value={filterText} onChange={onFilter} />
    <ClearButton type="button" onClick={onClear}>Limpiar</ClearButton>
    </>
  );
};

const TableAlcancias = ({ alcancias }) => {
	const [showAlcancia, setShowAlcancia] = useState(false);
	const [loading, setLoading] = useState(true);
	const [alcanciasData, setAlcanciasData] = useState(null);
	let alcanciasToArray = [];
	console.log(alcancias)
	const columns = [
		{
			name: "Numero de alcancia",
			selector: "alcancia_numero",
			sortable: true,
			width: "7.5%",
        },
        {
			name: "Codigo de barra",
			selector: "codigo_barra",
			sortable: true,
			width: "20%",
		},
		{
			name: "Asignada",
			selector: (alcancias) => { return `${alcancias.asignada_usuario? 'Si':'No'}`
			},
			sortable: true,
			width: "10%",
		},
		{
			name: "Asignada a tercero",
			selector:  (alcancias) => { return `${alcancias.asignada_tercero? 'Si':'No'}`
        },
			sortable: true,
			width: "10%",
		},
		{
			name: "Asignada a externo",
			selector:  (alcancias) => { return `${alcancias.asignada_externo? 'Si':'No'}`
        },
			sortable: true,
			width: "10%",
		},
		{
			name: "Recuperada",
			selector: (alcancias) => { return `${alcancias.recuperada? 'Si':'No'}`
        },
			sortable: true,
			width: "10%",
		},
		{
			name: "Fecha",
			selector: (alcancias) => { return `${alcancias.fecha_asignacion? 'Si':'N.A'}`
        },
			sortable: true,
			width: "15%",
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
		  <FilterComponent
			onFilter={(e) => setFilterText(e.target.value)}
			onClear={handleClear}
			filterText={filterText}
		  />
	  );
	}, [filterText]);
  
	  const filteredItems = alcanciasToArray.filter(
    (item) =>
      item.codigo_barra &&
      item.codigo_barra.includes(filterText)
  );


	return (
		<>
		<DataTable
			columns={columns}
			data={filteredItems}
			fixedHeader
			loading={alcancias}
			fixedHeaderScrollHeight="500px"
			pagination
			paginationRowsPerPageOptions={[50,100,200]}
			paginationComponentOptions={{
				rowsPerPageText: "Filas por página",
				rangeSeparatorText: "de",
			}}
			paginationPerPage={50}
			subHeader
			subHeaderComponent={subHeaderComponentMemo}
			persistTableHead
			highlightOnHover
		/>
		<InfoAlcancia
			show={showAlcancia}
			onHide={() => setShowAlcancia(false)}
			data={alcanciasData}
		/>
		</>
	);
	
};

export default TableAlcancias;
