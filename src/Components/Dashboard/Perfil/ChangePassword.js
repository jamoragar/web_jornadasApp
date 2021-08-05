import React, { useState } from "react";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";
import firebase from "firebase/app";
import { handleLogOut } from "../../../Config/Firebase";

export const ChangePassword = ({ show, onHide, userInfo }) => {
	const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
	const [alertShow, setAlertShow] = useState(false);
    console.log(userInfo.tipo);

	const handleUpdate = (e) => {
		e.preventDefault();
		setLoading(true);
		const { password, passwordActual, repeatPassword } = e.target.elements;
		let uid = userInfo.uid;
		if (
			!passwordActual.value.trim() ||
			!password.value.trim() ||
			!repeatPassword.value.trim()
		) {
			alert("campos incompletos");
			setLoading(false);
		} else if (passwordActual.value.trim() !== userInfo.password.trim()) {
			alert("Contraseña actual no coincide");
			setLoading(false);
		} else if (password.value.trim() !== repeatPassword.value.trim()) {
			alert("las Contraseñas no coinciden");
			setLoading(false);
		} else if (password.value.trim().length < 6) {
			alert("la Contraseñaa debe tener al menos 6 caracteres");
			setLoading(false);
		} else {
			firebase
				.database()
				.ref()
				.child(`Users/${uid}`)
				.update({
					password: password.value.trim(),
				})
				.then(() => {
					const updatPassword = { password: password.value.trim() };
					firebase
						.auth()
						.currentUser.updatePassword(updatPassword.password.trim());
					setLoading(false);
					setAlertShow(true);
					setTimeout(()=>{ handleLogOut(); }, 4000);
				})
				.catch(() => {
					alert("No se ha logrado actualizar el email");
					setLoading(false);
				});
		}
	};
	return (
		<>
			<Modal show={show} onHide={onHide}>
				<Modal.Header closeButton>
					<Modal.Title>Perfil</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form id="change-pass" onSubmit={handleUpdate}>
						<div className="contact-top">
							<h5 className="text-secondary fw-3 py-3">Cambiar Contraseña</h5>
						</div>
						<div className="form-group form-check">
							<input
								type="checkbox"
								className="form-check-input"
								onChange={() => setShowPass(!showPass)}
							/>
							<label className="form-check-label">Mostrar contraseñas</label>
						</div>
						<div className="row">
							<div className="col-12">
								<div className="form-group">
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text">
												<i className="fas fa-unlock-alt" />
											</span>
										</div>
										<input
											type={showPass ? null : "password"}
											className="form-control"
											name="passwordActual"
											defaultValue=""
											placeholder="Contraseña actual"
											required
										/>
									</div>
								</div>
								<div className="form-group">
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text">
												<i className="fas fa-unlock-alt" />
											</span>
										</div>
										<input
											type={showPass ? null : "password"}
											className="form-control"
											name="password"
											defaultValue=""
											placeholder="Nueva contraseña"
											required
										/>
									</div>
								</div>
								<div className="form-group">
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text">
												<i className="fas fa-unlock-alt" />
											</span>
										</div>
										<input
											type={showPass ? null : "password"}
											className="form-control"
											name="repeatPassword"
											defaultValue=""
											placeholder="Repetir nueva contraseña"
											required
										/>
									</div>
								</div>
							</div>
							<div className="col-12">
								<button
									title="Actualizar"
									className="btn btn-success w-100 mt-3"
									type="submit"
								>
									{loading ? <Spinner animation="border" /> : "Actualizar"}
								</button>
							</div>
							<div className="col-12 mt-3">
									<Alert
										show={alertShow}
										variant={"success"}
										onClose={() => setAlertShow(false)}
									>
										¡contraseña actualizada con éxito! su sesión se cerrará, y tendrá que ingresar de nuevamente.
									</Alert>
								</div>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button color="success" block onClick={onHide}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
