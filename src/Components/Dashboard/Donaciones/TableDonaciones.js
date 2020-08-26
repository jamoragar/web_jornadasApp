import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { InfoDonacion } from "./InfoDonacion";

const TableDonaciones = ({ donaciones }) => {
	const [showDonacion, setShowDonacion] = useState(false);
	const [donacionData, setDonacionData] = useState(null);
	let donacionesToArray = [];

	const columns = [
		{
			name: "Orden de compra",
			selector: "numero_orden",
			sortable: true,
			width: "5%",
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

	return (
		<>
			<DataTable
				columns={columns}
				data={donacionesToArray}
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
			<InfoDonacion
				show={showDonacion}
				onHide={() => setShowDonacion(false)}
				data={donacionData}
			/>
		</>
	);
};

export default TableDonaciones;
