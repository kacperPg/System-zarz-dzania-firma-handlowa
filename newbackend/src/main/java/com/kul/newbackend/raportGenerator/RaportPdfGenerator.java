package com.kul.newbackend.raportGenerator;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.kul.newbackend.dto.ClientDto;
import com.kul.newbackend.dto.OrderDto;
import com.kul.newbackend.entities.DateSet;
import com.kul.newbackend.services.ClientService;
import com.kul.newbackend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component("RaportPdfGenerator")
public class RaportPdfGenerator {
    @Value("${reportFileName}")
    private String reportFileName;

    @Value("${reportFileNameDateFormat}")
    private String reportFileNameDateFormat;

    @Value("${localDateFormat}")
    private String localDateFormat;


    @Value("${table_noOfColumns}")
    private int noOfColumns;

    @Value("${table.columnNames}")
    private List<String> columnNames;

    @Autowired
    OrderService orderService;

    @Autowired
    ClientService clientService;

    private static Font COURIER = new Font(Font.FontFamily.COURIER, 20, Font.BOLD);
    private static Font COURIER_SMALL = new Font(Font.FontFamily.COURIER, 16, Font.BOLD);
    private static Font COURIER_SMALL_FOOTER = new Font(Font.FontFamily.COURIER, 12, Font.BOLD);

    public byte[] generatePdfReport() {
        Document document = new Document();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, baos);
            document.open();
            addDocTitle(document, null);
            createTable(document, noOfColumns, null);
            addFooter(document);
            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return baos.toByteArray();
    }


    private void addDocTitle(Document document, DateSet dates) throws DocumentException {
        String localDateString = LocalDateTime.now().format(DateTimeFormatter.ofPattern(localDateFormat));
        Paragraph p1 = new Paragraph();
        leaveEmptyLine(p1, 1);
        p1.add(new Paragraph(reportFileName, COURIER));
        p1.setAlignment(Element.ALIGN_CENTER);
        leaveEmptyLine(p1, 1);
        if(dates==null){
            p1.add(new Paragraph("Report wygenerowany: " + localDateString, COURIER_SMALL));

        }else{
            p1.add(new Paragraph("Report wygenerowany: " + localDateString + "\nDla zakresu dat od " + dates.getBeforeDate().toString() + " do " + dates.getAfterDate().toString(), COURIER_SMALL));

        }

        document.add(p1);

    }

    private void createTable(Document document, int noOfColumns, DateSet dates) throws DocumentException {
        Paragraph paragraph = new Paragraph();
        leaveEmptyLine(paragraph, 3);
        document.add(paragraph);

        PdfPTable table = new PdfPTable(noOfColumns);

        for(int i=0; i<noOfColumns; i++) {
            PdfPCell cell = new PdfPCell(new Phrase(columnNames.get(i)));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setBackgroundColor(BaseColor.CYAN);
            table.addCell(cell);
        }

        table.setHeaderRows(1);
        getDbData(table, dates);
        document.add(table);
    }

    private void getDbData(PdfPTable table, DateSet dates) {

        List<OrderDto> orders = orderService.getAllOrders();
        List<ClientDto> clientsDB = clientService.getAllClients();


        List<Long> clients = orders.stream()
                .map(s -> {
                    if (s.getClient() == null) {
                        System.err.println("Order " + s.getOrderId() + " has a null client");
                        return null;
                    }
                    return s.getClient().getClientId();
                })
                .filter(Objects::nonNull)
                .distinct()
                .collect(Collectors.toList());

        for (Long client : clients) {
            String clientName = clientsDB.stream()
                    .filter(s -> Objects.equals(s.getClientId(), client))
                    .map(ClientDto::getClientName)
                    .filter(Objects::nonNull)
                    .findFirst()
                    .orElse("Unknown Client");

            List<OrderDto> clientOrders;
            if(dates == null){
                clientOrders = orders.stream()
                        .filter(order -> Objects.equals(order.getClient().getClientId(), client))
                        .filter(s -> "SHIPPED".equals(s.getStatus()) || "DELIVERED".equals(s.getStatus()))
                        .collect(Collectors.toList());
            }else{
                clientOrders = orders.stream()
                        .filter(order -> Objects.equals(order.getClient().getClientId(), client))
                        .filter(s -> "SHIPPED".equals(s.getStatus()) || "DELIVERED".equals(s.getStatus()))
                        .filter(s -> s.getOrderDate().isBefore(dates.getBeforeDate()))
                        .filter(s -> s.getOrderDate().isAfter(dates.getAfterDate()))
                        .collect(Collectors.toList());
            }




            int totalAmountOfProducts = clientOrders.stream()
                    .mapToInt(OrderDto::getTotalAmount)
                    .sum();

            double totalAmountPrices = clientOrders.stream()
                    .mapToDouble(order -> order.getTotalPrice() != null ? order.getTotalPrice() : 0)
                    .sum();

            RaportClient raport = RaportClient.builder()
                    .clientName(clientName)
                    .totalAmountOfProducts(totalAmountOfProducts)
                    .totalAmountPrices(totalAmountPrices)
                    .build();

            table.addCell(raport.getClientName());
            table.addCell(String.valueOf(raport.getTotalAmountOfProducts()));
            table.addCell(String.valueOf(raport.getTotalAmountPrices()));
        }
    }

    private void addFooter(Document document) throws DocumentException {
        Paragraph p2 = new Paragraph();
        leaveEmptyLine(p2, 3);
        p2.setAlignment(Element.ALIGN_MIDDLE);
        p2.add(new Paragraph(
                "----------------------------" +reportFileName+"------------------------",
                COURIER_SMALL_FOOTER));

        document.add(p2);
    }

    private static void leaveEmptyLine(Paragraph paragraph, int number) {
        for (int i = 0; i < number; i++) {
            paragraph.add(new Paragraph(" "));
        }
    }

    public byte[] generatePdfReportInRanges(DateSet dates) {
        Document document = new Document();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, baos);
            document.open();
            addDocTitle(document, dates);
            createTable(document, noOfColumns, dates);
            addFooter(document);
            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return baos.toByteArray();
    }


}
