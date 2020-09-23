import React, {useEffect, useState} from "react";
import firebase from '../../Config/Firebase';
import Header from "../NavBar/NavBar";
import Footer from "../Home/Layout/Footer/Footer";

const PagoExito = (props) => {
	const [data, setData] = useState(null);
	const [fbData, setFbData] = useState(null);
	useEffect(() => {
		const querystring = window.location.search;
		const splitted_data = querystring.split('?');
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
			splitted_data[2],
			splitted_data[3],
			splitted_data[4],
			splitted_data[5],
			splitted_data[6]]);
		console.log(splitted_data[6])
			firebase.database().ref(`Transbank/orden_${splitted_data[2].split('-')[1]}`).update({
				estado_de_pago: 'Aprobado'
			}).then(
				firebase.database().ref(`Transbank/orden_${splitted_data[2].split('-')[1]}`).once('value').then(snapshot => {
					setFbData(snapshot.val())
					firebase.database().ref((snapshot.val().item === 'Aporte' ? 'Donaciones' : 'Bono_digital') + '/' + splitted_data[2].split('-')[1]).update({
						estado_de_pago: 'Aprobado',
						transbank: {
							token_ws: splitted_data[1],
							cod_autorizacion: splitted_data[4],
							cod_respuesta: '0',
							fecha_transaccion: splitted_data[3]
						}
					})
					if(splitted_data[6].length >= 19){
						firebase.database().ref(`Users/${splitted_data[6]}/${(snapshot.val().item === 'Aporte' ? 'aportes' : 'bonos')}/${splitted_data[2].split('-')[1]}`).update({
							apellido: snapshot.val().apellido ? snapshot.val().apellido : null,
							aporte: splitted_data[5],
							email: snapshot.val().email,
							estado_de_pago: 'Aprobado',
							fecha: splitted_data[3],
							nombre: snapshot.val().nombre,
							numero_orden: splitted_data[2]
						})
					}
				})
			)
	}, []);

	if(data && fbData){
		console.log(fbData)
		const initData = {
			state: "Transacción realizada con éxito.",
			heading1: `Su pago por "${fbData.item}" ha sido procesado exitosamente.`,
			content: "Gracias por colaborar con esta noble causa.",
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
												src={require("../../imgs/logo.png")}
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
													<td>{fbData.numero_orden}</td>
												</tr>
												<tr>
													<th>Nombre</th>
													<td>{fbData.nombre}</td>
												</tr>
												{
													fbData.apellido ? (
														<tr>
															<th>Apellido</th>
															<td>{fbData.apellido}</td>
														</tr>
													)
													:
													null
												}
												<tr>
												
													<th>Monto</th>
													<td>${fbData.monto ? fbData.monto : fbData.aporte}</td>
												</tr>
												{
													fbData.item === 'Bono' ? (
														<tr>
															<th>Cantidad</th>
															<td>{fbData.cantidad}</td>
														</tr>
														)
													:
													(
														null	
													)
												}
												
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
