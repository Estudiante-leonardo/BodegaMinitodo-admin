package com.tuempresa.bodegaleoncito.infrastructure.persistence.repository;

import com.tuempresa.bodegaleoncito.domain.oferta.Oferta;
import com.tuempresa.bodegaleoncito.domain.oferta.OfertaRepository;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.entity.OfertaEntity;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.mapper.OfertaMapper;
import com.tuempresa.bodegaleoncito.infrastructure.persistence.repository.spring.SpringDataOfertaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class JpaOfertaRepositoryAdapter implements OfertaRepository {

    private final SpringDataOfertaRepository springDataOfertaRepository;

    public JpaOfertaRepositoryAdapter(SpringDataOfertaRepository springDataOfertaRepository) {
        this.springDataOfertaRepository = springDataOfertaRepository;
    }

    @Override
    public List<Oferta> findAll() {
        return springDataOfertaRepository.findAll().stream()
                .map(OfertaMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Oferta> findById(Long id) {
        return springDataOfertaRepository.findById(id)
                .map(OfertaMapper::toDomain);
    }

    @Override
    public Oferta save(Oferta oferta) {
        OfertaEntity entity = OfertaMapper.toEntity(oferta);
        OfertaEntity saved = springDataOfertaRepository.save(entity);
        return OfertaMapper.toDomain(saved);
    }

    @Override
    public void delete(Oferta oferta) {
        springDataOfertaRepository.deleteById(oferta.getId());
    }
}
