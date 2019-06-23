package com.petshop.main.objetos.resource;

import com.petshop.main.enumeracoes.TipoProduto;
import com.petshop.main.objetos.model.Produto;
import com.petshop.main.objetos.repository.ProdutoDAO;
import com.petshop.main.postgresconnection.TransacaoPostgres;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
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
@RequestMapping("/produtos")
public class ResProduto {

    @Autowired
    private ProdutoDAO produtoDAO;

    @PostMapping
    public Produto adicionar(@Valid @RequestBody Produto produto) {
        return produtoDAO.save(produto);
    }

    @GetMapping
    public List<Produto> listar(@RequestParam(required = false) String nome, @RequestParam(required = false) Integer tipoProduto) {
        TransacaoPostgres transacao = new TransacaoPostgres();
        Connection conexao = transacao.conectarBanco();
        ArrayList<Produto> listaProdutos = new ArrayList();
        try {
            Statement stm = conexao.createStatement();
            String sql = "SELECT * \n";
            sql += "FROM produtos \n";
            sql += "WHERE TRUE \n";
            if (nome != null) {
                sql += "AND nome LIKE '" + nome + "%' \n";
            }
            if (tipoProduto != null && tipoProduto != -1) {
                if (tipoProduto == 0) {
                    sql += "AND tipo_produto = " + 0;
                } else if (tipoProduto == 2) {
                    sql += "AND tipo_produto = " + 2;
                }
            }
            ResultSet rs = stm.executeQuery(sql);
            while (rs.next()) {
                Produto produto = new Produto();
                produto.setId(rs.getLong("id"));
                produto.setNome(rs.getString("nome"));
                produto.setMarca(rs.getString("marca"));
                Integer tpProduto = rs.getInt("tipo_produto");
                switch (tpProduto) {
                    case 0:
                        produto.setTipoProduto(TipoProduto.PRODUTO);
                        break;
                    case 1:
                        produto.setTipoProduto(TipoProduto.SERVICO);
                        break;
                    case 2:
                        produto.setTipoProduto(TipoProduto.VACINA);
                        break;
                }
                produto.setValorUnitario(rs.getFloat("valor_unitario"));
                listaProdutos.add(produto);
            }
        } catch (Exception ex) {
            Logger.getLogger(ResProduto.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return listaProdutos;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscar(@PathVariable Long id) {
        Produto produto = produtoDAO.findOne(id);

        if (produto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id,
            @Valid @RequestBody Produto produto) {
        Produto existente = produtoDAO.findOne(id);

        if (existente == null) {
            return ResponseEntity.notFound().build();
        }

        BeanUtils.copyProperties(produto, existente, "id");

        existente = produtoDAO.save(existente);

        return ResponseEntity.ok(existente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        Produto produto = produtoDAO.findOne(id);

        if (produto == null) {
            return ResponseEntity.notFound().build();
        }

        produtoDAO.delete(produto);

        return ResponseEntity.noContent().build();
    }
    
}
