package com.petshop.main.postgresconnection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Classe que representa uma transação com o banco de dados.<br>
 * @author MuMau
 */
public class TransacaoPostgres {
    
    private final String SERVIDOR = "localhost/PetShop";
    private final String USUARIO = "postgres";
    private final String SENHA = "123";

    private Connection conexao;
    
    /**
     * Método utilizado para criar a conexão com o banco de dados postgres.
     * @return Conexao - Com esta conexão será realizado as operações envolvendo banco de dados.
     */
    public Connection conectarBanco() {
        try {
            conexao = DriverManager.getConnection("jdbc:postgresql://" + SERVIDOR, USUARIO, SENHA);
            conexao.setAutoCommit(false);
            return conexao;
        } catch (SQLException ex) {
            Logger.getLogger(TransacaoPostgres.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    /**
     * Método utilizado para executar sql's de update no banco de dados.
     * @param sql - Comando sql.
     * @return - Número de linhas afetadas
     * @throws java.lang.Exception
     */
    public int executarAlteracao(String sql) throws Exception {
        if (conexao == null) {
            throw new Exception("Erro de conexão!");
        }
        
        Statement stmt = conexao.createStatement();
        return stmt.executeUpdate(sql);
    }
    
    /**
     * Método utilizado para executar um método de consulta no banco de dados.
     * @param sql - Comando sql
     * @return 
     * @throws java.lang.Exception 
     */
    public ResultSet executarConsulta(String sql) throws Exception {
        if (conexao == null) {
            throw new Exception("Erro de conexão!");
        }
        
        Statement stmt = conexao.createStatement();
        ResultSet resultSet = stmt.executeQuery(sql);
        if (resultSet != null) {
            return resultSet;
        } else {
            throw new Exception("Erro ao realizar a consulta SQL.");
        }
    }
    
    
    public void finalizarConexao() throws SQLException {
        if (conexao != null && !conexao.isClosed()) {
            conexao.close();
        }
    }
}
