package com.tuempresa.bodegaleoncito.infrastructure.persistence.repository;

import com.tuempresa.bodegaleoncito.domain.categoria.Categoria;
import com.tuempresa.bodegaleoncito.domain.categoria.CategoriaRepository;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.CategoriaEntity;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.mapper.CategoriaMapper;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.repository.spring.SpringDataCategoriaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class JpaCategoriaRepositoryAdapter implements CategoriaRepository {

    private final SpringDataCategoriaRepository springDataCategoriaRepository;

    public JpaCategoriaRepositoryAdapter(SpringDataCategoriaRepository springDataCategoriaRepository) {
        this.springDataCategoriaRepository = springDataCategoriaRepository;
    }

    @Override
    public List<Categoria> findAll() {
        return springDataCategoriaRepository.findAll().stream()
                .map(CategoriaMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Categoria> findById(Long id) {
        return springDataCategoriaRepository.findById(id)
                .map(CategoriaMapper::toDomain);
    }

    @Override
    public Categoria save(Categoria categoria) {
        CategoriaEntity entity = CategoriaMapper.toEntity(categoria);
        CategoriaEntity saved = springDataCategoriaRepository.save(entity);
        return CategoriaMapper.toDomain(saved);
    }

    @Override
    public void delete(Categoria categoria) {
        springDataCategoriaRepository.deleteById(categoria.getId());
    }
}
