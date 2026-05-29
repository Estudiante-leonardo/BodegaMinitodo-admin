package com.tuempresa.bodegaleoncito.application.venta;

import com.tuempresa.bodegaleoncito.domain.exception.DomainException;
import com.tuempresa.bodegaleoncito.domain.producto.Producto;
import com.tuempresa.bodegaleoncito.domain.producto.ProductoRepository;
import com.tuempresa.bodegaleoncito.domain.venta.DetalleVenta;
import com.tuempresa.bodegaleoncito.domain.venta.Venta;
import com.tuempresa.bodegaleoncito.domain.venta.VentaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class VentaService {

    private final VentaRepository ventaRepository;
    private final ProductoRepository productoRepository;

    public VentaService(VentaRepository ventaRepository, ProductoRepository productoRepository) {
        this.ventaRepository = ventaRepository;
        this.productoRepository = productoRepository;
    }

    @Transactional
    public Venta registrarVenta(Venta venta) {
        venta.setFecha(LocalDateTime.now());
        BigDecimal totalVenta = BigDecimal.ZERO;

        if (venta.getDetalles() != null) {
            for (DetalleVenta detalle : venta.getDetalles()) {
                Producto productoDB = productoRepository.findById(detalle.getProducto().getId())
                        .orElseThrow(() -> new DomainException("Producto no encontrado: " + detalle.getProducto().getId()));

                if (productoDB.getStock() < detalle.getCantidad()) {
                    throw new DomainException("Stock insuficiente para el producto: " + productoDB.getNombre());
                }

                detalle.setPrecioUnit(productoDB.getPrecio());
                BigDecimal subtotal = detalle.getPrecioUnit().multiply(BigDecimal.valueOf(detalle.getCantidad()));
                detalle.setSubtotal(subtotal);

                productoDB.setStock(productoDB.getStock() - detalle.getCantidad());
                productoRepository.save(productoDB);

                totalVenta = totalVenta.add(subtotal);
            }
        }

        venta.setTotal(totalVenta);
        return ventaRepository.save(venta);
    }
}
