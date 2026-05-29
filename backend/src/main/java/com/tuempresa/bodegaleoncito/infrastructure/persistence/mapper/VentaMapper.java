package com.tuempresa.bodegaleoncito.infrastructure.persistence.mapper;

import com.tuempresa.bodegaleoncito.domain.venta.DetalleVenta;
import com.tuempresa.bodegaleoncito.domain.venta.Venta;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.DetalleVentaEntity;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.ProductoEntity;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.UsuarioEntity;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.VentaEntity;
import java.util.ArrayList;

public class VentaMapper {

    public static VentaEntity toEntity(Venta domain, UsuarioEntity usuarioEntity) {
        if (domain == null) return null;
        VentaEntity entity = new VentaEntity();
        entity.setId(domain.getId());
        entity.setUsuario(usuarioEntity);
        entity.setFecha(domain.getFecha());
        entity.setTotal(domain.getTotal());
        return entity;
    }

    public static DetalleVentaEntity toDetalleEntity(DetalleVenta domain, VentaEntity ventaEntity, ProductoEntity productoEntity) {
        if (domain == null) return null;
        DetalleVentaEntity entity = new DetalleVentaEntity();
        entity.setId(domain.getId());
        entity.setVenta(ventaEntity);
        entity.setProducto(productoEntity);
        entity.setCantidad(domain.getCantidad());
        entity.setPrecioUnit(domain.getPrecioUnit());
        entity.setSubtotal(domain.getSubtotal());
        return entity;
    }

    public static Venta toDomain(VentaEntity entity) {
        if (entity == null) return null;
        Venta domain = new Venta();
        domain.setId(entity.getId());
        if (entity.getUsuario() != null) {
            domain.setUsuario(UsuarioMapper.toDomain(entity.getUsuario()));
        }
        domain.setFecha(entity.getFecha());
        domain.setTotal(entity.getTotal());
        if (entity.getDetalles() != null) {
            domain.setDetalles(new ArrayList<>());
            for (DetalleVentaEntity detalleEntity : entity.getDetalles()) {
                domain.getDetalles().add(toDetalleDomain(detalleEntity));
            }
        }
        return domain;
    }

    public static DetalleVenta toDetalleDomain(DetalleVentaEntity entity) {
        if (entity == null) return null;
        DetalleVenta domain = new DetalleVenta();
        domain.setId(entity.getId());
        if (entity.getProducto() != null) {
            domain.setProducto(ProductoMapper.toDomain(entity.getProducto()));
        }
        domain.setCantidad(entity.getCantidad());
        domain.setPrecioUnit(entity.getPrecioUnit());
        domain.setSubtotal(entity.getSubtotal());
        return domain;
    }
}
