import React, {useState, useEffect} from "react";

const DonarSuccess = (props) => {
	const [data, setData] = useState([]);
	
	useEffect(() => {
		const querystring = window.location.search;
		setData([querystring.split('?')[1], querystring.split('?')[2]]);
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
									setTimeout(() => {document.getElementById('form-return').submit()}, 1173)
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
