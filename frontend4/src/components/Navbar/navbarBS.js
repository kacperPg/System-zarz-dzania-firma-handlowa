import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../AuthProvider";
import { useContext } from "react";
import "./navbarBS.css";
import PrivateRoute from '../PrivateRoute'; // Import PrivateRoute component


export const NavBarBoodstrap = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        localStorage.removeItem('auth');
        navigate('/home');
    }

    return (
        <>
            <Navbar bg="myColor" expand="lg">
                <Navbar.Brand>
                    <h1 style={{ color: "grey" }}>Zarząd POL</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav ms-auto" />
                <Navbar.Collapse id="basic-navbar-nav ms-auto">
                    <Nav className="ml-auto">
                        {auth?.accessToken ? (
                            <>
                                    <NavDropdown title="Raporty">
                                    <PrivateRoute requiredPermissions={['PERM_VIEW_ORDER']}>
                                <Nav.Link as={Link} to="/RaportPage" exact>
                                    Raporty
                                </Nav.Link>
                                 </PrivateRoute>
                                </NavDropdown>
                                <NavDropdown title="Zamówienia">
                                <PrivateRoute requiredPermissions={['PERM_VIEW_ORDER']}>
                                    <Nav.Link as={Link} to="/OrdersPage">
                                        Zamówienia
                                    </Nav.Link>
                                    </PrivateRoute>
                                    </NavDropdown>
                                <NavDropdown title="Produkty">
                                    <PrivateRoute requiredPermissions={['PERM_VIEW_PRODUCTS']}>
                                        <NavDropdown.Item as={Link} to="/Products">
                                            Produkty
                                        </NavDropdown.Item>
                                    </PrivateRoute>
                                    <PrivateRoute requiredPermissions={['PERM_VIEW_TYPES']}>
                                        <NavDropdown.Item as={Link} to="/Types">
                                            Rodzaje
                                        </NavDropdown.Item>
                                    </PrivateRoute>
                                    <PrivateRoute requiredPermissions={['PERM_VIEW_CLIENTS']}>
                                        <NavDropdown.Item as={Link} to="/ClientPage">
                                            Klienci
                                        </NavDropdown.Item>
                                    </PrivateRoute>
                                </NavDropdown>
                                <NavDropdown title="Zarządzaj Magazynami">
                                    <PrivateRoute requiredPermissions={['PERM_VIEW_STATUS']}>
                                        <NavDropdown.Item as={Link} to="/WarehousesStatusPage">
                                            Stan Magazynu
                                        </NavDropdown.Item>
                                    </PrivateRoute>
                                    <PrivateRoute requiredPermissions={['PERM_VIEW_WAREHOUSES']}>
                                        <NavDropdown.Item as={Link} to="/WarehousePage">
                                            Magazyny
                                        </NavDropdown.Item>
                                    </PrivateRoute>
                                </NavDropdown>
                                <NavDropdown title="Zarządzaj Użytkownikami">
                                    <PrivateRoute requiredPermissions={['PERM_VIEW_USERS']}>
                                        <NavDropdown.Item as={Link} to="/UserPage">
                                            Użytkownicy
                                        </NavDropdown.Item>
                                    </PrivateRoute>
                                    <PrivateRoute requiredPermissions={['PERM_VIEW_USERS']}>
                                        <NavDropdown.Item as={Link} to="/RolesPage">
                                            Profile
                                        </NavDropdown.Item>
                                    </PrivateRoute>
                                </NavDropdown>
                                <Nav.Link onClick={logout}>
                                    Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" exact>
                                    Logowanie
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register">
                                    Rejestracja
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};
