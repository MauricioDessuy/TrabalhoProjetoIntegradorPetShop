package com.petshop.main.objetos.resource;

import com.petshop.main.objetos.model.Cirurgia;
import com.petshop.main.objetos.repository.CirurgiaDAO;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
@RequestMapping("/cirurgias")
public class ResCirurgia {

    @Autowired
    private CirurgiaDAO cirurgiaDAO;

    @PostMapping
    public Cirurgia adicionar(@Valid @RequestBody Cirurgia cirurgia) {
        return cirurgiaDAO.save(cirurgia);
    }

    @GetMapping
    public List<Cirurgia> listar() {
        Sort ordenador = new Sort(Sort.Direction.ASC, "id");
        return cirurgiaDAO.findAll(ordenador);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cirurgia> buscar(@PathVariable Long id) {
        Cirurgia cirurgia = cirurgiaDAO.findOne(id);

        if (cirurgia == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(cirurgia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cirurgia> atualizar(@PathVariable Long id,
            @Valid @RequestBody Cirurgia cirurgia) {
        Cirurgia existente = cirurgiaDAO.findOne(id);

        if (existente == null) {
            return ResponseEntity.notFound().build();
        }

        BeanUtils.copyProperties(cirurgia, existente, "id");

        existente = cirurgiaDAO.save(existente);

        return ResponseEntity.ok(existente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        Cirurgia cirurgia = cirurgiaDAO.findOne(id);

        if (cirurgia == null) {
            return ResponseEntity.notFound().build();
        }

        cirurgiaDAO.delete(cirurgia);

        return ResponseEntity.noContent().build();
    }

}
