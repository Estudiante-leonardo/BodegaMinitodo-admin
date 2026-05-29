package com.tuempresa.bodegaleoncito.infrastructure.persistence.repository.spring;

import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.CategoriaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataCategoriaRepository extends JpaRepository<CategoriaEntity, Long> {}
