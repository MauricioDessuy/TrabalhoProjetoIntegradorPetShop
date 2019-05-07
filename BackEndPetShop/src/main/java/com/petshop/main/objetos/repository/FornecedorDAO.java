package com.petshop.main.objetos.repository;

import com.petshop.main.objetos.model.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FornecedorDAO extends JpaRepository<Fornecedor, Long> {

}
