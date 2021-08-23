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
        width: "15%",
      },
      
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