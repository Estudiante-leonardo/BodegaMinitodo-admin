import { useState, useEffect, useContext } from 'react';
import ProductoCard from '../components/ProductoCard';
import { AuthContext } from '../context/AuthContext';
import { API, authGetHeaders, cacheBustUrl } from '../config/api';

const Home = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                const [resProd, resCat, resOf] = await Promise.all([
                    fetch(cacheBustUrl(API.endpoints.productos()), {
                        headers: authGetHeaders(token),
                        cache: 'no-store'
                    }),
                    fetch(cacheBustUrl(API.endpoints.categorias()), {
                        headers: authGetHeaders(token),
                        cache: 'no-store'
                    }),
                    fetch(cacheBustUrl(API.endpoints.ofertasActivas()), {
                        headers: authGetHeaders(token),
                        cache: 'no-store'
                    })
                ]);

                if (!resProd.ok || !resCat.ok) throw new Error('Error al conectar con el backend');
                
                const dataProd = await resProd.json();
                const dataCat = await resCat.json();
                const dataOf = resOf.ok ? await resOf.json() : [];
                
                if(Array.isArray(dataProd)) setProductos(dataProd);
                if(Array.isArray(dataCat)) setCategorias(dataCat);
                if(Array.isArray(dataOf)) setOfertas(dataOf);
            } catch (err) {
                setError("Error cargando productos. Verifica la conexión.");
            } finally {
                setLoading(false);
            }
        };

        fetchDatos();
    }, [token]);

    const filteredProductos = productos.filter(p => {
        const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? p.categoria?.id === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container-fluid px-3 px-md-5 py-4 bg-light min-vh-100">

            <div id="ofertasCarousel" className="carousel slide mb-5 shadow rounded overflow-hidden" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {ofertas.length > 0 ? (
                        ofertas.map((of, index) => (
                            <button key={of.id} type="button" data-bs-target="#ofertasCarousel" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current={index === 0 ? "true" : "false"} aria-label={`Slide ${index + 1}`}></button>
                        ))
                    ) : (
                        <button type="button" data-bs-target="#ofertasCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    )}
                </div>
                <div className="carousel-inner" style={{ maxHeight: '400px' }}>
                    {ofertas.length > 0 ? (
                        ofertas.map((of, index) => (
                            <div key={of.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <img src={of.imagen} className="d-block w-100" alt={of.titulo} style={{ objectFit: 'cover', height: '400px' }} />
                                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                                    <h2 className="fw-bold text-warning">{of.titulo}</h2>
                                    <p className="fs-5">{of.descripcion}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="carousel-item active">
                            <img src="/oferta-hotsale.jpg" className="d-block w-100" alt="Hot Sale" style={{ objectFit: 'cover', height: '400px', backgroundColor: '#dc3545' }} />
                            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                                <h2 className="fw-bold text-warning">GRANDES OFERTAS!</h2>
                                <p className="fs-5">Aprovecha nuestros descuentos especiales en la Bodega Leoncito.</p>
                            </div>
                        </div>
                    )}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#ofertasCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#ofertasCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                
                <div>
                    <button 
                        className="btn btn-warning text-dark shadow-sm d-flex align-items-center gap-2 fw-bold px-4" 
                        type="button" 
                        data-bs-toggle="offcanvas" 
                        data-bs-target="#offcanvasCategorias" 
                        aria-controls="offcanvasCategorias"
                    >
                        <span className="fs-5">☰</span> 
                        <span>Categorías</span>
                    </button>
                </div>

                <div className="w-100" style={{ maxWidth: '400px' }}>
                    <div className="input-group shadow-sm">
                        <span className="input-group-text bg-white border-end-0 text-muted">🔍</span>
                        <input 
                            type="text" 
                            className="form-control border-start-0 py-2" 
                            placeholder="Buscar productos por nombre..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="offcanvas offcanvas-start shadow" tabIndex="-1" id="offcanvasCategorias" aria-labelledby="offcanvasCategoriasLabel">
                <div className="offcanvas-header bg-danger text-warning">
                    <h5 className="offcanvas-title fw-bold d-flex align-items-center gap-2" id="offcanvasCategoriasLabel">
                        <span>☰</span> Categorías
                    </h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body p-0">
                    <div className="list-group list-group-flush">
                        <button 
                            className={`list-group-item list-group-item-action py-3 px-4 fw-semibold border-bottom ${selectedCategory === null ? 'active bg-warning text-dark border-warning' : ''}`}
                            onClick={() => { setSelectedCategory(null); document.querySelector('#offcanvasCategorias .btn-close').click(); }}
                        >
                            Ver Todos los Productos
                        </button>
                        {categorias.map(cat => (
                            <button 
                                key={cat.id} 
                                className={`list-group-item list-group-item-action py-3 px-4 fw-semibold border-bottom ${selectedCategory === cat.id ? 'active bg-warning text-dark border-warning' : ''}`}
                                onClick={() => { setSelectedCategory(cat.id); document.querySelector('#offcanvasCategorias .btn-close').click(); }}
                            >
                                {cat.nombre}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {error && (
                <div className="alert alert-warning text-center shadow-sm" role="alert">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                    <div className="spinner-border text-danger" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    {filteredProductos.length === 0 && !error ? (
                        <div className="col-12">
                            <h4 className="text-muted text-center mt-5 p-5 bg-light rounded-3 border">
                                No se encontraron productos con esos filtros.
                            </h4>
                        </div>
                    ) : (
                        filteredProductos.map(prod => (
                            <div key={prod.id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                <ProductoCard
                                    nombre={prod.nombre}
                                    precio={prod.precio}
                                    imagen={prod.imagen || "https://images.unsplash.com/photo-1605908502724-9093a79a1b39?auto=format&fit=crop&q=80&w=400"}
                                />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
