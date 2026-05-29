package com.tuempresa.bodegaleoncito.application.producto;

import com.tuempresa.bodegaleoncito.domain.categoria.Categoria;
import com.tuempresa.bodegaleoncito.domain.categoria.CategoriaRepository;
import com.tuempresa.bodegaleoncito.domain.exception.DomainException;
import com.tuempresa.bodegaleoncito.domain.producto.Producto;
import com.tuempresa.bodegaleoncito.domain.producto.ProductoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProductoService(ProductoRepository productoRepository, CategoriaRepository categoriaRepository) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @Transactional(readOnly = true)
    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    @Transactional
    public Producto guardar(Producto producto) {
        return productoRepository.save(producto);
    }

    @Transactional(readOnly = true)
    public Producto obtenerPorId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new DomainException("Producto no encontrado"));
    }

    @Transactional
    public Producto actualizar(Long id, Producto productoDetalles) {
        Producto producto = obtenerPorId(id);
        producto.setNombre(productoDetalles.getNombre());
        producto.setDescripcion(productoDetalles.getDescripcion());
        producto.setImagen(productoDetalles.getImagen());
        producto.setPrecio(productoDetalles.getPrecio());
        producto.setStock(productoDetalles.getStock());
        producto.setStockMinimo(productoDetalles.getStockMinimo());
        if (productoDetalles.getCategoria() != null) {
            Categoria categoria = categoriaRepository.findById(productoDetalles.getCategoria().getId())
                    .orElseThrow(() -> new DomainException("Categoría no encontrada"));
            producto.setCategoria(categoria);
        }
        return productoRepository.save(producto);
    }

    @Transactional
    public void eliminar(Long id) {
        Producto producto = obtenerPorId(id);
        productoRepository.delete(producto);
    }
}
