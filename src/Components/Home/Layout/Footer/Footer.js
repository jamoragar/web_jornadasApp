import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className="height-emulator d-none d-lg-block" />
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
                                    <p className="mt-2 mb-3">texto...</p>
                                    
                                    <div className="social-icons d-flex">
                                        <a className='facebook' href="/#">
                                            <i className='fab fa-facebook-f' />
                                            <i className='fab fa-facebook-f' />
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
                                    <div className="copyright-right">Hecho con <i className="fas fa-heart" /> Por <a href="/https://www.smartapps.cl/">Smart Apps SpA</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
};

export default Footer;