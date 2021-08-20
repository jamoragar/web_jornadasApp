import React, {useState} from 'react';
import Logo from '../../imgs/logo.png'
import {Navbar, Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import Login from '../Login/Login';
import { handleLogOut } from '../../Config/Firebase';

const Header = ({auth, name, uid}) => {
    const [showModal, setShowModal] = useState(false);
    return(
        <Navbar style={{backgroundColor:'#03255F'}} collapseOnSelect expand="lg" fixed='top'>
            <Navbar.Brand href="/">
                <img src={Logo} width='300px' alt='Jornadas por la rehabilitación' />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/"><i className="fas fa-home fa-fw" />Inicio</Nav.Link>
                    <Nav.Link href="/DescargaBonos"><i className="fas fa-pager fa-fw" />Descarga de Bonos</Nav.Link>
                    <Nav.Link href="#"><i className="fas fa-mobile-alt fa-fw" />Aplicación</Nav.Link>
                    <Nav.Link href="/Contacto"><i className="fas fa-phone fa-fw" />Contacto</Nav.Link>
                </Nav>
                <Nav>
                    {
                        auth ? 
                        (
                            <DropdownButton title={`Bienvenido(a): ${name}`}>
                                <Dropdown.Item href={`/Dashboard/${uid}/Perfil`}><i className="fas fa-user-edit fa-fw" /> Perfil</Dropdown.Item>
                                <Dropdown.Item href={`/Dashboard/${uid}`}><i className="fas fa-tachometer-alt fa-fw" />Dashboard</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href='#' onClick={() => handleLogOut()}><i className="fas fa-door-open fa-fw" /> Salir</Dropdown.Item>
                            </DropdownButton>
                        )
                        :
                        (
                            <div className='Login' onClick={() => setShowModal(true)}>
                                <i className="fas fa-sign-in-alt fa-fw" />Iniciar Sesión
                            </div>
                        )
                    }
                </Nav>
            </Navbar.Collapse>
            <Login show={showModal} onHide={() => setShowModal(false)}/>
        </Navbar>
    )
}

export default Header;