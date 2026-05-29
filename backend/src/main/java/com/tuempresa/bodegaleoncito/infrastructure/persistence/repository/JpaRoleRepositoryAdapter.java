package com.tuempresa.bodegaleoncito.infrastructure.persistence.repository;

import com.tuempresa.bodegaleoncito.domain.usuario.Role;
import com.tuempresa.bodegaleoncito.domain.usuario.RoleRepository;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.RoleEntity;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.mapper.UsuarioMapper;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.repository.spring.SpringDataRoleRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class JpaRoleRepositoryAdapter implements RoleRepository {

    private final SpringDataRoleRepository springDataRoleRepository;

    public JpaRoleRepositoryAdapter(SpringDataRoleRepository springDataRoleRepository) {
        this.springDataRoleRepository = springDataRoleRepository;
    }

    @Override
    public List<Role> findAll() {
        return springDataRoleRepository.findAll().stream()
                .map(UsuarioMapper::roleToDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Role> findById(Long id) {
        return springDataRoleRepository.findById(id)
                .map(UsuarioMapper::roleToDomain);
    }

    @Override
    public Optional<Role> findByNombre(String nombre) {
        return springDataRoleRepository.findByNombre(nombre)
                .map(UsuarioMapper::roleToDomain);
    }

    @Override
    public Role save(Role role) {
        RoleEntity entity = UsuarioMapper.roleToEntity(role);
        RoleEntity saved = springDataRoleRepository.save(entity);
        return UsuarioMapper.roleToDomain(saved);
    }
}
