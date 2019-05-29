package com.petshop.main.objetos.relatorios;

import com.petshop.main.postgresconnection.TransacaoPostgres;
import filtros.FiltroRelVendas;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Calendar;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRResultSetDataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.view.JasperViewer;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleHtmlExporterOutput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import java.util.Calendar;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class RelVendas {

    public static void main(String[] args) throws Exception {
        RelVendas r = new RelVendas();
        FiltroRelVendas f = new FiltroRelVendas();
        f.setFormaPagamento(2);
        f.setPeriodoFinal(new Date());
        Calendar c = Calendar.getInstance();
        c.set(2019, Calendar.MAY, 01);
        Date data = c.getTime();
        f.setPeriodoInicial(data);
        try {
            r.gerarRelatorioClientesAnalitico(f);
        } catch (Exception ex) {
            Logger.getLogger(RelVendas.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public byte[] gerarRelatorioClientesAnalitico(FiltroRelVendas f) throws Exception {
        TransacaoPostgres transacao = new TransacaoPostgres();
        Connection connection = transacao.conectarBanco();
        String query = "";   
        Statement stm = connection.createStatement();
       try {
            query = "select v.id as idVenda, p.nome as NomeProduto, i.valor_unitario as valorUnitario, (i.valor_unitario * i.quantidade) as valorTotal, v.valor_total as valorTotalVenda, to_char(v.data_venda, 'DD/MM/YYYY hh:mm:ss') as dataEmissao,\n"
                    + "i.quantidade as quantidade, pes.nome as nomePessoa,\n"
                    + "case when v.forma_pagamento = 0 then\n"
                    + "     'Dinheiro' \n"
                    + "else \n"
                    + "    case when v.forma_pagamento = 1 then \n"
                    + "        'Cartão'\n"
                    + "    else \n"
                    + "        'A Prazo'\n"
                    + "    end\n"
                    + "end as formaPagamento\n"
                    + "from vendas v\n"
                    + "left join vendas_item i on v.id = i.id_venda\n"
                    + "left join produtos p on p.id = i.id_produto\n"
                    + "left join pessoas pes on pes.id = v.id_pessoa\n"
                    + "where true\n";
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
            if (f.getPeriodoInicial() != null && f.getPeriodoFinal() != null) {
                query += "AND v.data_venda BETWEEN ";
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                sdf.format(f.getPeriodoInicial());
                query += "'"+sdf.format(f.getPeriodoInicial())+"'";
                query += "and '"+sdf.format(f.getPeriodoFinal())+"'";
                
            }
            
            System.out.println(query); 
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

            JasperViewer jv = new JasperViewer(print, false);
            jv.setVisible(true);

            return pdfReportStream.toByteArray();

        } catch (JRException | SQLException ex) {
            
            throw ex;
        }
    }
}
