package com.tuempresa.bodegaleoncito.infrastructure.persistence.repository.spring;

import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.VentaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataVentaRepository extends JpaRepository<VentaEntity, Long> {}
