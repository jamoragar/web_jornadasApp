import React, {useState, useEffect} from "react";
import firebase from '../../Config/Firebase';

const DonarSuccess = (props) => {
	const [data, setData] = useState([]);
	
	useEffect(() => {
		const querystring = window.location.search;
		const splitted_data = querystring.split('?');

		/*
		0: '',
		1: url de redirección,
		2: token ws,
		3: Código de autorización,
		4: Monto ($),
		5: Código de respuesta,
		6: Orden de Compra,
		7: Fecha de Transacción
		*/

		/* Seteando valores en local storage para usarlos y consultar a firebase...*/
		window.localStorage.setItem('oc', splitted_data[6]);

		setData([splitted_data[1],
				splitted_data[2],
				splitted_data[3],
				splitted_data[4],
				splitted_data[5],
				splitted_data[6],
				splitted_data[7]]);
		firebase.database().ref(`Transbank/orden_${splitted_data[6]}`).update({
			estado_de_pago: 'Aprobado',
			transbank_data:{
				token_ws: splitted_data[2],
				cod_autorizacion: splitted_data[3],
				cod_respuesta: splitted_data[5],
				fecha_transaccion: splitted_data[7]
			}
		})
	}, [])

	if(data[0]){
		console.log(data);
		return(
			<div className="inner inner-pages">
				<div className="main">
					<div id="home" className="inner-area bg-overlay h-125vh">
						<div className="container pt-5 mt-5">
							<div className="row align-items-center h-100vh mt-3">
								<div className="welcome-intro">
									<h1 className="text-success">Un momento por favor</h1>
									<h3 className="text-white">Estamos procesando su pago</h3>
									<p className="text-white my-4">Gracias por colaborar con esta noble causa.</p>
								</div>
								<form action={data[0]} method='post' id='form-return'>
									<input type='hidden' name='token_ws' value={data[1]} />
								</form>
								{//Immediately-invoked function expression (IIFE).
									(() => {
									setTimeout(() => {document.getElementById('form-return').submit()}, 1473)
								})

								()}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}else{
		console.log('loading...')
		return(
			<h2>Loading...</h2>
		)
	}
};

export default DonarSuccess;
