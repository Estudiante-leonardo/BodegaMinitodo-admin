package com.tuempresa.bodegaleoncito.infrastructure.persistence.repository.spring;

import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.DetalleVentaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SpringDataDetalleVentaRepository extends JpaRepository<DetalleVentaEntity, Long> {
    List<DetalleVentaEntity> findByVentaId(Long ventaId);
}
