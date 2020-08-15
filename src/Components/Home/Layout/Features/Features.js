import React from 'react';

const Features = () =>{
    return (
        <section id="features" className="section features-area style-two overflow-hidden ptb_100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-7">
                        {/* Section Heading */}
                        <div className="section-heading text-center">
                            <h2>¿Deseas ser parte de las Jornadas por la Rehabilitación en Magallanes?”</h2>
                            <p className="d-none d-sm-block mt-4">El Club de Leones Punta Arenas Cruz del Sur te invita a hacer CLICK, y en la opción que más te acomode, hoy no existen brechas para ayudar y ser parte de las Jornadas por la Rehabilitación en Magallanes. Las formas de aportar son las siguientes:</p>
                            <p className="d-block d-sm-none mt-4">El Club de Leones Punta Arenas Cruz del Sur te invita a hacer CLICK, y en la opción que más te acomode, hoy no existen brechas para ayudar y ser parte de las Jornadas por la Rehabilitación en Magallanes. Las formas de aportar son las siguientes:</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-4 res-margin">
                        {/* Image Box */}
                        <div className="image-box text-center icon-1 p-5">
                            {/* Featured Image */}
                            <div className="featured-img mb-3">
                                <i className="fas fa-donate fa-fw fa-3x" style={{color: '#6ca9f9'}}/>
                            </div>
                            {/* Icon Text */}
                            <div className="icon-text">
                                <h3 className="mb-2">Donación</h3>
                                <p>Haz click aquí! Completa el formulario y agrega tu aporte, entre más aportes recibimos, más corazones se conectan con la Rehabilitación</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 res-margin">
                        {/* Image Box */}
                        <div className="image-box text-center icon-1 p-5">
                            {/* Featured Image */}
                            <div className="featured-img mb-3">
                                <i className="fas fa-receipt fa-fw fa-3x" style={{color: '#ff846e'}}/>
                            </div>
                            {/* Icon Text */}
                            <div className="icon-text">
                                <h3 className="mb-2">Bono de Sorteo</h3>
                                <p>Por cada bono que compres estarás participando de una parcela ubicada al sur de Punta Arenas.  Entra más bonos compres, más posibilidades tienes de ganar y de apoyar la cruzada solidaria del sur del mundo.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 res-margin">
                        {/* Image Box */}
                        <div className="image-box text-center icon-1 p-5">
                            {/* Featured Image */}
                            <div className="featured-img mb-3">
                                <i className="fab fa-delicious fa-fw fa-3x" style={{color: '#9393f3'}}/>
                            </div>
                            {/* Icon Text */}
                            <div className="icon-text">
                                <h3 className="mb-2">Bingo</h3>
                                <p>Ahora tus cartones son digitales, y la forma de aportar igual, compra tu cartón y recíbelo en tu correo electrónico. La Rehabilitación no tiene límites y nuestra forma de aportar tampoco.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Features