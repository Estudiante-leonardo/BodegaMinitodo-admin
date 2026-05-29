package com.tuempresa.bodegaleoncito.infrastructure.persistence.repository.spring;

import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.OfertaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataOfertaRepository extends JpaRepository<OfertaEntity, Long> {}
