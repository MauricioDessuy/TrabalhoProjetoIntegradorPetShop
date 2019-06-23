package com.petshop.main.objetos.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name = "animal_vacina")
public class AnimalVacina implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_produto", referencedColumnName = "id")
    private Produto produto;

    @Column(name = "data_vacinacao")
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date dataVacinacao;
    
    @Column(name = "data_vencimento")
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date dataVencimento;

    public Date getDataVencimento() {
        return dataVencimento;
    }

    public void setDataVencimento(Date dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_animal", referencedColumnName = "id")
    private Animal animal;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Date getDataVacinacao() {
        return dataVacinacao;
    }

    public void setDataVacinacao(Date dataVacinacao) {
        this.dataVacinacao = dataVacinacao;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
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
        AnimalVacina other = (AnimalVacina) obj;
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
