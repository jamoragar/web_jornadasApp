import React, {useState} from 'react';
import ComingSoon from '../../../ComingSoon/ComingSoon';

const Footer = () => {
    const [showModalCS, setShowModalCS] = useState(false);
    return (
        <>
        <div>
            <footer className="footer-area footer-fixed">
                {/* Footer Top */}
                <div className="footer-top ptb_100">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-6 col-lg-3">
                                {/* Footer Items */}
                                <div className="footer-items">
                                    {/* Logo */}
                                    <a className="navbar-brand" href="/#">
                                        <img className="logo" src='/img/logo.png' alt="Jornadas por la Rehabilitación en Magallanes" />
                                    </a>
                                    <br />
                                    <br />
                                    <br />
                                    <div className="social-icons d-flex">
                                        <a className='facebook' href="https://www.facebook.com/lasjornadas/">
                                            <i className='fab fa-facebook-f' />
                                            <i className='fab fa-facebook-f' />
                                        </a>
                                        <a className='twitter' href="https://twitter.com/lasjornadas">
                                            <i className='fab fa-twitter' />
                                            <i className='fab fa-twitter' />
                                        </a>
                                        <a className='insta' href="https://www.instagram.com/lasjornadas/">
                                            <i className='fab fa-instagram' />
                                            <i className='fab fa-instagram' />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                {/* Footer Items */}
                                <div className="footer-items">
                                    {/* Footer Title */}
                                    <h3 className="footer-title mb-2">Links Útiles</h3>
                                    <ul>
                                        <li className="py-2"><a className='link-util' href="/#">Donar</a></li>
                                        <li className="py-2"><a className='link-util' href="/#">Bonos de Sorteo</a></li>
                                        <li className="py-2"><a className='link-util' href="/#">Bingo</a></li>
                                        <li className="py-2"><a className='link-util' href="/contacto">Contacto</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                {/* Footer Items */}
                                <div className="footer-items">
                                    {/* Footer Title */}
                                    <h3 className="footer-title mb-2">Otros</h3>
                                    <ul>
                                        <li className="py-2"><a className='link-util' href="https://www.leonescruzdelsur.cl/">Leones Cruz del Sur</a></li>
                                        <li className="py-2"><a className='link-util' href="https://www.jornadas.cl/">Jornadas</a></li>
                                        <li className="py-2"><a className='link-util' href="http://www.rehabilitamos.org/">Corporación de Rehabilitación</a></li> 
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                {/* Footer Items */}
                                <div className="footer-items">
                                    {/* Footer Title */}
                                    <h3 className="footer-title mb-2">Descargar App</h3>
                                    {/* Store Buttons */}
                                    <div className="button-group store-buttons store-black d-flex flex-wrap">
                                        {/* <a onClick={() => setShowModalCS(true)}> */}
                                        <a href='https://play.google.com/store/apps/details?id=cl.SmartApps.AppJornadasMagallanicas'>
                                            <img src='/img/google-play-black.png' alt="Jornadas Android" />
                                        </a>
                                        <a onClick={() => setShowModalCS(true)}>
                                            <img src='/img/app-store-black.png' alt="Jornadas Iphone" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {/* Copyright Area */}
                                <div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                                    {/* Copyright Left */}
                                    <div className="copyright-left">© Copyrights 2020 Leones Cruz del Sur all rights reserved.</div>
                                    {/* Copyright Right */}
                                    <div className="copyright-right">Hecho con <i className="fas fa-heart" /> Por <a className='copyright-a' href="https://www.smartapps.cl/">Smart Apps SpA</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        <ComingSoon show={showModalCS} onHide={() => setShowModalCS(false)} />
        </>
    )
};

export default Footer;