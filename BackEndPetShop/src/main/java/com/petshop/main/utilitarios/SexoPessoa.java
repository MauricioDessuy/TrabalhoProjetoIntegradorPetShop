package com.petshop.main.utilitarios;

/**
 *
 * @author MuMau
 */
public enum SexoPessoa {
    
    MASCULINO("M", "Masculino"), FEMININO("F", "Feminino");
    
    /**
     * Atributo para armazenar o id do tipo.<br>
     * Este atributo pode possuir os seguintes valores: M ou F.
     */
    private final String sigla;
    
    /**
     * Atributo utilizado para armazenar um texto para ser utilizado nas representações graficas do sexo da pessoa.
     */
    private final String nome;

    /**
     * Construtor utilizado para definir os atributos que os tipo terão.
     * @param id
     * @param nome 
     */
    private SexoPessoa(String sigla, String nome) {
        this.sigla = sigla;
        this.nome = nome;
    }

    /**
     * Método utilizado para retornar a sigla do tipo.
     * @return 
     */
    public String getSigla() {
        return sigla;
    }

    /**
     * Método utilizado para retornar o nome do tipo.
     * @return 
     */
    public String getNome() {
        return nome;
    }
    
    
}
