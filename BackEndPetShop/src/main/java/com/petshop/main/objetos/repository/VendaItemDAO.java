package com.petshop.main.objetos.repository;

import com.petshop.main.objetos.model.VendaItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendaItemDAO extends JpaRepository<VendaItem, Long> {

}
