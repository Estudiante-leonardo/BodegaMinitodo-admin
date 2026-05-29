package com.tuempresa.bodegaleoncito.infrastructure.persistence.repository;

import com.tuempresa.bodegaleoncito.domain.usuario.Usuario;
import com.tuempresa.bodegaleoncito.domain.usuario.UsuarioRepository;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.RoleEntity;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.UsuarioEntity;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.mapper.UsuarioMapper;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.repository.spring.SpringDataRoleRepository;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.repository.spring.SpringDataUsuarioRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class JpaUsuarioRepositoryAdapter implements UsuarioRepository {

    private final SpringDataUsuarioRepository springDataUsuarioRepository;
    private final SpringDataRoleRepository springDataRoleRepository;

    public JpaUsuarioRepositoryAdapter(SpringDataUsuarioRepository springDataUsuarioRepository,
                                        SpringDataRoleRepository springDataRoleRepository) {
        this.springDataUsuarioRepository = springDataUsuarioRepository;
        this.springDataRoleRepository = springDataRoleRepository;
    }

    @Override
    public List<Usuario> findAll() {
        return springDataUsuarioRepository.findAll().stream()
                .map(UsuarioMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Usuario> findById(Long id) {
        return springDataUsuarioRepository.findById(id)
                .map(UsuarioMapper::toDomain);
    }

    @Override
    public Optional<Usuario> findByUsername(String username) {
        return springDataUsuarioRepository.findByUsername(username)
                .map(UsuarioMapper::toDomain);
    }

    @Override
    public Usuario save(Usuario usuario) {
        RoleEntity roleEntity = springDataRoleRepository.getReferenceById(usuario.getRolId());
        UsuarioEntity entity = UsuarioMapper.toEntity(usuario, roleEntity);
        UsuarioEntity saved = springDataUsuarioRepository.save(entity);
        return UsuarioMapper.toDomain(saved);
    }
}
