import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import BonoSorteo from './BonoSorte';
import DonacionesModal from './DonacionesModal';
import ComingSoon from '../../../ComingSoon/ComingSoon';

const ModalTransferencia = ({show, onHide}) => {
    return(
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Transferencia Bancaria - Banco Estado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Ayuda desde cualquier parte del país.</h4>
                <h6>Realiza tu depósito bancario desde cualquier lugar del país, teniendo en consideración los siguientes datos:</h6>
                <ul>
                    <li>* NOMBRE DEL BANCO: Banco Estado.</li>
                    <li>* NOMBRE DEL BENEFICIARIO: Club de Leones Cruz del Sur.</li>
                    <li>* RUT DEL BENEFICIARIO: 71.149.500-2.</li>
                    <li>* NUMERO DE CTA CORRIENTE DEL BENEFICIARIO: 91900176100.</li>
                    <li>* DIRECCIÓN DEL BENEFICIARIO: Libertador Bernardo O’Higgins N° 301, Punta Arenas.</li>
                    <li>* CORREO: RECURSOSLEONES@TIE.CL</li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

const ModalBingo = ({show, onHide}) => {
    return(
        <Modal show={show} onHide={onHide} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Bingo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src="/img/BINGO.jpg" alt="Bingo Jornadas Magallánicas"/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

const Features = () =>{

    const [showModalTransferencia, setShowModalTransferencia] = useState(false);
    const [showModalBingo, setShowModalBingo] = useState(false);
    const [showModalBonoSorteo, setShowModalBonoSorteo] = useState(false);
    const [showModalDonacion, setShowModalDonacion] = useState(false);
    const [showModalCS, setShowModalCS] = useState(false);

    return (
        <>
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
                    <div className="col-12 col-md-6 col-lg-3 res-margin"
                        onClick={() => setShowModalDonacion(true)}>
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
                    <div className="col-12 col-md-6 col-lg-3 res-margin"
                        onClick={() => setShowModalBonoSorteo(true)}>
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
                    <div className="col-12 col-md-6 col-lg-3 res-margin"
                        onClick={() => setShowModalBingo(true)}>
                        {/* Image Box */}
                        <div className="image-box text-center icon-1 p-5">
                            {/* Featured Image */}
                            <div className="featured-img mb-3">
                                <i className="fab fa-delicious fa-fw fa-3x" style={{color: '#9393f3'}}/>
                            </div>
                            {/* Icon Text */}
                            <div className="icon-text">
                                <h3 className="mb-2">Bingo</h3>
                                <p>Ahora tus cartones son digitales, y la forma de aportar igual. Haz click aquí e informáte de como comprar tus bingos!.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 res-margin">
                        {/* Image Box */}
                        <div className="image-box text-center icon-1 p-5"
                            onClick={() => setShowModalTransferencia(true)}>
                            {/* Featured Image */}
                            <div className="featured-img mb-3">
                                <i className="far fa-credit-card fa-3x" style={{color: 'rgb(157 243 147)'}}/>
                            </div>
                            {/* Icon Text */}
                            <div className="icon-text">
                                <h3 className="mb-2">Deposito Bancario</h3>
                                <p>Siempre podrás transferir directamente a nuestra cuenta del Banco Estado.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <ModalTransferencia show={showModalTransferencia} onHide={() => setShowModalTransferencia(false)} />
        <ModalBingo show={showModalBingo} onHide={() => setShowModalBingo(false)} />
        <BonoSorteo show={showModalBonoSorteo} onHide={() => setShowModalBonoSorteo(false)}/>
        <DonacionesModal show={showModalDonacion} onHide={() => setShowModalDonacion(false)} />
        <ComingSoon show={showModalCS} onHide={() => setShowModalCS(false)} />
        </>
    )
};

export default Features