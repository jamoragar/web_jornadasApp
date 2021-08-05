import React from 'react';
import ContactForm from './ContactForm';
import Footer from '../Footer/Footer';

const Contacto = () => {
    return(
        <>
        <section id="contact" className="contact-area bg-gray ptb_100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-6">
                        {/* Section Heading */}
                        <div className="section-heading text-center">
                            <h2 className="text-capitalize">Contáctanos!</h2>
                            <p className="d-none d-sm-block mt-4">Haznos saber cualquier inquietud o comentario que tengas. Te responderemos a la brevedad.</p>
                            <p className="d-block d-sm-none mt-4">Haznos saber cualquier inquietud o comentario que tengas. Te responderemos a la brevedad.</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-between">
                    <div className="col-12 col-md-5">
                        {/* Contact Us */}
                        <div className="contact-us">
                            <p className="mb-3">Siempre puedes visitarnos en la sede de nuestro club o llamarnos a nuestros números telefónicos.</p>
                            <ul>
                                <li className="py-2">
                                    <a className="media" href="/#">
                                        <div className="social-icon mr-3">
                                            <i className='fas fa-home' />
                                        </div>
                                        <span className="link-util media-body align-self-center">O'Higgins 301, Punta Arenas</span>
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="media" href="/#">
                                        <div className="social-icon mr-3">
                                            <i className='fas fa-phone-alt' />
                                        </div>
                                        <span className="link-util media-body align-self-center">+56 9 6872 8049 - +56 61 2 244015</span>
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="media" href="/#">
                                        <div className="social-icon mr-3">
                                            <i className='fas fa-envelope' />
                                        </div>
                                        <span className="link-util media-body align-self-center">contacto@appjornadasmagallanicas.cl</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 pt-4 pt-md-0">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
        <section className="section map-area">
            <iframe title="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1222.3846778034736!2d-70.89792230483371!3d-53.15716625953678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbdb2638198e9ef83%3A0xf6bc0c1d5be65291!2sClub%20de%20Le%C3%B3nes%20Cruz%20del%20Sur!5e0!3m2!1ses!2scl!4v1597550783745!5m2!1ses!2scl" style={{border: 0}} allowFullScreen width={100} height={100} />
        </section>
        <Footer />
        </>
    )
};

export default Contacto;