package com.tuempresa.bodegaleoncito.infrastructure.persistence.mapper;

import com.tuempresa.bodegaleoncito.domain.categoria.Categoria;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.CategoriaEntity;

public class CategoriaMapper {

    public static CategoriaEntity toEntity(Categoria domain) {
        if (domain == null) return null;
        CategoriaEntity entity = new CategoriaEntity();
        entity.setId(domain.getId());
        entity.setNombre(domain.getNombre());
        entity.setDescripcion(domain.getDescripcion());
        return entity;
    }

    public static Categoria toDomain(CategoriaEntity entity) {
        if (entity == null) return null;
        Categoria domain = new Categoria();
        domain.setId(entity.getId());
        domain.setNombre(entity.getNombre());
        domain.setDescripcion(entity.getDescripcion());
        return domain;
    }
}
