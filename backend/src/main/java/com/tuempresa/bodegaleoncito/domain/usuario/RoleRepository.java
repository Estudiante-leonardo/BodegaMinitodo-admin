package com.tuempresa.bodegaleoncito.domain.usuario;

import java.util.List;
import java.util.Optional;

public interface RoleRepository {
    List<Role> findAll();
    Optional<Role> findById(Long id);
    Optional<Role> findByNombre(String nombre);
    Role save(Role role);
}
