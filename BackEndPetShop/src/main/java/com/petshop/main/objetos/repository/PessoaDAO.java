package com.petshop.main.objetos.repository;

import com.petshop.main.objetos.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaDAO extends JpaRepository<Pessoa, Long> {

}
