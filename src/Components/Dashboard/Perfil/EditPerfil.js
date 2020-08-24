import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import * as firebase from "firebase";
import { ModalExito } from "./ModalExito";
import { ChangePassword } from "./ChangePassword";
import {Redirect} from 'react-router-dom';

export const EditPerfil = (props) => {
	const { userInfo } = props;
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showPassModal, setShowPassModal] = useState(false);

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
				setShowModal(true);
			
			})
			.catch(() => {
				console.log("No se ha logrado actualizar el email");
				setLoading(false);
			});
	};

	if (userInfo) {
		console.log(userInfo);
		return (
			<>
				<div className="col-12 col-lg-7">
					<div className="welcome-intro">
						<h1 className="text-white">Perfil</h1>
						<p className="text-white my-4"></p>
					</div>
				</div>
				<div className="col-12 col-md-8 col-lg-5">
					<div className="contact-box bg-white text-center rounded p-4 p-sm-5 mt-5 mt-lg-0 shadow-lg">
						<form id="contact-form" onSubmit={handleUpdate}>
							<div className="contact-top">
								<h3 className="contact-title">Perfil</h3>
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
										className="btn btn-bordered w-100 mt-3"
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
								className="btn btn-bordered w-100 mt-3"
								onClick={() => setShowPassModal(true)}
							>
								{loading ? (
									<Spinner animation="border" />
								) : (
									"Cambiar contraseña"
								)}
							</button>
						</div>
					</div>
				</div>
				<ChangePassword
					userInfo={userInfo}
					show={showPassModal}
					onHide={() => setShowPassModal(false)}
				/>
				<ModalExito show={showModal} onHide={() => setShowModal(false)} />
			</>
		);
	}
};
