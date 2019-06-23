package com.petshop.main.objetos.repository;

import com.petshop.main.objetos.model.AnimalVacina;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalVacinaDAO extends JpaRepository<AnimalVacina, Long> {

}
