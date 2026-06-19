import { supabase } from '../config/supabaseClient';

const TABLE = 'productos';

/**
 * Obtiene todos los productos ordenados por nombre.
 */
export async function getProductos() {
    const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .order('nombre', { ascending: true });

    if (error) throw error;
    return data;
}

/**
 * Inserta un nuevo producto.
 * @param {{ nombre: string, precio: number, imagen_url: string }} producto
 */
export async function insertProducto(producto) {
    const { data, error } = await supabase
        .from(TABLE)
        .insert([producto])
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Actualiza un producto existente.
 * @param {number|string} id
 * @param {{ nombre?: string, precio?: number, imagen_url?: string }} updates
 */
export async function updateProducto(id, updates) {
    const { data, error } = await supabase
        .from(TABLE)
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Elimina un producto por su id.
 * @param {number|string} id
 */
export async function deleteProducto(id) {
    const { error } = await supabase
        .from(TABLE)
        .delete()
        .eq('id', id);

    if (error) throw error;
}
