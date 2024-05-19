package com.kul.newbackend.controllers;

import com.kul.newbackend.dto.OrderDto;
import com.kul.newbackend.dto.OrderItemsDto;
import com.kul.newbackend.dto.ProductDto;
import com.kul.newbackend.entities.DateSet;
import com.kul.newbackend.entities.Order;
import com.kul.newbackend.services.OrderItemsService;
import com.kul.newbackend.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;
    private final OrderItemsService orderItemsService;

    @PostMapping
    public ResponseEntity<OrderDto> addOrder(@RequestBody OrderDto orderDto) {
        OrderDto addedOrderDto = orderService.addOrder(orderDto);
        return new ResponseEntity<>(addedOrderDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        List<OrderDto> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping("/orderBeforeDate")
    public ResponseEntity<List<OrderDto>> getAllOrdersBeforeDate(@RequestBody LocalDate date) {
        List<OrderDto> orders = orderService.getAllOrders().stream()
                .filter(s -> s.getOrderDate().isBefore(date))
                .collect(Collectors.toList());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping("/orderAfterDate")
    public ResponseEntity<List<OrderDto>> getAllOrdersAfterDate(@RequestBody LocalDate date) {
        List<OrderDto> orders = orderService.getAllOrders().stream()
                .filter(s -> s.getOrderDate().isAfter(date))
                .collect(Collectors.toList());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping("/orderBeetwenDate")
    public ResponseEntity<List<OrderDto>> getAllOrdersBeetwenDate(@RequestBody DateSet dates) {
        List<OrderDto> orders = orderService.getAllOrders().stream()
                .filter(s -> s.getOrderDate().isAfter(dates.getAfterDate()))
                .filter(s -> s.getOrderDate().isBefore(dates.getBeforeDate()))
                .collect(Collectors.toList());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    //Returning order with order item
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long orderId) {
        OrderDto order = orderService.getOrderById(orderId);
        List<OrderItemsDto> orderItemsDtoList = orderItemsService.getOrderItemByOrderId(orderId);
        order.setOrderItems(orderItemsDtoList);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<OrderDto> updateOrder(@PathVariable Long orderId, @RequestBody OrderDto updatedOrderDto) {
        OrderDto order = orderService.updateOrder(orderId, updatedOrderDto);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//         Tak powinny być zwracane, zamówione przedmioty muszą być walidowane na podstawie tabeli stanu magazynu
//         tak że tylko przedmioty istniejące w tej tabeli mogą być zamówione,
//           Po zamówienie stan magazynu musi byc odpowiednio updatejtowany

//             "orderId": 7,
//            "clientNazwa": "Nazwa Klienta",
//            "totalAmount- Tutaj suma wszystkich produktów z orderItems": 44,
//            "orderDate": null,
//            "FinishOrderDate- data kiedy zamówienie zostało wykonane/status zmieniony na finish, może być automatyczenie wypełniany": null,
//            "status - powinno brać określone dane, może byc z jakiejś tabeli albo zkodowane w backendie(Open, Suspended, Finished)": "Finished",
//            "AllItemsPrice- automatycznie wyliczona na podstawie wszystkich cen z orderItems ": 120,
//            "orderItem": [
//
//                      "Nazwa Produktu": "Nazwa Produktu2"
//                      "Price-Cena produktu wzięta z tabeli produktów": 20,
//                      "quantity": 3,
//                      "Totalprice- automatycznie wyliczona na podstawie ceny z produktów i liczby zamówionych produktów ": 60,
//                      "warehouse - nazwa warehousa w którym znjduje się produkt":"Nazwa Warehouse"
//              }
//              , {
//                      "Nazwa Produktu": "Nazwa Produktu2"
//                      "Price-Cena produktu wzięta z tabeli produktów": 20,
//                      "quantity": 3,
//                      "Totalprice- automatycznie wyliczona na podstawie ceny z produktów i liczby zamówionych produktów ": 60,
//                      "warehouse - nazwa warehousa w którym znjduje się produkt":"Nazwa Warehouse"
//              }
//           ]

//          Jak może wyglądać request POST Tworzenia zamówienia
//            "clientNazwa": "Nazwa Klienta",
//            "orderDate -": null,
//            "status - powinno brać określone dane, może byc z jakiejś tabeli albo zkodowane w backendie(Open, Suspended, Finished)": "Finished",
//            "AllItemsPrice- automatycznie wyliczona na podstawie wszystkich cen z orderItems ": 120,
//            "orderItem": [
//               {
//                      "WarehouseStatusId"- na podstawoie tego możemy walidować czy da się te przedmioty zamówić (czy nie przekroczyliśmy dostępnej ilości)
//                      , to również będziemy updejtowac jesli zamówienie zostanie stworzone ": 10,
//                      "quantity": 3,
//              }]
}
