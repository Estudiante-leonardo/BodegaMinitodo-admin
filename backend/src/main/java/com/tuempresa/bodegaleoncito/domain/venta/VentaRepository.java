package com.tuempresa.bodegaleoncito.domain.venta;

import java.util.Optional;

public interface VentaRepository {
    Optional<Venta> findById(Long id);
    Venta save(Venta venta);
}
