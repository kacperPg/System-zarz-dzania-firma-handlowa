package com.kul.newbackend.controllers;

import com.kul.newbackend.entities.DateSet;
import com.kul.newbackend.raportGenerator.RaportPdfGenerator;
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
}
