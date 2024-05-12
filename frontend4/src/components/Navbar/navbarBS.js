import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";
import "./navbarBS.css"
export const NavBarBoodstrap=() =>{
    return (
        <>
   <Navbar bg="myColor" expand="lg" >
                <Navbar.Brand>
                    <h1 style={{ color: "grey"  }}>Zarząd POL</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav ms-auto" />
                <Navbar.Collapse id="basic-navbar-nav ms-auto">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/home" exact>
                            Raporty
                        </Nav.Link>
                        <Nav.Link as={Link} to="/home">
                            Zamówienia
                        </Nav.Link>
                        <NavDropdown title="Produkty">
                            <NavDropdown.Item as={Link} to="/Products">
                                Produkty
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/Types">
                                Rodzaje
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/home">
                                Producenci
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Zarządzaj Magazynami">
                            <NavDropdown.Item as={Link} to="/WarehousesStatusPage">
                                Stan Magazynu
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/WarehousePage">
                                Magazyny
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Zarządzaj Użytkownikami">
                            <NavDropdown.Item as={Link} to="/home">
                                Użytkownicy
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/home">
                                Profile
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/login" exact>
                            Logowanie
                        </Nav.Link>
                        <Nav.Link as={Link} to="/register">
                            Rejestracja
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
      );
}