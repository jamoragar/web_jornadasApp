import React from 'react';

const ContactForm = () => {
    
    const submitHangler = (event) => {
    event.preventDefault();
    console.log(event);
    };

    return(
        <div className="contact-box text-center">
            <form
            onSubmit={submitHangler}
            className="contact-form"
            noValidate="novalidate"
            >
                <div className="row">
                    <div className="col-12">
                    <div className="form-group">
                        <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Nombre"
                        required="required"
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="E-mail"
                        required="required"
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="text"
                        className="form-control"
                        name="subject"
                        placeholder="Asunto"
                        required="required"
                        />
                    </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <textarea
                            className="form-control"
                            name="message"
                            placeholder="Mensaje"
                            required="required"
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <button
                            type="submit"
                            className="btn btn-lg btn-block mt-3"><span className="text-white pr-3"><i className="fas fa-paper-plane" /></span>
                            Enviar Mensaje
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ContactForm;