import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { Spinner } from "react-bootstrap";
import TableDonaciones from "./TableDonaciones";

const Donaciones = ({subtipo}) => {
	const [donaciones, setDonaciones] = useState("EMPTY");
	console.log(subtipo)
	useEffect(() => {
		firebase
			.database()
			.ref("/Donaciones")
			.on("value", (snapshot) => {
				snapshot.val()
					? setDonaciones(snapshot.val())
					: setDonaciones("NO_DATA_FOUND");
			});
	}, []);

	if (donaciones !== "EMPTY") {
		if(subtipo === 'Admin'){
			return (
				<div className="dash_content">
					<h1>Donaciones:</h1>
					<TableDonaciones donaciones={donaciones} />
				</div>
			);
		}else{
			return(
				<div className='dash_content'>
				<br />
					<h2>No tiene permitido ingresar a esta area.</h2>
				</div>
			);
		}
	} else {
		return (
			<div className="dash_content">
				<Spinner animation="grow" variant="primary" />
				<Spinner animation="grow" variant="secondary" />
				<Spinner animation="grow" variant="success" />
				<Spinner animation="grow" variant="danger" />
				<Spinner animation="grow" variant="warning" />
				<Spinner animation="grow" variant="info" />
				<Spinner animation="grow" variant="light" />
				<Spinner animation="grow" variant="dark" />
			</div>
		);
	}
};

export default Donaciones;
