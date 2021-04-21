// import React, {useState} from 'react';
// import Footer from '../Footer/Footer';
// import {Spinner} from 'react-bootstrap';
// import axios from 'axios';
// import Swal from 'sweetalert2';



// const DownloadFiles = () => {
//     const [btnText, setBtnText] = useState(false);
//     const [bonosRecibidos, setBonosRecibidos] = useState(false);
//     const [bonos, setBonos] = useState(null);

//     const API_PATH = 'https://www.appjornadasmagallanicas.cl/api/api/descargarPorOC';

//     const submitHangler = (event) => {
//         event.preventDefault();

//         setBtnText(true);

//         const {orden_compra, email} = event.target.elements;
//         console.log(orden_compra.value.trim().toUpperCase(), email.value);

//         if(orden_compra.value === '' || email.value === ''){
//             Swal.fire(
//                 'Datos no ingresados',
//                 'Complete el formulario con la información solicitada e intente nuevamente.',
//                 'warning'
//               );
//               setBtnText(false);
//         }else{
//             axios({
//                 method: 'post',
//                 url: `${API_PATH}`,
//                 headers: {'content-type': 'application/json'},
//                 data: {
//                     orden_compra: orden_compra.value.trim().toUpperCase(),
//                     email:email.value.trim(),
//                 }
//             }).then(result => {
//                 if(result.data ===  'Usuario no encontrado'){
//                     Swal.fire(
//                         'Lo sentimos',
//                         'No hemos encontrado sus bonos, puede ser que su correo este escrito con minúscula o mayúscula.',
//                         'warning'
//                       )
//                       setBtnText(false);
//                       return;
//                 }
//                 Swal.fire(
//                     'Bonos de Sorteo',
//                     'Si desea descargar sus bonos, haga click derecho en cada uno y seleccione la opción "Guardar imagen como".',
//                     'success'
//                   )
//                 setBtnText(false);
//                 setBonos(result.data);
//                 setBonosRecibidos(true);
//             }, err => {
//                 console.log(err)
//                 setBtnText(false);
//                 Swal.fire(
//                     'Lo sentimos',
//                     'No hemos encontrado registros con los datos ingresados, por favor, corrobore la información e intente nuevamente',
//                     'error'
//                   )
//             });
//         }

//     };
//     return (
//         <>
//         <section id="contact" className="contact-area bg-gray ptb_100">
//             <div className="container">
//                 <div className="row justify-content-center">
//                     <div className="col-12 col-md-10 col-lg-6">
//                         <div className="section-heading text-center">
//                             <h2 className="text-capitalize">Acá podrás descargar tus bonos!</h2>
//                             <p className="d-none d-sm-block mt-4">Ingrese su número de orden de compra y el correo eléctronico que uso para comprar los bonos.</p>
//                             <p className="d-block d-sm-none mt-4">Ingrese su número de orden de compra y el correo eléctronico que uso para comprar los bonos.</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="contact-box text-center">
//             <form
//             onSubmit={submitHangler}
//             className="contact-form"
//             noValidate="novalidate"
//             >
//                 <div className="row">
//                     <div className="col-12">
//                     <div className="form-group">
//                         <input
//                         type="text"
//                         className="form-control"
//                         name="orden_compra"
//                         placeholder="Orden de Compra. Por ejemplo JMAGALLANICAS-0"
//                         required="required"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <input
//                         type="email"
//                         className="form-control"
//                         name="email"
//                         placeholder="E-mail"
//                         required="required"
//                         />
//                     </div>
                    
//                     </div>
//                     <div className="col-12">
//                         <button
//                             type="submit"
//                             className="btn btn-lg btn-block mt-3">
//                             {
//                                 btnText ?
//                                 <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
//                                 :
//                                     (<>
//                                     <span className="text-white pr-3">
//                                         <i className="fas fa-paper-plane" />
//                                     </span>
//                                     Obtener Bonos
//                                     </>)
//                             }
//                         </button>
//                     </div>
//                     <br/>
//                     {
//                         bonosRecibidos ? (bonos.map((imagenes_bonos, key ) => {
//                             console.log(imagenes_bonos)
//                             return(
//                                 <div className="col-12 col-md-6 pt-4 pt-md-0">
//                                 <br/>
//                                     <div key={key}>
//                                         <img src={imagenes_bonos} />
//                                     </div>
//                                 </div>
//                             )
//                         })) : null
//                     }
//                 </div>
//             </form>
//         </div>
//             </div>
//         </section>
//         <Footer />  
//         </>
//     );
// }

// export default DownloadFiles;