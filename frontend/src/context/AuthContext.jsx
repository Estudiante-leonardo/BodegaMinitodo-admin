import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../config/supabaseClient';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(undefined); // undefined = cargando
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Obtiene la sesión inicial (si hay una cookie/token guardado)
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Escucha cambios de autenticación (login, logout, expiración)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    return (
        <AuthContext.Provider value={{ session, user: session?.user ?? null, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook de acceso rápido
export const useAuth = () => useContext(AuthContext);
