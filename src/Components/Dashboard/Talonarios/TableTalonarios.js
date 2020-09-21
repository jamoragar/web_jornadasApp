import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {InfoTalonario} from './InfoTalonario'

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
