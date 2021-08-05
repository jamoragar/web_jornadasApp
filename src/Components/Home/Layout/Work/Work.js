import React from 'react';

const Work = () => {
    return(
        <section className="section work-area bg-overlay overflow-hidden ptb_100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-6">
                        {/* Work Content */}
                        <div className="work-content text-center">
                            <h2 className="text-white">¿Cómo funciona la App?</h2>
                            <p className="text-white my-3 mt-sm-4 mb-sm-5">Sigue estos pasos una vez que descargues la App de Jornadas Magallánicas.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4">
                        {/* Single Work */}
                        <div className="single-work text-center p-3">
                            {/* Work Icon */}
                            <div className="work-icon">
                                <img className="avatar-md" src='/img/work_thumb_1.png' alt="" />
                            </div>
                            <h3 className="text-white py-3">Descarga nuestra Aplicación</h3>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        {/* Single Work */}
                        <div className="single-work text-center p-3">
                            {/* Work Icon */}
                            <div className="work-icon">
                                <img className="avatar-md" src='/img/work_thumb_2.png' alt="" />
                            </div>
                            <h3 className="text-white py-3">Registrate si aún no tienes cuenta</h3>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        {/* Single Work */}
                        <div className="single-work text-center p-3">
                            {/* Work Icon */}
                            <div className="work-icon">
                                <img className="avatar-md" src='/img/work_thumb_3.png' alt="" />
                            </div>
                            <h3 className="text-white py-3">Disfruta de las opciones</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Work;