import React, {useEffect, useState} from "react";
// import firebase from '../../Config/Firebase';
import Header from "../NavBar/NavBar";
import Footer from "../Home/Layout/Footer/Footer";
import Logo from '../../imgs/logo.png'
import axios from 'axios';

const PagoExito = (props) => {
	const [data, setData] = useState(null);
	const [dataApi, setDataApi] = useState(null);
	const url = 'https://appjornadasmagallanicas.cl/api/api/pago';
	useEffect(() => {
		const querystring = window.location.search;
		const splitted_data = querystring.split('?');
		if(!splitted_data[1]){
			window.location.href = "http://localhost:3000"; 
		};
		/*
		0; ''
		1: token_ws
		2: buy_order
		3: transactionDate
		4: authorizationCode
		5: amount
		6: uid
		*/
		setData([splitted_data[1],
			// splitted_data[2],
			// splitted_data[3],
			// splitted_data[4],
			// splitted_data[5],
			// splitted_data[6]
		]);
			axios({
				method: 'GET',
				url: `${url}/${splitted_data[1]}`
			}).then(res => {
				console.log(res.data)
				setDataApi(res.data[0])

			});
			// firebase.database().ref(`Transbank/orden_${splitted_data[2].split('-')[1]}`).update({
			// 	estado_de_pago: 'Aprobado'
			// }).then(
			// 	firebase.database().ref(`Transbank/orden_${splitted_data[2].split('-')[1]}`).once('value').then(snapshot => {
			// 		setFbData(snapshot.val())
			// 		firebase.database().ref((snapshot.val().item === 'Aporte' ? 'Donaciones' : 'Bono_digital') + '/' + splitted_data[2].split('-')[1]).update({
			// 			estado_de_pago: 'Aprobado',
			// 			transbank: {
			// 				token_ws: splitted_data[1],
			// 				cod_autorizacion: splitted_data[4],
			// 				cod_respuesta: '0',
			// 				fecha_transaccion: splitted_data[3]
			// 			}
			// 		})
			// 		if(splitted_data[6].length >= 19){
			// 			firebase.database().ref(`Users/${splitted_data[6]}/${(snapshot.val().item === 'Aporte' ? 'aportes' : 'bonos')}/${splitted_data[2].split('-')[1]}`).update({
			// 				apellido: snapshot.val().apellido ? snapshot.val().apellido : null,
			// 				aporte: splitted_data[5],
			// 				email: snapshot.val().email,
			// 				estado_de_pago: 'Aprobado',
			// 				fecha: splitted_data[3],
			// 				nombre: snapshot.val().nombre,
			// 				numero_orden: splitted_data[2]
			// 			})
			// 		}
			// 	})
			// )
			console.log(splitted_data[1])


	}, []);

	if(data && dataApi){
		const initData = {
			state: "Transacción realizada con éxito.",
			heading1: `Su pago por "$${dataApi.amount}" ha sido procesado exitosamente. En unos minutos le llegará un e-mail con un link para poder descargar sus bonos de sorteo.`,
			content: `De cualquier modo, puede ingresar a "Descarga de Bonos" y con su número de orden de compra (${dataApi.buy_order}) y el correo electrónico que ingresó, podrá ver y descargar sus bonos`,
			btnText: "Volver al inicio",
		};
		return (
			<div className="inner inner-pages">
				<div className="main">
					<Header />
					<div id="home" className="inner-area bg-overlay h-125vh">
						<div className="container pt-5 mt-5">
							<div className="row align-items-center h-100vh mt-3">
								<div className="col-lg-8 col-md-6 col-sm-12 col-xs-12 mt-sm-5">
									<div className="welcome-intro">
										<h1 className="text-success">{initData.state}</h1>
										<h3 className="text-white">{`${initData.heading1}`}</h3>
										<p className="text-white my-4">{initData.content}</p>
									</div>
								</div>
								<div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
									<div className="single-price-plan text-center px-5 py-3">
										<div className="plan-thumb">
											<img
												src={Logo}
												alt="cruz de malta"
											/>
										</div>
										<div className="plan-title my-1 my-sm-2">
											<h3 className="text-uppercase">Detalle</h3>
										</div>
										<table className="table">
											<tbody>
												<tr>
													<th>Orden de compra</th>
													<td>{dataApi.buy_order}</td>
												</tr>
												<tr>				
													<th>Monto</th>
													<td>${dataApi.amount ? dataApi.amount : dataApi.aporte}</td>
												</tr>			
											</tbody>
										</table>
										<div className="plan-button">
											<a href="/" className="btn sApp-btn text-uppercase">
												{initData.btnText}
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<Footer />
				</div>
			</div>
		);
	}else{
		console.log('loading...')
		return(
			<h2>Loading...</h2>
		);
	}
};

export default PagoExito;
