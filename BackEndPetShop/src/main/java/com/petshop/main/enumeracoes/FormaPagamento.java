package com.petshop.main.enumeracoes;

/**
 *
 * @author MuMau
 */
public enum FormaPagamento {
    
    DINHEIRO("Dinheiro"), CARTAO("Cartão"), A_PRAZO("A Prazo");
    
    /**
     * Atributo utilizado para armazenar um texto para ser utilizado nas representações graficas do tipo de pagamento.
     */
    private final String nome;

    /**
     * Construtor utilizado para definir os atributos que os tipo terão.
     * @param id
     * @param nome 
     */
    private FormaPagamento(String nome) {
        this.nome = nome;
    }

    /**
     * Método utilizado para retornar o nome do tipo.
     * @return 
     */
    public String getNome() {
        return nome;
    }
    
    
}
