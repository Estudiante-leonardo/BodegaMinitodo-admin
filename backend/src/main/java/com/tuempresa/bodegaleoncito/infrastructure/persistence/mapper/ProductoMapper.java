package com.tuempresa.bodegaleoncito.infrastructure.persistence.mapper;

import com.tuempresa.bodegaleoncito.domain.producto.Producto;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.ProductoEntity;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.CategoriaEntity;

public class ProductoMapper {

    public static ProductoEntity toEntity(Producto domain) {
        if (domain == null) return null;
        ProductoEntity entity = new ProductoEntity();
        entity.setId(domain.getId());
        entity.setNombre(domain.getNombre());
        entity.setDescripcion(domain.getDescripcion());
        entity.setImagen(domain.getImagen());
        entity.setPrecio(domain.getPrecio());
        entity.setStock(domain.getStock());
        entity.setStockMinimo(domain.getStockMinimo());
        return entity;
    }

    public static ProductoEntity toEntityWithCategoria(Producto domain, CategoriaEntity categoriaEntity) {
        ProductoEntity entity = toEntity(domain);
        if (entity != null) {
            entity.setCategoria(categoriaEntity);
        }
        return entity;
    }

    public static Producto toDomain(ProductoEntity entity) {
        if (entity == null) return null;
        Producto domain = new Producto();
        domain.setId(entity.getId());
        domain.setNombre(entity.getNombre());
        domain.setDescripcion(entity.getDescripcion());
        domain.setImagen(entity.getImagen());
        domain.setPrecio(entity.getPrecio());
        domain.setStock(entity.getStock());
        domain.setStockMinimo(entity.getStockMinimo());
        if (entity.getCategoria() != null) {
            domain.setCategoria(CategoriaMapper.toDomain(entity.getCategoria()));
        }
        return domain;
    }
}
