import React from "react";
import Header from "../NavBar/NavBar";
import Footer from "../Home/Layout/Footer/Footer";

const DonarFailure = (props) => {
	const initData = {
		state: "No hemos podido procesar tu pago.",
        heading1: "Su aporte por",
        heading2: "CLP no se ha logrado llevar a cabo.",
		content: "Por favor intenta nuevamente, gracias.",
		btnText: "Volver al inicio",
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
									<h1 className="text-danger">{initData.state}</h1>
									<h3 className="text-white">{`${initData.heading1} $5000 ${initData.heading2}`}</h3>
									<p className="text-white my-4">{initData.content}</p>
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
};

export default DonarFailure;