package com.kul.newbackend.raportGenerator;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.kul.newbackend.dto.ClientDto;
import com.kul.newbackend.dto.OrderDto;
import com.kul.newbackend.dto.OrderItemsDto;
import com.kul.newbackend.entities.DateSet;
import com.kul.newbackend.services.ClientService;
import com.kul.newbackend.services.OrderItemsService;
import com.kul.newbackend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component("RaportPdfGeneratorProd")
public class RaportPdfGeneratorProd {
    @Value("${reportFileName}")
    private String reportFileName;

    @Value("${reportFileNameDateFormat}")
    private String reportFileNameDateFormat;

    @Value("${localDateFormat}")
    private String localDateFormat;


    @Value("${table_noOfColumns}")
    private int noOfColumns;

    @Value("${table.columnNamesProd}")
    private List<String> columnNames;

    @Autowired
    OrderItemsService orderItemsService;

    @Autowired
    OrderService orderService;



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
        if (dates == null) {
            p1.add(new Paragraph("Report wygenerowany: " + localDateString, COURIER_SMALL));

        } else {
            p1.add(new Paragraph("Report wygenerowany: " + localDateString + "\nDla zakresu dat od " + dates.getBeforeDate().toString() + " do " + dates.getAfterDate().toString(), COURIER_SMALL));

        }

        document.add(p1);

    }

    private void createTable(Document document, int noOfColumns, DateSet dates) throws DocumentException {
        Paragraph paragraph = new Paragraph();
        leaveEmptyLine(paragraph, 3);
        document.add(paragraph);

        PdfPTable table = new PdfPTable(noOfColumns);

        for (int i = 0; i < noOfColumns; i++) {
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
        List<OrderItemsDto> orderItems = orderItemsService.getAllOrderItems();
        Map<Long, String> productNames = new HashMap<>();
        for(OrderItemsDto item : orderItems){
            productNames.put(item.getProductId(), item.getProductName());
        }


        if (dates != null) {
            orders = orders.stream()
                    .filter(order -> (dates.getAfterDate() == null || !order.getOrderDate().isBefore(dates.getAfterDate())) &&
                            (dates.getBeforeDate() == null || !order.getOrderDate().isAfter(dates.getBeforeDate())))
                    .collect(Collectors.toList());
        }
        orders = orders.stream()
                .filter(s -> "SHIPPED".equals(s.getStatus()) || "DELIVERED".equals(s.getStatus()))
                .collect(Collectors.toList());
        Map<Long, RaportProd> raportMap = new HashMap<>();
        for (OrderDto order : orders) {
            for(OrderItemsDto orderItem : order.getOrderItems()){
                if(!raportMap.containsKey(orderItem.getProductId())){
                    raportMap.put(orderItem.getProductId(), new RaportProd(orderItem.getProductId(), orderItem.getQuantity(), orderItem.getPrice()*orderItem.getQuantity()));
                }else{
                    int quantity = raportMap.get(orderItem.getProductId()).getQuantity();
                    double price = raportMap.get(orderItem.getProductId()).getSumPrice();
                    raportMap.put(orderItem.getProductId(), new RaportProd(orderItem.getProductId(), quantity + orderItem.getQuantity(), orderItem.getQuantity() * orderItem.getPrice() + price));

                }
            }


        }
        for (RaportProd value : raportMap.values()) {
            table.addCell(productNames.get(value.getProdID()));
            table.addCell(String.valueOf(value.getQuantity()));
            table.addCell(String.format("%.2f", value.getSumPrice()));
        }

    }

    private void addFooter(Document document) throws DocumentException {
        Paragraph p2 = new Paragraph();
        leaveEmptyLine(p2, 3);
        p2.setAlignment(Element.ALIGN_MIDDLE);
        p2.add(new Paragraph(
                "----------------------------" + reportFileName + "------------------------",
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
