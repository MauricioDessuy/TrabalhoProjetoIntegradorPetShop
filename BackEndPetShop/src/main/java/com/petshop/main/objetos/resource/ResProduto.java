package com.petshop.main.objetos.resource;

import com.petshop.main.objetos.model.Produto;
import com.petshop.main.objetos.repository.ProdutoDAO;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/produtos")
public class ResProduto {

    @Autowired
    private ProdutoDAO produtoDAO;

    @PostMapping
    public Produto adicionar(@Valid @RequestBody Produto produto) {
        return produtoDAO.save(produto);
    }

    @GetMapping
    public List<Produto> listar(@RequestParam(required = false) String nome) {
        Sort ordenador = new Sort(Sort.Direction.ASC, "id");
        if (nome != null) {
            Produto produto = new Produto();
            produto.setValorUnitario(Float.MIN_VALUE);
            produto.setNome(nome);
            ExampleMatcher matcher = ExampleMatcher.matchingAny().withMatcher("nome", GenericPropertyMatchers.contains());
            Example<Produto> example = Example.<Produto>of(produto, matcher);
            return produtoDAO.findAll(example, ordenador);
        } else {
            return produtoDAO.findAll(ordenador);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscar(@PathVariable Long id) {
        Produto produto = produtoDAO.findOne(id);

        if (produto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id,
            @Valid @RequestBody Produto produto) {
        Produto existente = produtoDAO.findOne(id);

        if (existente == null) {
            return ResponseEntity.notFound().build();
        }

        BeanUtils.copyProperties(produto, existente, "id");

        existente = produtoDAO.save(existente);

        return ResponseEntity.ok(existente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        Produto produto = produtoDAO.findOne(id);

        if (produto == null) {
            return ResponseEntity.notFound().build();
        }

        produtoDAO.delete(produto);

        return ResponseEntity.noContent().build();
    }
    
}
