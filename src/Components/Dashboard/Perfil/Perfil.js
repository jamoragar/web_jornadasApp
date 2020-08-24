import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { EditPerfil } from "./EditPerfil";

const Perfil = ({ type, uid }) => {
	const [userInfo, setUserInfo] = useState({});

	useEffect(() => {
		firebase
			.database()
			.ref(`Users/${uid}`)
			.once("value", (snapshot) => {
				setUserInfo(snapshot.val());
			});
	}, []);

	return (
		<div className="dash_content">
			<EditPerfil userInfo={userInfo} />
		</div>
	);
};

export default Perfil;
