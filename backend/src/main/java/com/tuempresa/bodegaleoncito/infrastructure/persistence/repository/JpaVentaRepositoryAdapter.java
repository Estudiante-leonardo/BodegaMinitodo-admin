package com.tuempresa.bodegaleoncito.infrastructure.persistence.repository;

import com.tuempresa.bodegaleoncito.domain.venta.DetalleVenta;
import com.tuempresa.bodegaleoncito.domain.venta.Venta;
import com.tuempresa.bodegaleoncito.domain.venta.VentaRepository;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.*;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.mapper.VentaMapper;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.repository.spring.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public class JpaVentaRepositoryAdapter implements VentaRepository {

    private final SpringDataVentaRepository springDataVentaRepository;
    private final SpringDataUsuarioRepository springDataUsuarioRepository;
    private final SpringDataProductoRepository springDataProductoRepository;

    public JpaVentaRepositoryAdapter(SpringDataVentaRepository springDataVentaRepository,
            SpringDataUsuarioRepository springDataUsuarioRepository,
            SpringDataProductoRepository springDataProductoRepository) {
        this.springDataVentaRepository = springDataVentaRepository;
        this.springDataUsuarioRepository = springDataUsuarioRepository;
        this.springDataProductoRepository = springDataProductoRepository;
    }

    @Override
    public Optional<Venta> findById(Long id) {
        return springDataVentaRepository.findById(id)
                .map(VentaMapper::toDomain);
    }

    @Override
    @Transactional
    public Venta save(Venta venta) {
        Long usuarioId = venta.getUsuario() != null ? venta.getUsuario().getId() : null;
        UsuarioEntity usuarioEntity = springDataUsuarioRepository.getReferenceById(usuarioId);
        VentaEntity entity = VentaMapper.toEntity(venta, usuarioEntity);

        if (venta.getDetalles() != null) {
            for (DetalleVenta detalle : venta.getDetalles()) {
                ProductoEntity productoEntity = springDataProductoRepository
                        .getReferenceById(detalle.getProducto().getId());
                DetalleVentaEntity detalleEntity = VentaMapper.toDetalleEntity(detalle, entity, productoEntity);
                entity.getDetalles().add(detalleEntity);
            }
        }

        VentaEntity saved = springDataVentaRepository.save(entity);
        return VentaMapper.toDomain(saved);
    }
}
