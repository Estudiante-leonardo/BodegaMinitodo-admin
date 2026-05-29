package com.tuempresa.bodegaleoncito.application.oferta;

import com.tuempresa.bodegaleoncito.domain.exception.DomainException;
import com.tuempresa.bodegaleoncito.domain.oferta.Oferta;
import com.tuempresa.bodegaleoncito.domain.oferta.OfertaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class OfertaService {

    private final OfertaRepository ofertaRepository;

    public OfertaService(OfertaRepository ofertaRepository) {
        this.ofertaRepository = ofertaRepository;
    }

    @Transactional(readOnly = true)
    public List<Oferta> obtenerTodas() {
        return ofertaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Oferta> obtenerActivas() {
        return ofertaRepository.findAll().stream().filter(Oferta::isActiva).toList();
    }

    @Transactional
    public Oferta guardar(Oferta oferta) {
        return ofertaRepository.save(oferta);
    }

    @Transactional(readOnly = true)
    public Oferta obtenerPorId(Long id) {
        return ofertaRepository.findById(id)
                .orElseThrow(() -> new DomainException("Oferta no encontrada"));
    }

    @Transactional
    public Oferta actualizar(Long id, Oferta ofertaDetalles) {
        Oferta oferta = obtenerPorId(id);
        oferta.setTitulo(ofertaDetalles.getTitulo());
        oferta.setDescripcion(ofertaDetalles.getDescripcion());
        oferta.setImagen(ofertaDetalles.getImagen());
        oferta.setActiva(ofertaDetalles.isActiva());
        return ofertaRepository.save(oferta);
    }

    @Transactional
    public void eliminar(Long id) {
        Oferta oferta = obtenerPorId(id);
        ofertaRepository.delete(oferta);
    }
}
