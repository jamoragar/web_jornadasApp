import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import {
  OverlayTrigger,
  Tooltip,
  Button,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import EntregarAlcancias from "../Alcancias/EntregarAlcancias";
import EntregarTalonarios from "../Talonarios/EntregarTalonarios";
import { EditarUsuario } from "./EditarUsuario";
import { EditarEmpresa } from "./EditarEmpresa";
import styled from "styled-components";

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
      <TextField
        id="search"
        type="text"
        placeholder="Busqueda..."
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <ClearButton type="button" onClick={onClear}>
        Limpiar
      </ClearButton>
    </>
  );
};

const VerUsuarios = ({ users, userAuth }) => {
  const [showEntregarAlcancias, setShowEntregarAlcancias] = useState(false);
  const [showEntregarTalonarios, setShowEntregarTalonarios] = useState(false);
  const [showEditarUsuario, setShowEditarUsuario] = useState(false);
  const [showEditarEmpresa, setShowEditarEmpresa] = useState(false);
  const [userData, setUserData] = useState(null);
  let usersToArray = [];

  // const handleModalAlcancias = (data) => {};
  //Declaramos las columnas que tendrá nuestra tabla
  const columns = [
    // {
    //   name: "UID",
    //   selector: "uid",
    //   sortable: false,
    // },
    {
      name: "Nombre",
      selector: (user) => {
        //Chequeamos que el usuario tenga apellido, si no tiene, asumimos que corresponde a una empresa y no se muestra en pantalla.
        return `${user.nombre} ${user.apellido ? user.apellido : ""}`;
      },
      sortable: true,
      width:"20%"
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      width:"25%"
    },
    {
      name: "Tipo",
      selector: "tipo",
      sortable: true,
      width: "10%",
    },
    {
      name: "SubTipo",
      selector: "subtipo",
      sortable: true,
      width: "15%",
    },
    {
      name: "Control",
      button: true,
      width: "10%",
      cell: (data) => {
        return userAuth.subtipo === "Admin" ? (
          <div style={{ display: "flex" }}>
            <OverlayTrigger
              key={"alcancias"}
              placement={"left"}
              overlay={
                <Tooltip id={"tooltip-bottom"}>
                  <strong>Alcancías</strong>
                </Tooltip>
              }
            >
              <div
                style={{ cursor: "pointer" }}
                className="text-danger"
                onClick={() => {
                  setShowEntregarAlcancias(true);
                  setUserData(data);
                }}
              >
                <i
                  className="fas fa-fw fa-donate fa-lg"
                  style={{ width: "35px", height: "20px" }}
                />
              </div>
            </OverlayTrigger>
            <OverlayTrigger
              key={"bonos"}
              placement={"left"}
              overlay={
                <Tooltip id={"tooltip-bottom"}>
                  <strong>Talonarios</strong>
                </Tooltip>
              }
            >
              <div
                style={{ cursor: "pointer" }}
                className="text-primary"
                onClick={() => {
                  setShowEntregarTalonarios(true);
                  setUserData(data);
                }}
              >
                <i
                  className="fas fa-fw fa-receipt fa-lg"
                  style={{ width: "35px", height: "20px" }}
                />
              </div>
            </OverlayTrigger>
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
                  data.tipo === "User"
                    ? setShowEditarUsuario(true)
                    : setShowEditarEmpresa(true);
                  setUserData(data);
                }}
              >
                <i
                  className="fas fa-fw fa-search fa-lg"
                  style={{ width: "35px", height: "20px" }}
                />
              </div>
            </OverlayTrigger>
          </div>
        ) : null;
      },
    },
  ];
  // Transformamos el Objeto entregado por Firebase a Array, para que el componente lo tome como argumento
  Object.keys(users).forEach((key, i) => {
    usersToArray[i] = users[key];
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
                <option value="nombre">Nombre</option>
                <option value="email">Email</option>
                {/* <option value="uid">Uid</option> */}
                <option value="tipo">Tipo</option>
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

  const [filter, setFilter] = useState("nombre");

  const filteredItems = usersToArray.filter((item) => {
    // if (filter === "uid") {
    //   return (
    //     item.uid.toLowerCase() &&
    //     item.uid.toLowerCase().includes(filterText.toLowerCase())
    //   );
    // } else 
    if (filter === "nombre") {
      return (
        item.nombre.toLowerCase() &&
        item.nombre.toLowerCase().includes(filterText.toLowerCase())
      );
    } else if (filter === "email") {
      return (
        item.email.toLowerCase() &&
        item.email.toLowerCase().includes(filterText.toLowerCase())
      );
    } else if (filter === "tipo") {
      return (
        item.tipo.toLowerCase() &&
        item.tipo.toLowerCase().includes(filterText.toLowerCase())
      );
    }
  });

  if (filteredItems) {
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
          paginationPerPage={50}
        />
        {
          //Modal Entregar Alcancias
          userData && showEntregarAlcancias !== false ? (
            <EntregarAlcancias
              show={showEntregarAlcancias}
              onHide={() => setShowEntregarAlcancias(false)}
              data={userData}
            />
          ) : null
        }
        {
          //Modal Entregar Talonarios
          userData && showEntregarTalonarios !== false ? (
            <EntregarTalonarios
              show={showEntregarTalonarios}
              onHide={() => setShowEntregarTalonarios(false)}
              data={userData}
            />
          ) : null
        }
        <EditarUsuario
          show={showEditarUsuario}
          onHide={() => setShowEditarUsuario(false)}
          data={userData}
        />
        <EditarEmpresa
          show={showEditarEmpresa}
          onHide={() => setShowEditarEmpresa(false)}
          data={userData}
        />
      </>
    );
  }
};

export default VerUsuarios;
