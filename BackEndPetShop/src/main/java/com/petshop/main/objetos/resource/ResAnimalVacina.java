package com.petshop.main.objetos.resource;

import com.petshop.main.enumeracoes.TipoProduto;
import com.petshop.main.objetos.model.Animal;
import com.petshop.main.objetos.model.AnimalVacina;
import com.petshop.main.objetos.model.Produto;
import com.petshop.main.objetos.relatorios.FiltroVacina;
import com.petshop.main.objetos.repository.AnimalVacinaDAO;
import com.petshop.main.postgresconnection.TransacaoPostgres;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

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
import org.springframework.web.bind.annotation.RequestParam;
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

    @PostMapping("/listar")
    public List<AnimalVacina> listar(@RequestBody FiltroVacina filtro) {
        TransacaoPostgres transacao = new TransacaoPostgres();
        Connection connection = transacao.conectarBanco();
        ArrayList listaAnimalVacina = new ArrayList();

        try {
            Statement stmt = connection.createStatement();

            String sql = "select av.*, p.id as idProd, p.nome as nomeProd, p.marca as marcaProd,p.valor_unitario as valorProd,p.tipo_produto as tipoProd,\n"
                    + "a.id as idAnimal,a.nome as nomeAnimal from animal_vacina av\n"
                    + "left join animals a on a.id = av.id_animal\n"
                    + "left join produtos p on p.id = av.id_produto\n"
                    + "where true\n";
            if (filtro.getNomeAnimal() != null) {
                sql += "and a.nome like '" + filtro.getNomeAnimal() + "%'";
            }
            if (filtro.getDataInicial() != null && filtro.getDataFinal() != null) {
                sql += "AND DATE(av.data_vacinacao) BETWEEN ";
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                sql += "'" + sdf.format(filtro.getDataInicial()) + "'";
                sql += " AND '" + sdf.format(filtro.getDataFinal()) + "'";
            }
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                AnimalVacina av = new AnimalVacina();
                av.setId(rs.getLong("id"));
                Animal a = new Animal();
                a.setId(rs.getLong("idAnimal"));
                a.setNome(rs.getString("nomeAnimal"));
                av.setAnimal(a);
                Produto p = new Produto();
                p.setId(rs.getLong("idProd"));
                p.setNome(rs.getString("nomeProd"));
                p.setMarca(rs.getString("marcaProd"));
                int tipo = rs.getInt("tipoProd");
                switch (tipo) {
                    case 0:
                        p.setTipoProduto(TipoProduto.PRODUTO);
                        break;
                    case 1:
                        p.setTipoProduto(TipoProduto.SERVICO);
                        break;
                    case 2:
                        p.setTipoProduto(TipoProduto.VACINA);
                        break;
                }
                p.setValorUnitario(rs.getFloat("valorProd"));
                av.setProduto(p);
                av.setDataVacinacao(rs.getDate("data_vacinacao"));
                av.setDataVencimento(rs.getDate("data_vencimento"));
                listaAnimalVacina.add(av);

            }
        } catch (Exception ex) {
            Logger.getLogger(ResAnimalVacina.class.getName()).log(Level.SEVERE, null, ex);
        }
        return listaAnimalVacina;
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
