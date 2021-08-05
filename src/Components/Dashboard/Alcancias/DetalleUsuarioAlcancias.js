import React, {useState} from "react";
import { Table, Button } from "react-bootstrap";



const DetalleUsuarioAlcancias = ({ data }) => {
   const user_data = data;
   const alcancias = [];
   user_data.alcancias && user_data.alcancias.map(alcancia => alcancias.push(alcancia));

  return alcancias ? (
   <>
   <h3>Cantidad de alcancías: {alcancias.length}</h3>
   <Table striped bordered hover>
   <thead>
      <tr>
         <th>Número Alcancia</th>
         <th>Código de Barra</th>
         <th>Fecha de Asignación</th>
      </tr>
   </thead>
   <tbody>
      {alcancias.map((alcancia, i) => {
         return (
         <tr key={`alc_${i}`}>
            <th>{alcancia.alcancia_numero}</th>
            <th>{alcancia.codigo_barra}</th>
            <th>{alcancia.fecha_asignacion}</th>
         </tr>
         );
      })}
   </tbody>
   </Table>

      {/* <Button varian="primary" block onClick={() => generatePdfDocument()}>Generar Acta</Button> */}
   {/* <PDFDownloadLink document={<ActaEntregaAlcancias data={alcancias} />} fileName="Alcancias2021.pdf">
      {({ blob, url, loading, error }) =>{
         return loading ? 'Cargando acta...' : 'Descargar Acta'
      }}
   </PDFDownloadLink>    */}

   </>
  ) : (
    <h4>Aún no se le han asignado alcancías a este usuario.</h4>
  );
};

export default DetalleUsuarioAlcancias;
