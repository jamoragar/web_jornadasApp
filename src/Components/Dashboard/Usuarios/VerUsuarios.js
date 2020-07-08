import React from 'react';
import DataTable from 'react-data-table-component';

const VerUsuarios = ({users}) => {
    let usersToArray = [];
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
            cell: () => {
                return (
                    <div style={{display: 'flex'}}>
                        <div style={{ cursor: 'pointer' }} className="text-success"><i className="fas fa-fw fa-search fa-lg" style={{ width: '35px', height: '20px' }} /></div>
                        <div style={{ cursor: 'pointer' }} className="text-success"><i className="fas fa-fw fa-search fa-lg" style={{ width: '35px', height: '20px' }} /></div>
                        <div style={{ cursor: 'pointer' }} className="text-success"><i className="fas fa-fw fa-search fa-lg" style={{ width: '35px', height: '20px' }} /></div>
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
    );
}
 
export default VerUsuarios;