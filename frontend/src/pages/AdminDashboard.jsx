import { useState, useEffect, useCallback } from 'react';
import {
    getProductos,
    insertProducto,
    updateProducto,
    deleteProducto,
} from '../services/productosService';

/* ──────────────────────────────────────────────
   TOAST de notificación
────────────────────────────────────────────── */
const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const t = setTimeout(onClose, 3500);
        return () => clearTimeout(t);
    }, [onClose]);

    const colors = type === 'success'
        ? 'bg-emerald-900/80 border-emerald-500/40 text-emerald-300'
        : 'bg-brand-900/80 border-brand-500/40 text-brand-300';

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl border backdrop-blur-xl shadow-2xl animate-fade-up ${colors}`}>
            {type === 'success'
                ? <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
                : <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            }
            <span className="text-sm font-medium">{message}</span>
        </div>
    );
};

/* ──────────────────────────────────────────────
   MODAL de crear / editar producto
────────────────────────────────────────────── */
const ProductoModal = ({ producto, onClose, onSave }) => {
    const isEdit = Boolean(producto?.id);
    const [form, setForm] = useState({
        nombre:    producto?.nombre     ?? '',
        precio:    producto?.precio     ?? '',
        imagen_url: producto?.imagen_url ?? '',
    });
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        // Convertir imagen_url vacía a null para no violar constraints de BD
        const payload = {
            ...form,
            precio: parseFloat(form.precio),
            imagen_url: form.imagen_url.trim() || null,
        };
        await onSave(payload);
        setSaving(false);
    };

    return (
        <div
            className="fixed inset-0 z-40 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="glass rounded-3xl w-full max-w-lg shadow-2xl shadow-black/60 animate-fade-up overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-7 py-5 border-b border-white/5">
                    <h2 className="text-lg font-bold text-white">
                        {isEdit ? 'Editar Producto' : 'Nuevo Producto'}
                    </h2>
                    <button
                        id="modal-close"
                        onClick={onClose}
                        className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">

                    {/* Nombre */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Nombre del producto</label>
                        <input
                            id="input-nombre"
                            name="nombre"
                            type="text"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                            placeholder="Ej: Cuaderno A4"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm
                                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all hover:border-white/20"
                        />
                    </div>

                    {/* Precio */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Precio (S/)</label>
                        <input
                            id="input-precio"
                            name="precio"
                            type="number"
                            step="0.01"
                            min="0"
                            value={form.precio}
                            onChange={handleChange}
                            required
                            placeholder="0.00"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm
                                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all hover:border-white/20"
                        />
                    </div>

                    {/* Imagen URL */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">URL de imagen (opcional)</label>
                        <input
                            id="input-imagen"
                            name="imagen_url"
                            type="url"
                            value={form.imagen_url}
                            onChange={handleChange}
                            placeholder="https://ejemplo.com/imagen.jpg"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm
                                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all hover:border-white/20"
                        />
                        {form.imagen_url && (
                            <div className="mt-3 rounded-xl overflow-hidden border border-white/10 h-24 flex items-center justify-center bg-white/5">
                                <img src={form.imagen_url} alt="preview" className="h-full object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                            </div>
                        )}
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl font-semibold text-sm text-slate-400 hover:text-white
                                       bg-white/5 hover:bg-white/10 border border-white/10
                                       transition-all duration-150"
                        >
                            Cancelar
                        </button>
                        <button
                            id="modal-save"
                            type="submit"
                            disabled={saving}
                            className="flex-1 py-3 rounded-xl font-semibold text-sm text-white
                                       bg-gradient-to-r from-brand-600 to-brand-500
                                       hover:from-brand-500 hover:to-brand-400
                                       shadow-lg shadow-brand-700/30
                                       disabled:opacity-60 disabled:cursor-not-allowed
                                       transition-all duration-150 active:scale-[0.98]"
                        >
                            {saving
                                ? <span className="flex items-center justify-center gap-2">
                                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                    </svg>
                                    Guardando...
                                  </span>
                                : isEdit ? 'Actualizar' : 'Crear Producto'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

/* ──────────────────────────────────────────────
   DASHBOARD PRINCIPAL
────────────────────────────────────────────── */
const AdminDashboard = () => {
    const [productos, setProductos] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [modal, setModal]   = useState(null);   // null | {} | {id, nombre, precio, imagen_url}
    const [search, setSearch] = useState('');
    const [toast, setToast]   = useState(null);   // { message, type }

    const showToast = (message, type = 'success') => setToast({ message, type });

    const cargar = useCallback(async () => {
        setFetching(true);
        try {
            const data = await getProductos();
            setProductos(data);
        } catch (err) {
            showToast('Error al cargar productos: ' + err.message, 'error');
        } finally {
            setFetching(false);
        }
    }, []);

    useEffect(() => { cargar(); }, [cargar]);

    const handleSave = async (formData) => {
        try {
            if (modal?.id) {
                await updateProducto(modal.id, formData);
                showToast('Producto actualizado correctamente');
            } else {
                await insertProducto(formData);
                showToast('Producto creado correctamente');
            }
            setModal(null);
            cargar();
        } catch (err) {
            // Supabase devuelve { message, details, hint, code }
            const msg = err?.message || err?.details || 'Error desconocido al guardar';
            // Mensaje amigable para el error de RLS
            if (msg.includes('row-level security') || err?.code === '42501') {
                showToast('Sin permisos: revisa las políticas RLS en Supabase', 'error');
            } else {
                showToast('Error al guardar: ' + msg, 'error');
            }
        }
    };

    const handleDelete = async (id, nombre) => {
        if (!window.confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return;
        try {
            await deleteProducto(id);
            showToast(`"${nombre}" eliminado correctamente`);
            cargar();
        } catch (err) {
            const msg = err?.message || err?.details || 'Error desconocido';
            if (msg.includes('row-level security') || err?.code === '42501') {
                showToast('Sin permisos: revisa las políticas RLS en Supabase', 'error');
            } else {
                showToast('Error al eliminar: ' + msg, 'error');
            }
        }
    };

    const filtrados = productos.filter(p =>
        p.nombre?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            {/* ── Toast ── */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* ── Modal ── */}
            {modal !== null && (
                <ProductoModal
                    producto={modal}
                    onClose={() => setModal(null)}
                    onSave={handleSave}
                />
            )}

            {/* ── Header de sección ── */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-1 h-7 rounded-full bg-gradient-to-b from-brand-400 to-brand-600" />
                    <h1 className="text-2xl font-bold text-white">Gestión de Productos</h1>
                </div>
                <p className="text-sm text-slate-500 ml-4">Administra el inventario de la tienda minitodo</p>
            </div>

            {/* ── Stats rápidas ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                    {
                        label: 'Total productos',
                        value: productos.length,
                        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />,
                        color: 'from-brand-600/20 to-brand-700/10 border-brand-500/20 text-brand-400',
                    },
                    {
                        label: 'Resultados filtrados',
                        value: filtrados.length,
                        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
                        color: 'from-violet-600/20 to-violet-700/10 border-violet-500/20 text-violet-400',
                    },
                    {
                        label: 'Precio promedio',
                        value: productos.length
                            ? `S/ ${(productos.reduce((s, p) => s + Number(p.precio), 0) / productos.length).toFixed(2)}`
                            : 'S/ 0.00',
                        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
                        color: 'from-amber-600/20 to-amber-700/10 border-amber-500/20 text-amber-400',
                    },
                ].map((stat) => (
                    <div key={stat.label} className={`glass rounded-2xl p-5 bg-gradient-to-br border ${stat.color}`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                            </div>
                            <svg className={`w-8 h-8 opacity-60 ${stat.color.split(' ').pop()}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                {stat.icon}
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Tabla ── */}
            <div className="glass rounded-3xl overflow-hidden">

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 border-b border-white/5">
                    {/* Búsqueda */}
                    <div className="relative w-full sm:w-72">
                        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            id="search-productos"
                            type="text"
                            placeholder="Buscar producto..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500
                                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                        />
                    </div>
                    {/* Botón nuevo */}
                    <button
                        id="btn-nuevo-producto"
                        onClick={() => setModal({})}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white
                                   bg-gradient-to-r from-brand-600 to-brand-500
                                   hover:from-brand-500 hover:to-brand-400
                                   shadow-lg shadow-brand-700/30 transition-all duration-150 active:scale-[0.97] whitespace-nowrap"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Nuevo Producto
                    </button>
                </div>

                {/* Contenido tabla */}
                {fetching ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filtrados.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-500">
                        <svg className="w-14 h-14 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                        </svg>
                        <p className="font-semibold">{search ? 'Sin resultados para tu búsqueda' : 'No hay productos aún'}</p>
                        <p className="text-sm mt-1">{search ? 'Intenta con otro término' : 'Crea el primero con el botón de arriba'}</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left border-b border-white/5">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Imagen</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nombre</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Precio</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filtrados.map((p) => (
                                    <tr key={p.id} className="group hover:bg-white/5 transition-colors duration-100">
                                        {/* Imagen */}
                                        <td className="px-6 py-4">
                                            <div className="w-11 h-11 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                                                {p.imagen_url
                                                    ? <img src={p.imagen_url} alt={p.nombre} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                                                    : <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                      </svg>
                                                }
                                            </div>
                                        </td>
                                        {/* Nombre */}
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-white">{p.nombre}</span>
                                        </td>
                                        {/* Precio */}
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-lg bg-brand-900/50 border border-brand-700/30 text-brand-300 font-semibold text-xs">
                                                S/ {Number(p.precio).toFixed(2)}
                                            </span>
                                        </td>
                                        {/* Acciones */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                                                <button
                                                    id={`edit-${p.id}`}
                                                    onClick={() => setModal(p)}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Editar
                                                </button>
                                                <button
                                                    id={`delete-${p.id}`}
                                                    onClick={() => handleDelete(p.id, p.nombre)}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-900/40 hover:bg-brand-700/40 border border-brand-700/30 hover:border-brand-500/50 text-brand-400 hover:text-brand-300 text-xs font-semibold transition-all"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Footer de tabla */}
                {!fetching && filtrados.length > 0 && (
                    <div className="px-6 py-3.5 border-t border-white/5 text-xs text-slate-500">
                        Mostrando <span className="text-slate-300 font-semibold">{filtrados.length}</span> de <span className="text-slate-300 font-semibold">{productos.length}</span> productos
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminDashboard;
