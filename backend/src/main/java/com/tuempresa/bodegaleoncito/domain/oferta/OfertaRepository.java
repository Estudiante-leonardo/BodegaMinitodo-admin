package com.tuempresa.bodegaleoncito.domain.oferta;

import java.util.List;
import java.util.Optional;

public interface OfertaRepository {
    List<Oferta> findAll();
    Optional<Oferta> findById(Long id);
    Oferta save(Oferta oferta);
    void delete(Oferta oferta);
}
