package com.tuempresa.bodegaleoncito.domain.venta;

import java.util.List;

public interface DetalleVentaRepository {
    List<DetalleVenta> findByVentaId(Long ventaId);
    DetalleVenta save(DetalleVenta detalleVenta);
}
