import React, {useState, useEffect} from 'react';
import ComingSoon from '../../../ComingSoon/ComingSoon';


const initData = {
    heading: "Descarga la App de las Jornadas Magallánicas",
    content: "Hemos creado una aplicación especial para ti! Donde podrás, no solo aportar para esta cruzada de solaridad, si no que también comprar bonos de sorteo y cartones para jugar Bingo en las fechas correspondientes.",
    headingSlug: "* Disponible para dispositivos Android y Iphone",
    playImg: "/img/google-play.png",
    appleImg: "/img/app-store.png",
    heroThumb: "/img/welcome_mockup.png"
}

const HeroSection = () => {
    const [data, setData] = useState('');
    const [showModalCS, setShowModalCS] = useState(false);

    useEffect(() =>{
        setData(initData);
    },[]);
    return (
        <>
        <section id="home" className="section welcome-area bg-overlay overflow-hidden d-flex align-items-center">
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-12 col-md-6 col-lg-6'>
                        <div className="welcome-intro">
                            <h1 className="text-white">{data.heading}</h1>
                            <p className="text-white my-4">{data.content}</p>
                            <div className="button-group store-buttons d-flex">
                                {/* <a onClick={() => setShowModalCS(true)}> */}
                                <a href='https://play.google.com/store/apps/details?id=cl.SmartApps.AppJornadasMagallanicas'>
                                <img src={data.playImg} alt="" />
                                </a>
                                <div style={{cursor:"pointer"}} onClick={() => setShowModalCS(true)}>
                                    <img src={data.appleImg} alt="" />
                                </div>
                            </div>
                            <span className="d-inline-block text-white fw-3 font-italic mt-3">{data.headingSlug}</span>
                        </div>
                    </div>
                    <div className="col-12 col-md-3 col-lg-5">
                        {/* Welcome Thumb */}
                        <div className="welcome-thumb mx-auto">
                            <img src={data.heroThumb} alt="App Jornadas Magallanicas" />
                        </div>
                    </div>
                    <div className="col-12 col-md-3 col-lg-1">
                        {/* Welcome Thumb */}
                        <div className="welcome-thumb text-center mx-auto">
                        {/* Play Button */}
                        <a className="play-btn" data-fancybox href="https://www.youtube.com/embed/9R2iEO3lSpc">
                            <div className="btn-circle play-animation" />
                            <div className="btn-circle play-animation animation-short" />
                            {/* Play Icon */}
                            <div className="play-icon">
                                <i className='fa fa-play' />
                            </div>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shape-bottom">
                <svg viewBox="0 0 1920 310" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="svg replaced-svg">
                    <title>sApp Shape</title>
                    <desc>Created with Sketch</desc>
                    <defs />
                    <g id="sApp-Landing-Page" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                    <g id="sApp-v1.0" transform="translate(0.000000, -554.000000)" fill="#FFFFFF">
                        <path d="M-3,551 C186.257589,757.321118 319.044414,856.322454 395.360475,848.004007 C509.834566,835.526337 561.525143,796.329212 637.731734,765.961549 C713.938325,735.593886 816.980646,681.910577 1035.72208,733.065469 C1254.46351,784.220361 1511.54925,678.92359 1539.40808,662.398665 C1567.2669,645.87374 1660.9143,591.478574 1773.19378,597.641868 C1848.04677,601.75073 1901.75645,588.357675 1934.32284,557.462704 L1934.32284,863.183395 L-3,863.183395" id="sApp-v1.0" />
                    </g>
                    </g>
                </svg>
            </div>
        </section>
        <ComingSoon show={showModalCS} onHide={() => setShowModalCS(false)} />
        </>
    )
};

export default HeroSection;