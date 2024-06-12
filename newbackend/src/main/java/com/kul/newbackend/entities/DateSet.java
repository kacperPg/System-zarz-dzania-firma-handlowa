package com.kul.newbackend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DateSet {
    private LocalDate afterDate;
    private LocalDate beforeDate;
}
