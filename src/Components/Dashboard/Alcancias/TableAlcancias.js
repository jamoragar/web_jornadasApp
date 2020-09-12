import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {InfoAlcancia} from './InfoAlcancia'

const TableAlcancias = ({ alcancias }) => {
	const [showAlcancia, setShowAlcancia] = useState(false);
	const [alcanciasData, setAlcanciasData] = useState(null);
	let alcanciasToArray = [];

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
			width: "10%",
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
