import React, {useState} from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer'
import moment from 'moment';
import firebase from "../../../Config/Firebase";
import ActaEntregaTalonarios from '../Actas/ActaEntregaTalonarios';


const EntregaPorRango = ({ data }) => {
   // REGEX
   let onlyNumber = /^\d+$/;
   //Hooks
   const [spinner, setSpinner] = useState(false);

   const submitAsignarRango = e => {
      e.preventDefault();
      setSpinner(true);

      let desde = e.target.elements.desde.value.trim();
      let hasta = e.target.elements.hasta.value.trim();

      if((desde.match(onlyNumber) != null) && (hasta.match(onlyNumber) != null)){
         desde = parseInt(desde);
         hasta = parseInt(hasta);
         const diferencia = hasta - desde;
         if(diferencia > 0 && hasta < 15000){
            let promises = [];
            let talonarios_asignados = [];
            // Primero agregamos las promesas generadas por Firebase a un array para trabajarlas de forma sincrona
            for(let i = desde; i <= hasta; i++){
               promises.push(firebase
                  .database()
                  .ref('Talonarios')
                  .orderByChild('talonario_numero')
                  .equalTo(i)
                  .once("value"))
            };
            //Validamos que no hayan talonarios ya asignados
            //Guardamos en un array los talonarios ya asignados
            Promise.all(promises).then((res) => {
               res.forEach((childSnap, i) => {
                  if(childSnap.val() != null){
                     const val = childSnap.val();
                     const index = Object.keys(val);
                     if(val[index].asignado_usuario === true){
                        talonarios_asignados.push(val[index])
                     }
                  }else{
                     setSpinner(false);
                     Swal.fire(
                        "Atención!",
                        "El rango ingresado supera los 15000 talonarios generados para las Jornadas 2021",
                        "warning"
                     );
                  }
               })
               //Al ya haber 1 talonario asignado, el proceso queda nulo, ya que el rango debe estar limpio para asignar todos los talonarios de una vez.
               if(talonarios_asignados.length > 1){
                  setSpinner(false);
                  return Swal.fire(
                     "Atención!",
                     `Dentro del rango ingresado existen talonarios ya asignados: <b>${talonarios_asignados.map(talonario => talonario.talonario_numero)}</b>`,
                     "warning"
                  );
               }else{
                  // Código para asignar alcancias una vez hechas todas las validaciones

                  res.forEach((childSnap, i) => {
                     const val = childSnap.val();
                     const index = Object.keys(val);
                     const num_talonario = parseInt(index[0]);

                     
                     data.apellido ? (
                        firebase
                        .database()
                        .ref(`/Talonarios/${num_talonario}`)
                        .update({
                          asignado_usuario: true,
                          fecha_entrega: moment().format("MM-DD-YYYY h:mm:ss a"),
                          usuario: {
                            uid: data.uid,
                            nombre: data.nombre,
                            apellido: data.apellido,
                            email: data.email,
                            subtipo: data.subtipo ? data.subtipo : null,
                          },
                        })
                      )
                      :
                      (
                        firebase
                        .database()
                        .ref(`/Talonarios/${num_talonario}`)
                        .update({
                          asignado_usuario: true,
                          fecha_entrega: moment().format("MM-DD-YYYY h:mm:ss a"),
                          usuario: {
                            uid: data.uid,
                            nombre: data.nombre,
                            email: data.email,
                            subtipo: data.subtipo ? data.subtipo : null,
                          },
                        })
                      )
                     
                     firebase
                        .database()
                        .ref(`Users/${data.uid}/talonarios`)
                        .once("value", snapshot => {
                           if(snapshot.val() === null){
                              firebase
                                 .database()
                                 .ref(`Users/${data.uid}/talonarios/${i}`)
                                 .update({
                                       talonario_numero: val[index].talonario_numero,
                                       asignado_externo: val[index].asignado_externo,
                                       asignado_tercero: val[index].asignado_tercero,
                                       asignado_usuario: true,
                                       correlativo: val[index].correlativo,
                                       fecha_asignacion: moment().format("MM-DD-YYYY h:mm:ss a"),
                                       fecha_recuperacion: "",
                                       fecha_reinicio: "",
                                       recuperada: false,
                                       reset: false,
                                    })
                                 //Falta asignar los valores al talonario con una promesa
                           }else{
                              let aux_array = [];
                              aux_array.push(snapshot.val());
                              firebase
                                 .database()
                                 .ref(`Users/${data.uid}/talonarios/${aux_array[0].length}`)
                                 .update({
                                    talonario_numero: val[index].talonario_numero,
                                    asignado_externo: val[index].asignado_externo,
                                    asignado_tercero: val[index].asignado_tercero,
                                    asignado_usuario: true,
                                    correlativo: val[index].correlativo,
                                    fecha_asignacion: moment().format("MM-DD-YYYY h:mm:ss a"),
                                    fecha_recuperacion: "",
                                    fecha_reinicio: "",
                                    recuperada: false,
                                    reset: false,
                                 })
                                 //Falta asignar los valores al talonario con una promesa
                           }
                        });

                  });

                  setSpinner(false);
                  Swal.fire({
                     icon: "success",
                     title:"Talonarios Asignados!",
                     text:"Los talonarios han sido asignados con éxito. ¿Desea descargar el Acta de Entrega?",
                     showCancelButton: true,
                     confirmButtonText: `Si, descargar`,
                     cancelButtonText: 'No'
                  }).then(result => {
                     if(result.isConfirmed){
                        generatePdfDocument(desde, hasta, data)
                     }
                  })

                  console.log('yuju')
               }
            })
            
            // // Después escribimos en el usuario al cual se le asignarón los talonarios
            
         }else{
            setSpinner(false)
            Swal.fire(
               "Atención",
               "Verifique lo siguiente:" +
                  "<ol>" +
                     "<li>* El inicio del rango no sea menor que el final de este.</li>" +
                     "<li>* El inicio y el final no pueden ser iguales.</li>" +
                     "<li>* El final no puede superar la cantidad de talonarios generados (15000).</li>" +
                  "</ol>",
               "warning"
             );
         }
      }else{
         setSpinner(false)
         Swal.fire(
            "Error al momento de escribir",
            "Solo puede escribir números en los campos disponibles. Por favor, corrobore y vuelva a intentar.",
            "error"
          )
      }
   };
     //Función que genera el pdf pasandole la data de alcancías al componente Acta
   const generatePdfDocument = async (desde, hasta, usuario) => {
      const talonarios = [];
      for (let i = 0; i <= (hasta - desde); i++){
         talonarios.push(desde + i)
      };
      const blob = await pdf((
         <ActaEntregaTalonarios
            data = {talonarios}
            usuario = {usuario}
         />
      )).toBlob();
      saveAs(blob, 'Acta_Talonarios_2021.pdf');
      };

  return (
      <Form onSubmit={submitAsignarRango}>
         <Form.Label>Ingrese el rango de talonarios a asignar a: <b>{data.nombre}</b></Form.Label>
         <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="desde">
               <Form.Label>Desde</Form.Label>
               <Form.Control name="desde" type="text" placeholder="Nro. Talonario: Desde" required />
               <Form.Control.Feedback type="invalid">Debe ingresar el inicio del rango.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="hasta">
               <Form.Label>Hasta</Form.Label>
               <Form.Control name="hasta" type="text" placeholder="Nro. Talonario: Hasta" required />
               <Form.Control.Feedback type="invalid">Debe ingresar el final del rango.</Form.Control.Feedback>
            </Form.Group>
         </Row>
         <Button variant="danger" type="submit" block>
            {spinner ? <Spinner animation="border" /> : 'Asignar Rango'}
         </Button>
      </Form>
  );
};

export default EntregaPorRango;
