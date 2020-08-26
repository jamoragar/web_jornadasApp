import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { InfoBono } from "./InfoBono";

const TableBonosDigitales = ({ bonosSorteo}) => {
	const [showBono, setShowBono] = useState(false);
	const [bonoData, setBonoData] = useState(null);
	let bonosSorteoToArray = [];

	const columns = [
		{
			name: "Orden de compra",
			selector: "numero_orden",
			sortable: true,
			width: "10%",
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
			name: "cantidad",
			selector: "cantidad",
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
			width: "10%",
        },
        {
            name:'Disponibilidad',
            selector: 'isAviable',
            sortable: false,
            width: "10%",
            cell: (data) => {
                return `${data.isAviable ? 'Disponible ': 'Vendido'}`
            }
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

	return (
		<>
			<DataTable
				columns={columns}
				data={bonosSorteoToArray}
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
			<InfoBono
				show={showBono}
				onHide={() => setShowBono(false)}
				data={bonoData}
			/>
		</>
	);
};

export default TableBonosDigitales;
