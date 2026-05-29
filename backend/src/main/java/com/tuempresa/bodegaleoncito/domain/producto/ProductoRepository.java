package com.tuempresa.bodegaleoncito.domain.producto;

import java.util.List;
import java.util.Optional;

public interface ProductoRepository {
    List<Producto> findAll();
    Optional<Producto> findById(Long id);
    Producto save(Producto producto);
    void delete(Producto producto);
}
