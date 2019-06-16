package com.petshop.main.objetos.resource;

import com.petshop.main.objetos.model.Animal;
import com.petshop.main.objetos.repository.AnimalDAO;
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
@RequestMapping("/animais")
public class ResAnimal {

    @Autowired
    private AnimalDAO animalDAO;

    @PostMapping
    public Animal adicionar(@Valid @RequestBody Animal animal) {
        return animalDAO.save(animal);
    }

    @PostMapping("/pessoa/{id}")
    public List<Animal> listar(@RequestBody Animal animal) {
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withMatcher("pessoa", GenericPropertyMatchers.ignoreCase());
        Example<Animal> example = Example.<Animal>of(animal, matcher);
        Sort ordenador = new Sort(Sort.Direction.ASC, "id");
        return animalDAO.findAll(example, ordenador);
    }
    
    @GetMapping
    public List<Animal> listarTodos() {
        Sort ordenador = new Sort(Sort.Direction.ASC, "id");
        return animalDAO.findAll(ordenador);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Animal> buscar(@PathVariable Long id) {
        Animal animal = animalDAO.findOne(id);

        if (animal == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(animal);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Animal> atualizar(@PathVariable Long id,
            @Valid @RequestBody Animal animal) {
        Animal existente = animalDAO.findOne(id);

        if (existente == null) {
            return ResponseEntity.notFound().build();
        }

        BeanUtils.copyProperties(animal, existente, "id");

        existente = animalDAO.save(existente);

        return ResponseEntity.ok(existente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        Animal animal = animalDAO.findOne(id);

        if (animal == null) {
            return ResponseEntity.notFound().build();
        }

        animalDAO.delete(animal);

        return ResponseEntity.noContent().build();
    }
}
