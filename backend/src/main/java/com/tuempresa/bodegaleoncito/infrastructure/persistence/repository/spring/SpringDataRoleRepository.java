package com.tuempresa.bodegaleoncito.infrastructure.persistence.repository.spring;

import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SpringDataRoleRepository extends JpaRepository<RoleEntity, Long> {
    Optional<RoleEntity> findByNombre(String nombre);
}
