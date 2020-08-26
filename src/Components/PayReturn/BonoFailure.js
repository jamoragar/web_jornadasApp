import React, {useEffect, useState} from "react";
import firebase from '../../Config/Firebase';
import Header from "../NavBar/NavBar";
import Footer from "../Home/Layout/Footer/Footer";

const BonoFailure = (props) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const querystring = window.location.search;
		const splitted_data = querystring.split('?');
		/*
			0: '',
			1: Código de respuesta,
			2: Orden de Compra,
			3: Monto ($),
			4: token ws,
			5: Fecha de Transacción
		*/
		setData([splitted_data[1],
				splitted_data[2],
				splitted_data[3],
				splitted_data[4],
				splitted_data[5]]);
		firebase.database().ref(`Transbank/orden_${splitted_data[2]}`).update({
			forma_de_pago: 'Rechazado'
		})
	}, []);


	const initData = {
		state: "No hemos podido procesar tu pago",
        heading1: "El pago por ",
        heading2: "CLP no se ha logrado llevar a cabo.",
		btnText: "Volver al inicio",
	};
	let error;
	let mensaje;

	if(data[0]){
		console.log(data);
		switch(data[0]){
			case '-1':
				error = 'Rechazo de transacción.';
				mensaje = 'Reintente (Posible error en el ingreso de datos de la transacción).';
				break;
			case '-2':
				error = 'Rechazo de transacción.';
				mensaje = 'Se produjo fallo al procesar la transacción. Error al ingresar información de la tarjeta y/o su cuenta asociada.';
				break;
			case '-3':
				error = 'Error de Transacción.'
				mensaje = 'Error interno de Transbank';
				break;
			case '-4':
				error = 'Rechazo emisor.';
				mensaje = 'Transacción rechazada por parte del emisor';
				break;
			case '-5':
				error = 'Rechazo - Posible Fraude';
				mensaje = 'Transacción con riesgo de posible fraude';
				break;
			default:
				error = 'Error.';
				mensaje = 'Error desconocido. Póngase en contacto con la adminsitración.';
				break;
		};

		return (
			<div className="inner inner-pages">
				<div className="main">
					<Header />
					<section
						id="home"
						className="section welcome-area inner-area bg-overlay h-100vh overflow-hidden"
					>
						<div className="container h-100">
							<div className="row align-items-center h-100">
								<div className="col-12 col-md-8">
									<div className="welcome-intro">
										<h1 className="text-danger">{initData.state} - {error}</h1>
										{
											data[2] ? (<h3 className="text-white">{`${initData.heading1} $ ${data[2]} ${initData.heading2}`}</h3>)
											:
											(<h3 className="text-white">La Orden de Compra: {data[1]} no pudo ser llevada a cabo</h3>)
										}
										
										<p className="text-white my-4">{mensaje}</p>
										<a href="/" className="btn sApp-btn text-uppercase">
											{initData.btnText}
										</a>
									</div>
								</div>
							</div>
						</div>
					</section>
					<Footer />
				</div>
			</div>
		);
	}else{
		console.log('loading...')
		return(
			<h2>Loading...</h2>
		)
	}
};

export default BonoFailure;