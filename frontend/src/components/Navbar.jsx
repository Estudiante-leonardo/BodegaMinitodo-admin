import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!token) return null; // No mostrar navbar si no hay sesión

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger shadow-sm border-bottom border-warning border-3">
            <div className="container-fluid px-5">
                <Link className="navbar-brand fw-bold d-flex align-items-center text-warning" to="/">
                    <span className="fs-3 me-2">🦁</span> Leoncito
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-semibold">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Inicio</Link>
                        </li>
                        {user?.rol === 'admin' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Administración</Link>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex align-items-center">
                        <span className="text-warning me-3 fw-bold">Hola, {user?.username}</span>
                        <button className="btn btn-warning text-dark btn-sm fw-bold shadow-sm" onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;