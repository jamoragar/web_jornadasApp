import React from "react";
import * as firebase from "firebase";

export const EditPerfil = (props) => {
	const { userInfo } = props;
	console.log(userInfo)

	const handleUpdate = (e) => {
		e.preventDefault();
		const { nombre, apellido, email } = e.target.elements;
		let uid = userInfo.uid;
		firebase
			.database()
			.ref()
			.child(`Users/${uid}`)
			.update({
				nombre: nombre.value,
				apellido: apellido.value,
				email: email.value,
			})
			.then(() => {
				const update = { email: email.value};
				firebase.auth().currentUser.updateEmail(update.email);
			})
			.catch(() => {
				console.log("No se ha logrado actualizar el email");
			});
	};

	if (userInfo) {
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
									<div className="form-group">
										<div className="input-group">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fas fa-unlock-alt" />
												</span>
											</div>
											<input
												type="password"
												className="form-control"
												name="password"
												defaultValue={userInfo.password}
												placeholder="Password"
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
										Actualizar
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</>
		);
	}
};
