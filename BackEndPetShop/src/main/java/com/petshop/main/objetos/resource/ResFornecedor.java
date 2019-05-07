package com.petshop.main.objetos.resource;

import com.petshop.main.objetos.model.Fornecedor;
import com.petshop.main.objetos.repository.FornecedorDAO;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers;
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
@RequestMapping("/fornecedores")
public class ResFornecedor {

    @Autowired
    private FornecedorDAO fornecedorDAO;

    @PostMapping
    public Fornecedor adicionar(@Valid @RequestBody Fornecedor fornecedor) {
        return fornecedorDAO.save(fornecedor);
    }

    @GetMapping
    public List<Fornecedor> listar() {
        Sort ordenador = new Sort(Sort.Direction.ASC, "id");
        return fornecedorDAO.findAll(ordenador);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fornecedor> buscar(@PathVariable Long id) {
        Fornecedor fornecedor = fornecedorDAO.findOne(id);

        if (fornecedor == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(fornecedor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fornecedor> atualizar(@PathVariable Long id,
            @Valid @RequestBody Fornecedor fornecedor) {
        Fornecedor existente = fornecedorDAO.findOne(id);

        if (existente == null) {
            return ResponseEntity.notFound().build();
        }

        BeanUtils.copyProperties(fornecedor, existente, "id");

        existente = fornecedorDAO.save(existente);

        return ResponseEntity.ok(existente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        Fornecedor fornecedor = fornecedorDAO.findOne(id);

        if (fornecedor == null) {
            return ResponseEntity.notFound().build();
        }

        fornecedorDAO.delete(fornecedor);

        return ResponseEntity.noContent().build();
    }
}
