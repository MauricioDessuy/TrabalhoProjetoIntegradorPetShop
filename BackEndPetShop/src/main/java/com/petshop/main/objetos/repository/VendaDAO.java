package com.petshop.main.objetos.repository;

import com.petshop.main.objetos.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendaDAO extends JpaRepository<Venda, Long> {

}
