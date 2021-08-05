import React from 'react';
import {Modal} from 'react-bootstrap';

const ComingSoon = ({show, onHide}) => {
    return(
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Próximamente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Estamos trabajando en este apartado. Te sorprenderémos dentro de poco!</h5>
            </Modal.Body>
        </Modal>
    );
};

export default ComingSoon;