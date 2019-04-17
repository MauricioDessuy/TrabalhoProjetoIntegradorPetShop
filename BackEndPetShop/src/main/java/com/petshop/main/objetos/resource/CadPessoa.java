package com.petshop.main.objetos.resource;

import com.petshop.main.objetos.model.Pessoa;
import com.petshop.main.objetos.repository.PessoaDAO;
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
@RequestMapping("/pessoas")
public class CadPessoa {

    @Autowired
    private PessoaDAO pessoaDAO;

    @PostMapping
    public Pessoa adicionar(@Valid @RequestBody Pessoa pessoa) {
        return pessoaDAO.save(pessoa);
    }

    @GetMapping
    public List<Pessoa> listar() {
        Sort ordenador = new Sort(Sort.Direction.ASC, "id");
        return pessoaDAO.findAll(ordenador);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pessoa> buscar(@PathVariable Long id) {
        Pessoa pessoa = pessoaDAO.findOne(id);

        if (pessoa == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(pessoa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pessoa> atualizar(@PathVariable Long id,
            @Valid @RequestBody Pessoa pessoa) {
        Pessoa existente = pessoaDAO.findOne(id);

        if (existente == null) {
            return ResponseEntity.notFound().build();
        }

        BeanUtils.copyProperties(pessoa, existente, "id");

        existente = pessoaDAO.save(existente);

        return ResponseEntity.ok(existente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        Pessoa pessoa = pessoaDAO.findOne(id);

        if (pessoa == null) {
            return ResponseEntity.notFound().build();
        }

        pessoaDAO.delete(pessoa);

        return ResponseEntity.noContent().build();
    }

   // @RequestMapping("/pessoas/logar")
    @PostMapping("/logar")
    public boolean logar(@RequestBody Pessoa pessoa) {
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withMatcher("usuario", GenericPropertyMatchers.ignoreCase()).withMatcher("senha", GenericPropertyMatchers.ignoreCase());
        Example<Pessoa> example = Example.<Pessoa>of(pessoa, matcher);
        boolean exists = pessoaDAO.exists(example);
        return exists;
    }
}
