import React, {useState, useEffect} from 'react';
import ComingSoon from '../../../ComingSoon/ComingSoon';

const initData = {
    heading: "App Jornadas Magallánicas esta disponible para todos los dispositivos.",
    headingText: "Descarga la aplicación de las Jornadas, y forma parte de esta cruzada por la solidaridad. Dentro de la App podrás hacer seguimiento a tus donaciones, bonos de sorteo y cartones de Bingo!",
    headingTexttwo: "Descarga la aplicación de las Jornadas, y forma parte de esta cruzada por la solidaridad. Dentro de la App podrás hacer seguimiento a tus donaciones, bonos de sorteo y cartones de Bingo!",
    headingSlug: "* Disponible para dispositivos Android y Iphone",
    playImg: "/img/google-play.png",
    appleImg: "/img/app-store.png",
}

const Download = () => {
    const [data ,setData] = useState('');
    const [showModalCS, setShowModalCS] = useState(false);

    useEffect(() => {
        setData(initData)
    }, []);

    return (
        <>
        <section className="section download-area overlay-dark ptb_100">
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    {/* Download Text */}
                    <div className="download-text text-center">
                    <h2 className="text-white">{data.heading}</h2>
                    <p className="text-white my-3 d-none d-sm-block">{data.headingText}</p>
                    <p className="text-white my-3 d-block d-sm-none">{data.headingTexttwo}</p>
                    {/* Store Buttons */}
                    <div className="button-group store-buttons d-flex justify-content-center">
                        {/* <a onClick={() => setShowModalCS(true)}> */}
                        <a href='https://play.google.com/store/apps/details?id=cl.SmartApps.AppJornadasMagallanicas'>
                            <img src={data.playImg} alt="" />
                        </a>
                        <div style={{cursor:'pointer'}} onClick={() => setShowModalCS(true)}>
                            <img src={data.appleImg} alt="" />
                        </div>
                    </div>
                    <span className="d-inline-block text-white fw-3 font-italic mt-3">{data.headingSlug}</span>
                    </div>
                </div>
                </div>
            </div>
        </section>
        <ComingSoon show={showModalCS} onHide={() => setShowModalCS(false)} />
        </>
    );
};

export default Download;