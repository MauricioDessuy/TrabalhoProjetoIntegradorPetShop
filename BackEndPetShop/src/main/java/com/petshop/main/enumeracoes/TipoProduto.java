package com.petshop.main.enumeracoes;

public enum TipoProduto {
     PRODUTO("Produto"), SERVICO("Servico"), VACINA("Vacina");
    
    
    /**
     * Atributo utilizado para armazenar um texto para ser utilizado nas representações graficas do sexo da pessoa.
     */
    private final String nome;

    /**
     * Construtor utilizado para definir os atributos que os tipo terão.
     * @param id
     * @param nome 
     */
    private TipoProduto(String nome) {
        this.nome = nome;
    }

    /**
     * Método utilizado para retornar a sigla do tipo.
     * @return 
     */

    /**
     * Método utilizado para retornar o nome do tipo.
     * @return 
     */
    public String getNome() {
        return nome;
    }
}
