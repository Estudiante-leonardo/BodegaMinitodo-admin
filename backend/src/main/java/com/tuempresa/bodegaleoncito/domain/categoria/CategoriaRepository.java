package com.tuempresa.bodegaleoncito.domain.categoria;

import java.util.List;
import java.util.Optional;

public interface CategoriaRepository {
    List<Categoria> findAll();
    Optional<Categoria> findById(Long id);
    Categoria save(Categoria categoria);
    void delete(Categoria categoria);
}
