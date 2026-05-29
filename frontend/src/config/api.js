const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8081';

export const API = {
    baseUrl: API_BASE,
    endpoints: {
        login: () => `${API_BASE}/api/auth/login`,
        productos: () => `${API_BASE}/api/productos`,
        producto: (id) => `${API_BASE}/api/productos/${id}`,
        categorias: () => `${API_BASE}/api/categorias`,
        categoria: (id) => `${API_BASE}/api/categorias/${id}`,
        ofertas: () => `${API_BASE}/api/ofertas`,
        oferta: (id) => `${API_BASE}/api/ofertas/${id}`,
        ofertasActivas: () => `${API_BASE}/api/ofertas/activas`,
    }
};

export function authHeaders(token) {
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
}

export function authGetHeaders(token) {
    return {
        'Authorization': `Bearer ${token}`,
    };
}

export function cacheBustUrl(url) {
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}ts=${new Date().getTime()}`;
}
