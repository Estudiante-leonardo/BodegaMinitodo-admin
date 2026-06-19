import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
            if (authError) throw authError;
            navigate('/admin');
        } catch (err) {
            setError('Credenciales incorrectas. Verifica tu email y contraseña.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-950">

            {/* ── Fondo con burbujas decorativas ── */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-700/30 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -right-32 w-80 h-80 bg-brand-600/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-brand-800/25 rounded-full blur-3xl" />
                {/* Grid sutil */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(244,63,94,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(244,63,94,.5) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            {/* ── Card Glassmorphism ── */}
            <div className="glass rounded-3xl p-10 w-full max-w-md shadow-2xl shadow-black/50 animate-fade-up relative z-10">

                {/* Logo / Ícono */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mb-4 shadow-lg shadow-brand-600/40 animate-pulse-glow">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        minitodo <span className="text-brand-400">Admin</span>
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">Panel de administración de inventario</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 px-4 py-3 rounded-xl bg-brand-900/50 border border-brand-500/30 text-brand-300 text-sm flex items-center gap-2">
                        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                            Correo electrónico
                        </label>
                        <input
                            id="login-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@minitodo.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm
                                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                                       transition-all duration-200 hover:border-white/20"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                            Contraseña
                        </label>
                        <input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm
                                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                                       transition-all duration-200 hover:border-white/20"
                        />
                    </div>

                    <button
                        id="login-submit"
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-3.5 rounded-xl font-semibold text-sm text-white
                                   bg-gradient-to-r from-brand-600 to-brand-500
                                   hover:from-brand-500 hover:to-brand-400
                                   shadow-lg shadow-brand-700/40
                                   disabled:opacity-60 disabled:cursor-not-allowed
                                   transition-all duration-200 active:scale-[0.98]"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Ingresando...
                            </span>
                        ) : 'Ingresar al Panel'}
                    </button>
                </form>

                <p className="text-center text-xs text-slate-600 mt-8">
                    Acceso restringido · Solo administradores
                </p>
            </div>
        </div>
    );
};

export default Login;
