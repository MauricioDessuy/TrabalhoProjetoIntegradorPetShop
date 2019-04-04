package com.petshop.main.objetos.repository;

import com.petshop.main.objetos.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoDAO extends JpaRepository<Produto, Long> {

}
