package com.tuempresa.bodegaleoncito.domain.usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository {
    List<Usuario> findAll();
    Optional<Usuario> findById(Long id);
    Optional<Usuario> findByUsername(String username);
    Usuario save(Usuario usuario);
}
