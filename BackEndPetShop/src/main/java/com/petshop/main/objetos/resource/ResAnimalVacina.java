package com.petshop.main.objetos.resource;

import com.petshop.main.objetos.model.AnimalVacina;
import com.petshop.main.objetos.repository.AnimalVacinaDAO;
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
@RequestMapping("/animal_vacina")
public class ResAnimalVacina {

    @Autowired
    private AnimalVacinaDAO animalVacinaDAO;

    @PostMapping
    public AnimalVacina adicionar(@Valid @RequestBody AnimalVacina animalVacina) {
        return animalVacinaDAO.save(animalVacina);
    }

    @PostMapping("/pessoa/{id}")
    public List<AnimalVacina> listar(@RequestBody AnimalVacina animalVacina) {
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withMatcher("pessoa", GenericPropertyMatchers.ignoreCase());
        Example<AnimalVacina> example = Example.<AnimalVacina>of(animalVacina, matcher);
        Sort ordenador = new Sort(Sort.Direction.ASC, "id");
        return animalVacinaDAO.findAll(example, ordenador);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalVacina> buscar(@PathVariable Long id) {
        AnimalVacina animalVacina = animalVacinaDAO.findOne(id);

        if (animalVacina == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(animalVacina);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnimalVacina> atualizar(@PathVariable Long id,
            @Valid @RequestBody AnimalVacina animalVacina) {
        AnimalVacina existente = animalVacinaDAO.findOne(id);

        if (existente == null) {
            return ResponseEntity.notFound().build();
        }

        BeanUtils.copyProperties(animalVacina, existente, "id");

        existente = animalVacinaDAO.save(existente);

        return ResponseEntity.ok(existente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        AnimalVacina animalVacina = animalVacinaDAO.findOne(id);

        if (animalVacina == null) {
            return ResponseEntity.notFound().build();
        }

        animalVacinaDAO.delete(animalVacina);

        return ResponseEntity.noContent().build();
    }
}
