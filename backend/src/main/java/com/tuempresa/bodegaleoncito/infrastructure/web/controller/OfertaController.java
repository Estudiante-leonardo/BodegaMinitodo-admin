package com.tuempresa.bodegaleoncito.infrastructure.web.controller;

import com.tuempresa.bodegaleoncito.application.oferta.OfertaService;
import com.tuempresa.bodegaleoncito.domain.oferta.Oferta;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ofertas")
@CrossOrigin(origins = "*")
public class OfertaController {

    private final OfertaService ofertaService;

    public OfertaController(OfertaService ofertaService) {
        this.ofertaService = ofertaService;
    }

    @GetMapping
    public ResponseEntity<List<Oferta>> listarOfertas() {
        return ResponseEntity.ok(ofertaService.obtenerTodas());
    }

    @GetMapping("/activas")
    public ResponseEntity<List<Oferta>> listarOfertasActivas() {
        return ResponseEntity.ok(ofertaService.obtenerActivas());
    }

    @PostMapping
    public ResponseEntity<Oferta> crearOferta(@RequestBody Oferta oferta) {
        Oferta nuevaOferta = ofertaService.guardar(oferta);
        return new ResponseEntity<>(nuevaOferta, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Oferta> obtenerOferta(@PathVariable Long id) {
        return ResponseEntity.ok(ofertaService.obtenerPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Oferta> actualizarOferta(@PathVariable Long id, @RequestBody Oferta oferta) {
        return ResponseEntity.ok(ofertaService.actualizar(id, oferta));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarOferta(@PathVariable Long id) {
        ofertaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
