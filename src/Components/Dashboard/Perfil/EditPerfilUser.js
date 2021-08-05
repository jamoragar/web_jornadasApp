import React, { useState } from "react";
import { Spinner, Alert } from "react-bootstrap";
import firebase from "firebase/app";
import { ChangePassword } from "./ChangePassword";
import { handleLogOut } from "../../../Config/Firebase";

export const EditPerfilUser = (props) => {
	const { userInfo } = props;
	const [loading, setLoading] = useState(false);
	const [showPassModal, setShowPassModal] = useState(false);
	const [alertShow, setAlertShow] = useState(false);

	const handleUpdate = (e) => {
		e.preventDefault();
		setLoading(true);
		const { nombre, apellido, email } = e.target.elements;
		let uid = userInfo.uid;
		firebase
			.database()
			.ref()
			.child(`Users/${uid}`)
			.update({
				nombre: nombre.value.trim(),
				apellido: apellido.value.trim(),
				email: email.value.trim(),
			})
			.then(() => {
				const update = { email: email.value };
				firebase.auth().currentUser.updateEmail(update.email.trim());
				console.log("Datos Actualizados con exito.");
				setLoading(false);
				setAlertShow(true);
				setTimeout(()=>{ handleLogOut(); }, 4000);
			})
			.catch(() => {
				console.log("No se ha logrado actualizar el email");
				setLoading(false);
			});
	};

	if (userInfo) {
		return (
			<>
				<div className="col-12 col-md-8 col-lg-10">
					<div className="contact-box bg-white text-center rounded p-4 p-sm-5 mt-5 mt-lg-0 shadow-lg">
						<form id="contact-form" onSubmit={handleUpdate}>
							<div className="contact-top">
								<h3 className="contact-title">Perfil Usuario</h3>
								<h5 className="text-secondary fw-3 py-3">Editar información</h5>
							</div>
							<div className="row">
								<div className="col-12">
									<div className="form-group">
										<div className="input-group">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fas fa-user-alt" />
												</span>
											</div>
											<input
												type="text"
												className="form-control"
												name="nombre"
												defaultValue={userInfo.nombre}
												placeholder="Nombre"
												required="required"
											/>
										</div>
									</div>
									<div className="form-group">
										<div className="input-group">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fas fa-user-alt" />
												</span>
											</div>
											<input
												type="text"
												className="form-control"
												name="apellido"
												defaultValue={userInfo.apellido}
												placeholder="Apellido"
												required="required"
											/>
										</div>
									</div>
									<div className="form-group">
										<div className="input-group">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fas fa-envelope-open" />
												</span>
											</div>
											<input
												type="email"
												className="form-control"
												name="email"
												defaultValue={userInfo.email}
												placeholder="Email"
												required="required"
											/>
										</div>
									</div>
								</div>
								<div className="col-12">
									<button
										title="Actualizar"
										className="w-25  mt-3"
										type="submit"
									>
										{loading ? <Spinner animation="border" /> : "Actualizar"}
									</button>
								</div>
							</div>
						</form>
						<div className="col-12">
								<button
									title="PassModal"
									className=" w-25 mt-3"
									onClick={() => setShowPassModal(true)}
								>
									{loading ? (
										<Spinner animation="border" />
									) : (
										"Cambiar contraseña"
									)}
								</button>
							</div>
							<div className="mt-3">
								<Alert
									show={alertShow}
									variant={"success"}
								>
									¡Datos Actualizados con éxito! su sesión se cerrará, y tendrá que ingresar de nuevamente.
								</Alert>
							</div>
					</div>
				</div>
				<ChangePassword
					userInfo={userInfo}
					show={showPassModal}
					onHide={() => setShowPassModal(false)}
				/>
			</>
		);
	}
};
