package com.kul.newbackend.controllers;

import com.kul.newbackend.dto.ClientDto;
import com.kul.newbackend.dto.ProductTypeDto;
import com.kul.newbackend.services.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/clients")
public class ClientController {
    private final ClientService clientService;

    @PostMapping
    public ResponseEntity<ClientDto> addClient(@RequestBody ClientDto clientDto){
        ClientDto addedClient = clientService.addClient(clientDto);
        return new ResponseEntity<>(addedClient, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ClientDto>> getAllClients(){
        List<ClientDto> clientDtos = clientService.getAllClients();
        return new ResponseEntity<>(clientDtos,HttpStatus.OK);
    }

    @GetMapping("/{clientId}")
    public ResponseEntity<ClientDto> getClientById(@PathVariable Long clientId){
        ClientDto clientDto = clientService.getClientById(clientId);
        return new ResponseEntity<>(clientDto,HttpStatus.OK);
    }

    @PutMapping("/{clientId}")
    public ResponseEntity<ClientDto> updateClient(@PathVariable Long clientId,@RequestBody ClientDto clientDto){
        ClientDto clientDtos = clientService.updateClient(clientId,clientDto);
        return new ResponseEntity<>(clientDtos,HttpStatus.OK);
    }

    @DeleteMapping("/{clientId}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long clientId){
        clientService.deleteClient(clientId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}