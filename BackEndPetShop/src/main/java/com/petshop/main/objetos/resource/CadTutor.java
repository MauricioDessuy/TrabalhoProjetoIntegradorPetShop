package com.petshop.main.objetos.resource;

import com.petshop.main.objetos.model.Tutor;
import com.petshop.main.objetos.repository.TutorDAO;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/tutores")
public class CadTutor {

    @Autowired
    private TutorDAO tutorDAO;

    @PostMapping
    public Tutor adicionar(@Valid @RequestBody Tutor tutor) {
        return tutorDAO.save(tutor);
    }

    @GetMapping
    public List<Tutor> listar() {
        return tutorDAO.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tutor> buscar(@PathVariable Long id) {
        Tutor contato = tutorDAO.findOne(id);

        if (contato == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(contato);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tutor> atualizar(@PathVariable Long id,
            @Valid @RequestBody Tutor contato) {
        Tutor existente = tutorDAO.findOne(id);

        if (existente == null) {
            return ResponseEntity.notFound().build();
        }

        BeanUtils.copyProperties(contato, existente, "id");

        existente = tutorDAO.save(existente);

        return ResponseEntity.ok(existente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        Tutor contato = tutorDAO.findOne(id);

        if (contato == null) {
            return ResponseEntity.notFound().build();
        }

        tutorDAO.delete(contato);

        return ResponseEntity.noContent().build();
    }
}