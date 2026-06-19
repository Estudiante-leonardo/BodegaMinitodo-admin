import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
    const { session, loading } = useAuth();

    // Muestra spinner mientras Supabase verifica la sesión inicial
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-dark-950">
                <div className="w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
