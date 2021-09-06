import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

const TableBonosManuales = ({bonosSorteo}) => {
   const columns = [
      {
        name: "Orden de compra",
        selector: "orden_compra",
        sortable: true,
        width: "14%",
      },
      {
        name: 'Número Boucher',
        selector: 'cod_boucher',
        sortable: true,
        width: '7%'
      },
      {
        name: 'Tipo de Pago',
        selector: 'tipo_pago',
        sortable: true,
        width: '10%'
      },
      {
        name: 'Fecha Venta',
        selector: 'fecha_venta',
        sortable: true,
        width: '13%'
      },
      {
        name: 'Cantidad Bonos',
        selector: 'cant_bonos',
        sortable: true,
        width: '7%'
      },
      {
        name: 'Participante',
        selector: 'nombre',
        cell: bonosSorteo => {
          return `${bonosSorteo.nombre} ${bonosSorteo.apellido}`;
        },
        width: '14%'
      },
      {
        name: 'Rut',
        selector: 'rut',
        width: '9%'
      },
      {
        name: 'Teléfono',
        selector: 'telefono',
        width: '11%'
      },
      {
        name: 'Vendedor',
        selector: 'nombre_vendedor',
        cell: bonosSorteo => {
          return `${bonosSorteo.nombre_vendedor} ${bonosSorteo.apellido_vendedor}`;
        },
        sortable: true,
        width: '13%'
      }
      
   ];
   console.log(bonosSorteo);

    const filteredItems = bonosSorteo;
  //  const filteredItems = bonosSorteo.filter((item) => {
  //   if (filter === "numero_orden") {
  //     return (
  //       item.buy_order.toLowerCase() &&
  //       item.buy_order.toLowerCase().includes(filterText.toLowerCase())
  //     );
  //   } else if (filter === "nombre") {
  //     try {
  //       return (
  //         item.nombre.toLowerCase() &&
  //         item.nombre.toLowerCase().includes(filterText.toLowerCase())
  //       );
  //     } catch (error) {
  //       console.log(bonosSorteoToArray);
  //       console.warn(error);
  //     }
  //   } else if (filter === "email") {
  //     return (
  //       item.email.toLowerCase() &&
  //       item.email.toLowerCase().includes(filterText.toLowerCase())
  //     );
  //   } else if (filter === "fecha") {
  //     return item.transactionDate && item.transactionDate.includes(filterText);
  //   } else if (filter === "estado_de_pago") {
  //     return (
  //       item.responseCode.toLowerCase() &&
  //       item.responseCode.toLowerCase().includes(filterText.toLowerCase())
  //     );
  //   }
  // });

   return (
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
        paginationRowsPerPageOptions={[50, 100, 200]}
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página",
          rangeSeparatorText: "de",
        }}
        subHeader
      //   subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        highlightOnHover
        paginationPerPage={50}
      />
    </DataTableExtensions>
   );
};

export default TableBonosManuales;