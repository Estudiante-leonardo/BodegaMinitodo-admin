package com.tuempresa.bodegaleoncito.infrastructure.persistence.mapper;

import com.tuempresa.bodegaleoncito.domain.usuario.Role;
import com.tuempresa.bodegaleoncito.domain.usuario.Usuario;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.RoleEntity;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.UsuarioEntity;

public class UsuarioMapper {

    public static UsuarioEntity toEntity(Usuario domain, RoleEntity roleEntity) {
        if (domain == null) return null;
        UsuarioEntity entity = new UsuarioEntity();
        entity.setId(domain.getId());
        entity.setUsername(domain.getUsername());
        entity.setNombre(domain.getNombre());
        entity.setPassword(domain.getPassword());
        entity.setEmail(domain.getEmail());
        entity.setRol(roleEntity);
        return entity;
    }

    public static Usuario toDomain(UsuarioEntity entity) {
        if (entity == null) return null;
        Usuario domain = new Usuario();
        domain.setId(entity.getId());
        domain.setUsername(entity.getUsername());
        domain.setNombre(entity.getNombre());
        domain.setPassword(entity.getPassword());
        domain.setEmail(entity.getEmail());
        if (entity.getRol() != null) {
            domain.setRolId(entity.getRol().getId());
        }
        return domain;
    }

    public static Role roleToDomain(RoleEntity entity) {
        if (entity == null) return null;
        Role domain = new Role();
        domain.setId(entity.getId());
        domain.setNombre(entity.getNombre());
        return domain;
    }

    public static RoleEntity roleToEntity(Role domain) {
        if (domain == null) return null;
        RoleEntity entity = new RoleEntity();
        entity.setId(domain.getId());
        entity.setNombre(domain.getNombre());
        return entity;
    }
}
