import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {
	OverlayTrigger,
	Tooltip,
	Button,
	Col,
	Row,
	Form, } from "react-bootstrap";
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
      <TextField id="search" type="text" placeholder='Busqueda...' aria-label="Search Input" value={filterText} onChange={onFilter} />
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
			name: "Número de Talonario",
			selector: "talonario_numero",
			sortable: true,
			width: "7.5%",
		},
		{
			name: "Correlativo",
			selector: "correlativo",
			sortable: true,
			width: "8%",
		},
		{
			name: "Asignado",
			selector: "asignado_usuario",
			cell: talonarios => { return `${talonarios.asignado_usuario? "Si":"No"}`
			},
			sortable: true,
			width: "8%",
		},
		{
			name: "Asignado a tercero",
			selector: "asignado_tercero", 
			cell: talonarios => { return `${talonarios.asignado_tercero? "Si":"No"}`
        },
			sortable: true,
			width: "10%",
		},
		{
			name: "Asignado a externo",
			selector:  "asignado_externo",
			cell: talonarios => { return `${talonarios.asignado_externo? "Si":"No"}`
        },
			sortable: true,
			width: "10%",
		},
		{
			name: "Recuperada",
			selector: "recuperado",
			cell: talonarios => { return `${talonarios.recuperado? "Si":"No"}`
        },
			sortable: true,
			width: "10%",
		},
		{
			name: "Fecha",
			selector: "fecha_entrega",
			cell: talonarios => { return `${talonarios.fecha_entrega ? talonarios.fecha_entrega:"N.A"}`
        },
			sortable: true,
			width: "15%",
		},
		{
			name: "Encargado(a)",
			selector: "nombre",
			cell: alcancias => {
			  return alcancias.usuario ? `${alcancias.usuario.nombre} ${alcancias.usuario.apellido ? alcancias.usuario.apellido : ''}`: 'N.A.'
			},
			sortable: true,
			width: "20%"
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
					<option value="todos">Todos</option>
					<option value="talonario_numero">Número Talonario</option>
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

  const [filter, setFilter] = useState("todos");

  const filteredItems = talonariosToArray.filter((item) => {
    if (filter === "talonario_numero") {
      return (
        item.talonario_numero.toString().toLowerCase() &&
        item.talonario_numero.toString() === filterText ? true : false
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
    }else if(filter === 'nombre'){
		 if(item.usuario){
			 return (
				item.usuario.nombre.toLowerCase() &&
				item.usuario.nombre.toLowerCase().includes(filterText.toLocaleLowerCase())
			 )
		 }
	 }else if(filter === "todos"){
		 return item;
	 }
  });

	return (
		<>
		<DataTableExtensions
			columns={columns}
			data={filteredItems}
			filter={false}
			exportHeaders={true}
			print={false}
		>
			<DataTable
				fixedHeader
				fixedHeaderScrollHeight="500px"
				pagination
				paginationRowsPerPageOptions={[50,100]}
				paginationComponentOptions={{
					rowsPerPageText: "Filas por página",
					rangeSeparatorText: "de",
				}}
				loading={talonarios}
				subHeader
				subHeaderComponent={subHeaderComponentMemo}
				highlightOnHover
				paginationPerPage={50}
			/>
		</DataTableExtensions>
			<InfoTalonario
				show={showTalonario}
				onHide={() => setShowTalonario(false)}
				data={talonariosData}
			/>
		</>
	);
};

export default TableAlcancias;
