package com.kul.newbackend.raportGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class RaportProd {
    private Long prodID;
    private int quantity;
    private double sumPrice;
}
