import React, {useState} from 'react';
import DataTable from 'react-data-table-component';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import EntregarAlcancias from '../Alcancias/EntregarAlcancias';
import EntregarTalonarios from '../Talonarios/EntregarTalonarios';

const VerUsuarios = ({users}) => {
    const [showEntregarAlcancias, setShowEntregarAlcancias] = useState(false);
    const [showEntregarTalonarios, setShowEntregarTalonarios] = useState(false);
    const [userData, setUserData] = useState(null);
    let usersToArray = [];

    const handleModalAlcancias = (data) => {

    }
    //Declaramos las columnas que tendrá nuestra tabla
    const columns = [
        {
          name: 'UID'  ,
          selector: 'uid',
          sortable: false
        },
        {
            name: 'Nombre',
            selector: (user) => {
                //Chequeamos que el usuario tenga apellido, si no tiene, asumimos que corresponde a una empresa y no se muestra en pantalla.
                return `${user.nombre} ${user.apellido ? user.apellido : ''}`;
            },
            sortable: true,
        },
        {
            name:'Email',
            selector: 'email',
            sortable: true
        },
        {
            name: 'Nivel',
            selector: 'tipo',
            sortable: true,
            width: '10%',
        },
        {
            name: 'Control',
            button: true,
            width: '20%',
            cell: (data) => {
                return (
                    <div style={{display: 'flex'}}>
                        <OverlayTrigger key={'alcancias'} placement={'left'} overlay={
                            <Tooltip id={'tooltip-bottom'}><strong>Alcancias</strong></Tooltip>
                        }>
                            <div style={{ cursor: 'pointer' }} className="text-danger"
                                onClick={() => {
                                    setShowEntregarAlcancias(true);
                                    setUserData(data);
                                    }
                            }>
                                <i className="fas fa-fw fa-donate fa-lg" style={{ width: '35px', height: '20px' }} />
                            </div>
                        </OverlayTrigger>
                        <OverlayTrigger key={'bonos'} placement={'left'} overlay={
                            <Tooltip id={'tooltip-bottom'}><strong>Bonos Sorteo</strong></Tooltip>
                        }>
                            <div style={{ cursor: 'pointer' }} className="text-primary"
                                onClick={() => {
                                    setShowEntregarTalonarios(true);
                                    setUserData(data);
                                }
                            }>
                                <i className="fas fa-fw fa-receipt fa-lg" style={{ width: '35px', height: '20px' }} />
                            </div>
                        </OverlayTrigger>
                        <OverlayTrigger id={'ver'} placement={'left'} overlay={
                            <Tooltip id={'tooltip-bottom'}><strong>Ver</strong></Tooltip>
                        }>
                            <div style={{ cursor: 'pointer' }} className="text-success">
                                <i className="fas fa-fw fa-search fa-lg" style={{ width: '35px', height: '20px' }} />
                            </div>
                        </OverlayTrigger>
                    </div>
                );
            }
        }
    ];
    // Transformamos el Objeto entregado por Firebase a Array, para que el componente lo tome como argumento
    Object.keys(users).forEach((key, i) => {
        usersToArray[i] = users[key];
    });

    return (
        <>
        <DataTable
            columns={columns}
            data={usersToArray}
            fixedHeader
            fixedHeaderScrollHeight="500px"
            pagination
            paginationRowsPerPageOptions={[20, 40, 50, 100]}
            paginationComponentOptions={{rowsPerPageText: 'Filas por página', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Todo'}}
            subHeader
            persistTableHead
            highlightOnHover
        />
        {//Modal Entregar Alcancias
            userData && showEntregarAlcancias !== false ?
                <EntregarAlcancias show={showEntregarAlcancias} onHide={() => setShowEntregarAlcancias(false)} data={userData} />
            :
                null
        }
        {//Modal Entregar Talonarios
            userData && showEntregarTalonarios !== false ?
                <EntregarTalonarios show={showEntregarTalonarios} onHide={() => setShowEntregarTalonarios(false)} data={userData} />
            :
                null
        }
        </>
    );
}
 
export default VerUsuarios;