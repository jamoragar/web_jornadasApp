import React from "react";
import Header from "../NavBar/NavBar";
import Footer from "../Home/Layout/Footer/Footer";

const BonoSuccess = (props) => {
	const initData = {
		state: "Pago realizado con éxito.",
		heading1: "Su compra de bono(s) por",
		heading2: "CLP ha sido procesada con éxito. ",
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
									<h3 className="text-white">{`${initData.heading1} $5000 ${initData.heading2}`}</h3>
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
												<td>1</td>
											</tr>
											<tr>
												<th>Nombre</th>
												<td>Juan</td>
											</tr>
											<tr>
												<th>Apellido</th>
												<td>Perez</td>
											</tr>
											<tr>
												<th>Monto</th>
												<td>$5000</td>
											</tr>
                                            <tr>
												<th>Cantidad</th>
												<td>10</td>
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
};

export default BonoSuccess;
