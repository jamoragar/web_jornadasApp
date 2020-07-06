const Handler = (err_code) => {
    switch(err_code){
        case 'auth/wrong-password':
            return('E-mail o password incorrecto.');

        case 'auth/invalid-email':
            return('No puede iniciar sesión sin antes ingresar sus credenciales.');

        case 'auth/user-not-found':
            return('Usuario no encontrado, verifique sus credenciales e intente nuevamente.');

        case 'auth/email-already-in-use':
            return('El e-mail que ha ingresado ya se encuentra en uso.');
        default:
            return ('Error Desconocido: Contactese con el administrador');
    };
};
 
export default Handler;