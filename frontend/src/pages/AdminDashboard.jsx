import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { API, authHeaders, authGetHeaders, cacheBustUrl } from '../config/api';

const AdminDashboard = () => {
    const { token } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('productos');
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    
    const [showModalProd, setShowModalProd] = useState(false);
    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [stockMinimo, setStockMinimo] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [imagen, setImagen] = useState('');
    
    const [showModalCat, setShowModalCat] = useState(false);
    const [catId, setCatId] = useState(null);
    const [catNombre, setCatNombre] = useState('');
    const [catDescripcion, setCatDescripcion] = useState('');

    const [showModalOferta, setShowModalOferta] = useState(false);
    const [ofId, setOfId] = useState(null);
    const [ofTitulo, setOfTitulo] = useState('');
    const [ofDescripcion, setOfDescripcion] = useState('');
    const [ofImagen, setOfImagen] = useState('');
    const [ofActiva, setOfActiva] = useState(true);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = () => {
        fetch(cacheBustUrl(API.endpoints.productos()), { 
            headers: authGetHeaders(token),
            cache: 'no-store'
        })
            .then(res => {
                if(!res.ok) throw new Error("Error fetching productos");
                return res.json();
            })
            .then(data => {
                if(Array.isArray(data)) setProductos(data);
            })
            .catch(err => console.error(err));

        fetch(cacheBustUrl(API.endpoints.categorias()), { 
            headers: authGetHeaders(token),
            cache: 'no-store'
        })
            .then(res => {
                if(!res.ok) throw new Error("Error fetching categorias");
                return res.json();
            })
            .then(data => {
                if(Array.isArray(data)) setCategorias(data);
            })
            .catch(err => console.error(err));

        fetch(cacheBustUrl(API.endpoints.ofertas()), { 
            headers: authGetHeaders(token),
            cache: 'no-store'
        })
            .then(res => {
                if(!res.ok) throw new Error("Error fetching ofertas");
                return res.json();
            })
            .then(data => {
                if(Array.isArray(data)) setOfertas(data);
            })
            .catch(err => console.error(err));
    };

    const handleGuardarProducto = async (e) => {
        e.preventDefault();
        const url = id ? API.endpoints.producto(id) : API.endpoints.productos();
        const method = id ? 'PUT' : 'POST';
        const cat = categorias.find(c => c.id.toString() === categoriaId);
        
        await fetch(url, {
            method,
            headers: authHeaders(token),
            body: JSON.stringify({ nombre, descripcion, precio, stock, stockMinimo, categoria: cat, imagen })
        });
        
        setShowModalProd(false);
        cargarDatos();
    };

    const handleEliminarProducto = async (prodId) => {
        if(confirm("¿Seguro que deseas eliminar este producto?")) {
            await fetch(API.endpoints.producto(prodId), {
                method: 'DELETE',
                headers: authGetHeaders(token)
            });
            cargarDatos();
        }
    };

    const handleEditarProducto = (prod) => {
        setId(prod.id);
        setNombre(prod.nombre);
        setDescripcion(prod.descripcion || '');
        setPrecio(prod.precio);
        setStock(prod.stock);
        setStockMinimo(prod.stockMinimo);
        setCategoriaId(prod.categoria.id.toString());
        setImagen(prod.imagen || '');
        setShowModalProd(true);
    };

    const abrirModalNuevoProd = () => {
        setId(null); setNombre(''); setDescripcion(''); setPrecio(''); setStock(''); setStockMinimo(''); setCategoriaId(''); setImagen('');
        setShowModalProd(true);
    };

    const handleGuardarCategoria = async (e) => {
        e.preventDefault();
        const url = catId ? API.endpoints.categoria(catId) : API.endpoints.categorias();
        const method = catId ? 'PUT' : 'POST';
        
        await fetch(url, {
            method,
            headers: authHeaders(token),
            body: JSON.stringify({ nombre: catNombre, descripcion: catDescripcion })
        });
        
        setShowModalCat(false);
        cargarDatos();
    };

    const handleEliminarCategoria = async (idCat) => {
        if(confirm("¿Seguro que deseas eliminar esta categoría? IMPORTANTE: Fallará si tiene productos asociados.")) {
            await fetch(API.endpoints.categoria(idCat), {
                method: 'DELETE',
                headers: authGetHeaders(token)
            });
            cargarDatos();
        }
    };

    const handleEditarCategoria = (cat) => {
        setCatId(cat.id);
        setCatNombre(cat.nombre);
        setCatDescripcion(cat.descripcion || '');
        setShowModalCat(true);
    };

    const abrirModalNuevaCat = () => {
        setCatId(null); setCatNombre(''); setCatDescripcion('');
        setShowModalCat(true);
    };

    const handleGuardarOferta = async (e) => {
        e.preventDefault();
        const url = ofId ? API.endpoints.oferta(ofId) : API.endpoints.ofertas();
        const method = ofId ? 'PUT' : 'POST';
        
        await fetch(url, {
            method,
            headers: authHeaders(token),
            body: JSON.stringify({ titulo: ofTitulo, descripcion: ofDescripcion, imagen: ofImagen, activa: ofActiva })
        });
        
        setShowModalOferta(false);
        cargarDatos();
    };

    const handleEliminarOferta = async (id) => {
        if(confirm("¿Seguro que deseas eliminar esta oferta?")) {
            await fetch(API.endpoints.oferta(id), {
                method: 'DELETE',
                headers: authGetHeaders(token)
            });
            cargarDatos();
        }
    };

    const handleEditarOferta = (of) => {
        setOfId(of.id);
        setOfTitulo(of.titulo);
        setOfDescripcion(of.descripcion || '');
        setOfImagen(of.imagen || '');
        setOfActiva(of.activa);
        setShowModalOferta(true);
    };

    const abrirModalNuevaOferta = () => {
        setOfId(null); setOfTitulo(''); setOfDescripcion(''); setOfImagen(''); setOfActiva(true);
        setShowModalOferta(true);
    };

    return (
        <div className="container mt-5">
            <h2 className="fw-bold mb-4 text-warning">Panel de Administración</h2>

            <ul className="nav nav-tabs mb-4 fw-bold">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'productos' ? 'active bg-danger text-warning' : 'text-danger'}`} onClick={() => setActiveTab('productos')}>
                        Productos
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'categorias' ? 'active bg-danger text-warning' : 'text-danger'}`} onClick={() => setActiveTab('categorias')}>
                        Categorías
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'ofertas' ? 'active bg-danger text-warning' : 'text-danger'}`} onClick={() => setActiveTab('ofertas')}>
                        Ofertas
                    </button>
                </li>
            </ul>

            {activeTab === 'productos' && (
                <div className="card shadow-sm border-0 animate__animated animate__fadeIn">
                    <div className="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center pt-4 pb-0">
                        <h4 className="fw-bold m-0 text-dark">Lista de Productos</h4>
                        <button className="btn btn-warning fw-bold shadow-sm" onClick={abrirModalNuevoProd}>+ Nuevo Producto</button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Categoría</th>
                                        <th className="text-end">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.length === 0 ? (
                                        <tr><td colSpan="7" className="text-center py-4 text-muted">No hay productos.</td></tr>
                                    ) : (
                                        productos.map(p => (
                                            <tr key={p.id}>
                                                <td>{p.id}</td>
                                                <td>
                                                    <img src={p.imagen || 'https://via.placeholder.com/50'} alt={p.nombre} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px' }} />
                                                </td>
                                                <td className="fw-semibold">{p.nombre}</td>
                                                <td>S/ {p.precio}</td>
                                                <td>
                                                    <span className={`badge ${p.stock <= p.stockMinimo ? 'bg-danger' : 'bg-success'}`}>{p.stock}</span>
                                                </td>
                                                <td>{p.categoria?.nombre}</td>
                                                <td className="text-end text-nowrap">
                                                    <button className="btn btn-sm btn-outline-primary me-2 fw-bold" onClick={() => handleEditarProducto(p)}>Editar</button>
                                                    <button className="btn btn-sm btn-outline-danger fw-bold" onClick={() => handleEliminarProducto(p.id)}>Eliminar</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'categorias' && (
                <div className="card shadow-sm border-0 animate__animated animate__fadeIn">
                    <div className="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center pt-4 pb-0">
                        <h4 className="fw-bold m-0 text-dark">Lista de Categorías</h4>
                        <button className="btn btn-warning fw-bold shadow-sm" onClick={abrirModalNuevaCat}>+ Nueva Categoría</button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th className="text-end">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categorias.length === 0 ? (
                                        <tr><td colSpan="4" className="text-center py-4 text-muted">No hay categorías.</td></tr>
                                    ) : (
                                        categorias.map(c => (
                                            <tr key={c.id}>
                                                <td>{c.id}</td>
                                                <td className="fw-semibold">{c.nombre}</td>
                                                <td className="text-muted">{c.descripcion || '-'}</td>
                                                <td className="text-end text-nowrap">
                                                    <button className="btn btn-sm btn-outline-primary me-2 fw-bold" onClick={() => handleEditarCategoria(c)}>Editar</button>
                                                    <button className="btn btn-sm btn-outline-danger fw-bold" onClick={() => handleEliminarCategoria(c.id)}>Eliminar</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'ofertas' && (
                <div className="card shadow-sm border-0 animate__animated animate__fadeIn">
                    <div className="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center pt-4 pb-0">
                        <h4 className="fw-bold m-0 text-dark">Lista de Ofertas (Banners)</h4>
                        <button className="btn btn-warning fw-bold shadow-sm" onClick={abrirModalNuevaOferta}>+ Nueva Oferta</button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Imagen</th>
                                        <th>Título</th>
                                        <th>Descripción</th>
                                        <th>Estado</th>
                                        <th className="text-end">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ofertas.length === 0 ? (
                                        <tr><td colSpan="6" className="text-center py-4 text-muted">No hay ofertas configuradas.</td></tr>
                                    ) : (
                                        ofertas.map(of => (
                                            <tr key={of.id}>
                                                <td>{of.id}</td>
                                                <td>
                                                    <img src={of.imagen || 'https://via.placeholder.com/150x50'} alt={of.titulo} style={{ height: '40px', objectFit: 'cover', borderRadius: '5px' }} />
                                                </td>
                                                <td className="fw-semibold">{of.titulo}</td>
                                                <td className="text-muted">{of.descripcion || '-'}</td>
                                                <td>
                                                    <span className={`badge ${of.activa ? 'bg-success' : 'bg-secondary'}`}>{of.activa ? 'Activa' : 'Inactiva'}</span>
                                                </td>
                                                <td className="text-end text-nowrap">
                                                    <button className="btn btn-sm btn-outline-primary me-2 fw-bold" onClick={() => handleEditarOferta(of)}>Editar</button>
                                                    <button className="btn btn-sm btn-outline-danger fw-bold" onClick={() => handleEliminarOferta(of.id)}>Eliminar</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {showModalProd && (
                <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow">
                            <div className="modal-header border-bottom-0 bg-light">
                                <h5 className="modal-title fw-bold text-dark">{id ? 'Editar Producto' : 'Nuevo Producto'}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalProd(false)}></button>
                            </div>
                            <form onSubmit={handleGuardarProducto}>
                                <div className="modal-body p-4">
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-bold text-muted small">Nombre del Producto</label>
                                            <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-bold text-muted small">Categoría</label>
                                            <select className="form-select" value={categoriaId} onChange={e => setCategoriaId(e.target.value)} required>
                                                <option value="">Seleccione una categoría</option>
                                                {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label className="form-label fw-bold text-muted small">Precio</label>
                                            <input type="number" step="0.01" className="form-control" value={precio} onChange={e => setPrecio(e.target.value)} required />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label className="form-label fw-bold text-muted small">Stock Actual</label>
                                            <input type="number" className="form-control" value={stock} onChange={e => setStock(e.target.value)} required />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label className="form-label fw-bold text-muted small">Stock Mínimo</label>
                                            <input type="number" className="form-control" value={stockMinimo} onChange={e => setStockMinimo(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold text-muted small">Descripción</label>
                                        <textarea className="form-control" rows="2" value={descripcion} onChange={e => setDescripcion(e.target.value)}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold text-muted small">URL de la Imagen (Opcional)</label>
                                        <input type="url" className="form-control" value={imagen} onChange={e => setImagen(e.target.value)} placeholder="https://ejemplo.com/imagen.jpg" />
                                    </div>
                                </div>
                                <div className="modal-footer border-top-0 bg-light">
                                    <button type="button" className="btn btn-outline-secondary fw-bold" onClick={() => setShowModalProd(false)}>Cancelar</button>
                                    <button type="submit" className="btn btn-warning fw-bold px-4">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showModalCat && (
                <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow">
                            <div className="modal-header border-bottom-0 bg-light">
                                <h5 className="modal-title fw-bold text-dark">{catId ? 'Editar Categoría' : 'Nueva Categoría'}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalCat(false)}></button>
                            </div>
                            <form onSubmit={handleGuardarCategoria}>
                                <div className="modal-body p-4">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold text-muted small">Nombre de Categoría</label>
                                        <input type="text" className="form-control" value={catNombre} onChange={e => setCatNombre(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold text-muted small">Descripción (Opcional)</label>
                                        <textarea className="form-control" rows="3" value={catDescripcion} onChange={e => setCatDescripcion(e.target.value)}></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer border-top-0 bg-light">
                                    <button type="button" className="btn btn-outline-secondary fw-bold" onClick={() => setShowModalCat(false)}>Cancelar</button>
                                    <button type="submit" className="btn btn-warning fw-bold px-4">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showModalOferta && (
                <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow">
                            <div className="modal-header border-bottom-0 bg-light">
                                <h5 className="modal-title fw-bold text-dark">{ofId ? 'Editar Oferta' : 'Nueva Oferta'}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalOferta(false)}></button>
                            </div>
                            <form onSubmit={handleGuardarOferta}>
                                <div className="modal-body p-4">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold text-muted small">Título Promocional</label>
                                        <input type="text" className="form-control" value={ofTitulo} onChange={e => setOfTitulo(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold text-muted small">Descripción (Opcional)</label>
                                        <textarea className="form-control" rows="2" value={ofDescripcion} onChange={e => setOfDescripcion(e.target.value)}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold text-muted small">URL de la Imagen Banner</label>
                                        <input type="url" className="form-control" value={ofImagen} onChange={e => setOfImagen(e.target.value)} placeholder="https://ejemplo.com/banner.jpg" required />
                                    </div>
                                    <div className="form-check form-switch mb-3">
                                        <input className="form-check-input" type="checkbox" role="switch" id="ofActiva" checked={ofActiva} onChange={e => setOfActiva(e.target.checked)} />
                                        <label className="form-check-label fw-bold text-muted small" htmlFor="ofActiva">Oferta Activa (Visible al público)</label>
                                    </div>
                                </div>
                                <div className="modal-footer border-top-0 bg-light">
                                    <button type="button" className="btn btn-outline-secondary fw-bold" onClick={() => setShowModalOferta(false)}>Cancelar</button>
                                    <button type="submit" className="btn btn-warning fw-bold px-4">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
