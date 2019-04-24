package com.petshop.main.objetos.model;

import com.petshop.main.enumeracoes.FormaPagamento;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "vendas")
public class Venda implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "id_pessoa")
    private Integer idPessoa;
    
    @NotNull
    @Column(name = "data_venda")
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private Date dataVenda;
    
    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "forma_pagamento")
    private FormaPagamento formaPagamento;
    
    @NotNull
    @Column(name = "valor_total")
    private Float valorTotal;

    @Transient
    private ArrayList<VendaItem> listaItens;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdPessoa() {
        return idPessoa;
    }

    public void setIdPessoa(Integer idPessoa) {
        this.idPessoa = idPessoa;
    }

    public Date getDataVenda() {
        return dataVenda;
    }

    public void setDataVenda(Date dataVenda) {
        this.dataVenda = dataVenda;
    }

    public FormaPagamento getFormaPagamento() {
        return formaPagamento;
    }

    public void setFormaPagamento(FormaPagamento formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    public Float getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(Float valorTotal) {
        this.valorTotal = valorTotal;
    }

    public ArrayList<VendaItem> getListaItens() {
        return listaItens;
    }

    public void setListaItens(ArrayList<VendaItem> listaItens) {
        this.listaItens = listaItens;
    }
    
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        Venda other = (Venda) obj;
        if (id == null) {
            if (other.id != null) {
                return false;
            }
        } else if (!id.equals(other.id)) {
            return false;
        }
        return true;
    }

}
