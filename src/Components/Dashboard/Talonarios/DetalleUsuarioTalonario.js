import React from "react";
import { Table } from 'react-bootstrap';

const DetalleUsuarioTalonario = ({ data }) => {
  const user_data = data;
  console.log(user_data)
  const talonarios = [];
  user_data.talonarios && user_data.talonarios.map((talonario) => talonarios.push(talonario));

  return talonarios ? (
    <>
      <h3>Cantidad de alcancías: {talonarios.length}</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Número Talonario</th>
            <th>Correlativo</th>
            <th>Fecha de Asignación</th>
          </tr>
        </thead>
        <tbody>
          {talonarios.map((talonario, i) => {
            return (
              <tr key={`alc_${i}`}>
                <th>{talonario.talonario_numero}</th>
                <th>{talonario.correlativo}</th>
                <th>{talonario.fecha_asignacion}</th>
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
    <h4>Aún no se le han asignado talonarios a este usuario.</h4>
  );
};

export default DetalleUsuarioTalonario;
