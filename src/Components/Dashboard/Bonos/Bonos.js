import React, {useEffect, useState} from 'react';
import firebase from '../../../Config/Firebase';
import DataTable from 'react-data-table-component';
import {Row, Button} from 'react-bootstrap';

const BonosRifa = ({type, uid}) => {
    const columns = [
        {
            name: 'Número',
            selector: 'bono_rifa',
            sortable: true
        },
        {
            name: 'ID',
            selector: 'id',
            sortable: false
        },
        {
            name:'Disponibilidad',
            selector: 'isAviable',
            sortable: false,
            cell: (data) => {
                return `${data.isAviable ? 'Disponible ': 'Vendido'}`
            }
        }
    ];
    const [bonosSorteo, setBonosSorteo] = useState(null);

    useEffect(() => {
        firebase.database().ref('/Bonos_Sorteo').once('value')
            .then(snapshot => {
                snapshot.val() ? setBonosSorteo(snapshot.val()) : setBonosSorteo('ERROR');
            });
    }, [])

    if(bonosSorteo){
        console.log(bonosSorteo)
        return (
            <div className='dash_content'>
                <Row>
                    <h1>Bonos de Sorteo:</h1>
                </Row>
                <DataTable
                    columns={columns}
                    data={bonosSorteo}
                    fixedHeader
                    pagination
                    subHeader
                    persistTableHead
                    highlightOnHover
                    paginationRowsPerPageOptions={[100, 250, 800, 2000]}
                    paginationComponentOptions={{rowsPerPageText: 'Filas por página', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Todo'}}
                />
            </div>
        );
    }else{
        return(
            <h2>Loading...</h2>
        )
    };
};
 
export default BonosRifa;