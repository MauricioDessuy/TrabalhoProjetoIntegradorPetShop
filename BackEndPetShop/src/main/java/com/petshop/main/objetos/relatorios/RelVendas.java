package com.petshop.main.objetos.relatorios;

import com.petshop.main.postgresconnection.TransacaoPostgres;
import filtros.FiltroRelVendas;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRResultSetDataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import java.text.SimpleDateFormat;

public class RelVendas {

    public byte[] gerarRelatorioVendas(FiltroRelVendas f) throws Exception {
        TransacaoPostgres transacao = new TransacaoPostgres();
        Connection connection = transacao.conectarBanco();
        String query = "";
        Statement stm = connection.createStatement();
        try {
            query = "SELECT v.id AS idVenda, p.nome AS NomeProduto, i.valor_unitario AS valorUnitario, (i.valor_unitario * i.quantidade) AS valorTotal, v.valor_total AS valorTotalVenda, TO_CHAR(v.data_venda, 'DD/MM/YYYY hh:mm:ss') AS dataEmissao,\n"
                    + "i.quantidade AS quantidade, pes.nome AS nomePessoa,\n"
                    + "CASE WHEN v.forma_pagamento = 0 THEN\n"
                    + "     'Dinheiro' \n"
                    + "ELSE \n"
                    + "    CASE WHEN v.forma_pagamento = 1 THEN \n"
                    + "        'Cartão'\n"
                    + "    ELSe \n"
                    + "        'A Prazo'\n"
                    + "    END\n"
                    + "END AS formaPagamento\n"
                    + "FROM vendas v\n"
                    + "LEFT JOIN vendas_item i ON v.id = i.id_venda\n"
                    + "LEFT JOIN produtos p ON p.id = i.id_produto\n"
                    + "LEFT JOIN pessoas pes ON pes.id = v.id_pessoa\n"
                    + "WHERE TRUE\n";
            int forma = 0;
            forma = f.getFormaPagamento();
            switch (forma) {
                case -1:
                    break;
                case 0:
                    query += "AND v.forma_pagamento = 0\n";
                    break;
                case 1:
                    query += "AND v.forma_pagamento = 1\n";
                    break;
                case 2:
                    query += "AND v.forma_pagamento = 2\n";
                    break;
            }
            if (f.getDataInicial() != null && f.getDataFinal() != null) {
                query += "AND DATE(v.data_venda) BETWEEN ";
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                query += "'" + sdf.format(f.getDataInicial()) + "'";
                query += " AND '" + sdf.format(f.getDataFinal()) + "'";
            }

            ResultSet rs = stm.executeQuery(query);
            JRResultSetDataSource jrRS = new JRResultSetDataSource(rs);
            InputStream fonte = this.getClass().getClassLoader().getResourceAsStream("RelatorioVendas.jrxml");
            JasperReport report = JasperCompileManager.compileReport(fonte);
            JasperPrint print = JasperFillManager.fillReport(report, null, jrRS);

            JRPdfExporter pdfExporter = new JRPdfExporter();
            pdfExporter.setExporterInput(new SimpleExporterInput(print));
            ByteArrayOutputStream pdfReportStream = new ByteArrayOutputStream();
            pdfExporter.setExporterOutput(new SimpleOutputStreamExporterOutput(pdfReportStream));
            pdfExporter.exportReport();

//            JasperViewer jv = new JasperViewer(print, false);
//            jv.setVisible(true);
            return pdfReportStream.toByteArray();
        } catch (JRException | SQLException ex) {
            throw ex;
        }
    }
}
