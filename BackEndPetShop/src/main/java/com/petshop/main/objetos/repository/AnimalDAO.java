package com.petshop.main.objetos.repository;

import com.petshop.main.objetos.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalDAO extends JpaRepository<Animal, Long> {

}
