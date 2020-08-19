import React, {useState} from 'react';
import {Spinner} from 'react-bootstrap';
import axios from 'axios';


const ContactForm = () => {
    
    const API_PATH = 'https://www.appjornadasmagallanicas.cl/api/form/form_submit.php';

    const [btnText, setBtnText] = useState(false);
    const [emailSended, setEmailSended] = useState(false);

    const submitHangler = (event) => {
        event.preventDefault();

        setBtnText(true);

        const {name, email, subject, message} = event.target.elements;
        console.log(name.value, email.value, subject.value, message.value);

        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: {'content-type': 'application/json'},
            data: {
                name: name.value.trim(),
                email:email.value.trim(),
                subject: subject.value.trim(),
                message: message.value.trim()
            }
        }).then(result => {
            console.log(result)
            setBtnText(false);
            setEmailSended(true);
        })
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
                            className="btn btn-lg btn-block mt-3">
                            {
                                btnText ?
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                :
                                    (<>
                                    <span className="text-white pr-3">
                                        <i className="fas fa-paper-plane" />
                                    </span>
                                    Enviar Mensaje
                                    </>)
                            }
                        </button>
                        {
                            emailSended ? (<h4>Mensaje enviado correctamente.</h4>): null
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ContactForm;