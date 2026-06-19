import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
    {
        to: '/admin',
        label: 'Productos',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
            </svg>
        ),
    },
];

const AdminLayout = ({ children }) => {
    const { user, signOut } = useAuth();

    return (
        <div className="flex h-screen overflow-hidden bg-dark-950">

            {/* ══════════════════════════════
                SIDEBAR
            ══════════════════════════════ */}
            <aside className="w-64 shrink-0 flex flex-col glass border-r border-white/5 z-20">

                {/* Logo */}
                <div className="px-6 py-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md shadow-brand-700/40">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white leading-tight">minitodo</p>
                            <p className="text-[10px] text-brand-400 font-semibold uppercase tracking-wider">Admin Panel</p>
                        </div>
                    </div>
                </div>

                {/* Navegación */}
                <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-3 mb-3">
                        Gestión
                    </p>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                                    isActive
                                        ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            {item.icon}
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Usuario + Logout */}
                <div className="px-4 py-4 border-t border-white/5">
                    <div className="glass rounded-xl px-3 py-3">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xs font-bold">
                                {user?.email?.charAt(0).toUpperCase() ?? 'A'}
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-white truncate">{user?.email ?? 'Administrador'}</p>
                                <p className="text-[10px] text-brand-400">Admin</p>
                            </div>
                        </div>
                        <button
                            id="sidebar-logout"
                            onClick={signOut}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                                       bg-brand-600/10 hover:bg-brand-600/25 border border-brand-500/20
                                       text-brand-400 hover:text-brand-300 text-xs font-semibold
                                       transition-all duration-150"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </aside>

            {/* ══════════════════════════════
                CONTENIDO PRINCIPAL
            ══════════════════════════════ */}
            <main className="flex-1 overflow-y-auto">
                {/* Decoración de fondo */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
                    <div className="absolute -top-20 right-10 w-80 h-80 bg-brand-700/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-1/3 w-60 h-60 bg-brand-600/8 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
