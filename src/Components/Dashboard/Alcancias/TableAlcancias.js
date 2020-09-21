import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {InfoAlcancia} from './InfoAlcancia'

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


	return (
		<>
		<DataTable
			columns={columns}
			data={alcanciasToArray}
			fixedHeader
			loading={alcancias}
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
