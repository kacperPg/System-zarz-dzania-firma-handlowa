package com.kul.newbackend.controllers;

import com.kul.newbackend.entities.DateSet;
import com.kul.newbackend.raportGenerator.RaportPdfGenerator;
import com.kul.newbackend.raportGenerator.RaportPdfGeneratorProd;
import com.kul.newbackend.raportGenerator.RaportPdfGeneratorWarehouse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/raport")
public class RaportController {
    @Autowired
    private RaportPdfGenerator PDFGenerator;

    @Autowired
    private RaportPdfGeneratorProd PDFGeneratorProd;

    @Autowired
    private RaportPdfGeneratorWarehouse PDFGeneratorWar;


    @GetMapping("/generateReport")
    public ResponseEntity<byte[]> generatePdfReport() {
        byte[] pdfContents = PDFGenerator.generatePdfReport();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=report.pdf");

        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfContents);
    }

    @PostMapping("/generateReport")
    public ResponseEntity<byte[]> generatePdfReportInRange(@RequestBody DateSet dates) {
        byte[] pdfContents = PDFGenerator.generatePdfReportInRanges(dates);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=report.pdf");

        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfContents);
    }


    @GetMapping("/generateReportProd")
    public ResponseEntity<byte[]> generatePdfReportProd() {
        byte[] pdfContents = PDFGeneratorProd.generatePdfReport();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=report.pdf");

        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfContents);
    }

    @PostMapping("/generateReportProd")
    public ResponseEntity<byte[]> generatePdfReportProdInRange(@RequestBody DateSet dates) {
        byte[] pdfContents = PDFGeneratorProd.generatePdfReportInRanges(dates);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=report.pdf");

        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfContents);
    }

    @GetMapping("/generateReportWar")
    public ResponseEntity<byte[]> generatePdfReportWar() {
        byte[] pdfContents = PDFGeneratorWar.generatePdfReport();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=report.pdf");

        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfContents);
    }

    @PostMapping("/generateReportWar")
    public ResponseEntity<byte[]> generatePdfReportWarInRange(@RequestBody DateSet dates) {
        byte[] pdfContents = PDFGeneratorWar.generatePdfReportInRanges(dates);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=report.pdf");

        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfContents);
    }
}
