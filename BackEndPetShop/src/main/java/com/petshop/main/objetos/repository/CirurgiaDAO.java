package com.petshop.main.objetos.repository;

import com.petshop.main.objetos.model.Cirurgia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CirurgiaDAO extends JpaRepository<Cirurgia, Long> {

}
