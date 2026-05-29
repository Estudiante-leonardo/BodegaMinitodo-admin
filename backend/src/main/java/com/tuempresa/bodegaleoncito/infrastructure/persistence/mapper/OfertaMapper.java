package com.tuempresa.bodegaleoncito.infrastructure.persistence.mapper;

import com.tuempresa.bodegaleoncito.domain.oferta.Oferta;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.OfertaEntity;

public class OfertaMapper {

    public static OfertaEntity toEntity(Oferta domain) {
        if (domain == null) return null;
        OfertaEntity entity = new OfertaEntity();
        entity.setId(domain.getId());
        entity.setTitulo(domain.getTitulo());
        entity.setDescripcion(domain.getDescripcion());
        entity.setImagen(domain.getImagen());
        entity.setActiva(domain.isActiva());
        return entity;
    }

    public static Oferta toDomain(OfertaEntity entity) {
        if (entity == null) return null;
        Oferta domain = new Oferta();
        domain.setId(entity.getId());
        domain.setTitulo(entity.getTitulo());
        domain.setDescripcion(entity.getDescripcion());
        domain.setImagen(entity.getImagen());
        domain.setActiva(entity.isActiva());
        return domain;
    }
}
