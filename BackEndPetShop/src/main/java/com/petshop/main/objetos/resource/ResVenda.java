package com.petshop.main.objetos.resource;

import com.petshop.main.objetos.model.Venda;
import com.petshop.main.objetos.repository.VendaDAO;
import com.petshop.main.objetos.repository.VendaItemDAO;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/vendas")
public class ResVenda {

    @Autowired
    private VendaDAO vendaDAO;
    
    @Autowired
    private VendaItemDAO vendaItemDAO;

    @PostMapping
    public ResponseEntity<Void> adicionar(@Valid @RequestBody Venda venda) {
        vendaDAO.save(venda);
        venda.getListaItens().forEach((item) -> {
            item.setVenda(venda);
            vendaItemDAO.save(item);
        });
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<Venda> listar() {
        Sort ordenador = new Sort(Sort.Direction.ASC, "id");
        return vendaDAO.findAll(ordenador);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venda> buscar(@PathVariable Long id) {
        Venda venda = vendaDAO.findOne(id);

        if (venda == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(venda);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Venda> atualizar(@PathVariable Long id, @Valid @RequestBody Venda venda) {
        Venda existente = vendaDAO.findOne(id);

        if (existente == null) {
            return ResponseEntity.notFound().build();
        }

        BeanUtils.copyProperties(venda, existente, "id");

        existente = vendaDAO.save(existente);

        return ResponseEntity.ok(existente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        Venda venda = vendaDAO.findOne(id);

        if (venda == null) {
            return ResponseEntity.notFound().build();
        }

        vendaDAO.delete(venda);

        return ResponseEntity.noContent().build();
    }

}
