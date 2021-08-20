import React from "react";
import DataTable from "react-data-table-component";

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

   return (
      <DataTable
        columns={columns}
        data={bonosSorteo}
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
   );
};

export default TableBonosManuales;