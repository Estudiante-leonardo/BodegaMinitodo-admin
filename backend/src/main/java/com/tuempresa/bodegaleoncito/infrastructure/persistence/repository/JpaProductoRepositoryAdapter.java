package com.tuempresa.bodegaleoncito.infrastructure.persistence.repository;

import com.tuempresa.bodegaleoncito.domain.producto.Producto;
import com.tuempresa.bodegaleoncito.domain.producto.ProductoRepository;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.CategoriaEntity;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.ProductoEntity;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.mapper.ProductoMapper;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.repository.spring.SpringDataCategoriaRepository;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.repository.spring.SpringDataProductoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class JpaProductoRepositoryAdapter implements ProductoRepository {

    private final SpringDataProductoRepository springDataProductoRepository;
    private final SpringDataCategoriaRepository springDataCategoriaRepository;

    public JpaProductoRepositoryAdapter(SpringDataProductoRepository springDataProductoRepository,
                                         SpringDataCategoriaRepository springDataCategoriaRepository) {
        this.springDataProductoRepository = springDataProductoRepository;
        this.springDataCategoriaRepository = springDataCategoriaRepository;
    }

    @Override
    public List<Producto> findAll() {
        return springDataProductoRepository.findAll().stream()
                .map(ProductoMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Producto> findById(Long id) {
        return springDataProductoRepository.findById(id)
                .map(ProductoMapper::toDomain);
    }

    @Override
    public Producto save(Producto producto) {
        CategoriaEntity categoriaEntity = null;
        if (producto.getCategoria() != null && producto.getCategoria().getId() != null) {
            categoriaEntity = springDataCategoriaRepository.getReferenceById(producto.getCategoria().getId());
        }
        ProductoEntity entity = ProductoMapper.toEntityWithCategoria(producto, categoriaEntity);
        ProductoEntity saved = springDataProductoRepository.save(entity);
        return ProductoMapper.toDomain(saved);
    }

    @Override
    public void delete(Producto producto) {
        springDataProductoRepository.deleteById(producto.getId());
    }
}
