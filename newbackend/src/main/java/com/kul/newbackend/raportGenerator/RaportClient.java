package com.kul.newbackend.raportGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class RaportClient {
    private String clientName;
    private int totalAmountOfProducts;
    private double totalAmountPrices;
}
