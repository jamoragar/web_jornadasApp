import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { EditPerfilUser } from "./EditPerfilUser";
import { EditPerfilCompany } from "./EditPerfilComprany";

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

	if (userInfo) {
		return (
			<div className="dash_content">
				{userInfo.tipo === 'User'?
				<EditPerfilUser userInfo={userInfo} />
				:
				<EditPerfilCompany userInfo={userInfo}/>
			}
				
			</div>
		);
	}
};

export default Perfil;
