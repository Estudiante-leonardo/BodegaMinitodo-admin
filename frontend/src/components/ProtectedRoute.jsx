import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { token, user } = useContext(AuthContext);

    if (!token) {
        // No está logueado, lo mandamos al login
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && user?.rol !== 'admin') {
        // Está logueado pero no es admin, lo mandamos al inicio
        return <Navigate to="/" replace />;
    }

    return children;
};
