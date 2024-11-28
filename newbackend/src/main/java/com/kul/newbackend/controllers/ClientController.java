package com.kul.newbackend.controllers;

import com.kul.newbackend.dto.ClientDto;
import com.kul.newbackend.services.ClientService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/clients")
public class ClientController {
    private static final Logger logger = LoggerFactory.getLogger(ClientController.class);
    private final ClientService clientService;

    @PostMapping
    public ResponseEntity<ClientDto> addClient(@RequestBody ClientDto clientDto) {
        logger.info("Request to add client: {}", clientDto);
        ClientDto addedClient = clientService.addClient(clientDto);
        logger.info("Client added successfully: {}", addedClient);
        return new ResponseEntity<>(addedClient, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ClientDto>> getAllClients() {
        logger.info("Request to get all clients");
        List<ClientDto> clientDtos = clientService.getAllClients();
        logger.info("Clients retrieved successfully: count = {}", clientDtos.size());
        return new ResponseEntity<>(clientDtos, HttpStatus.OK);
    }

    @GetMapping("/{clientId}")
    public ResponseEntity<ClientDto> getClientById(@PathVariable Long clientId) {
        logger.info("Request to get client by ID: {}", clientId);
        ClientDto clientDto = clientService.getClientById(clientId);
        logger.info("Client retrieved successfully: {}", clientDto);
        return new ResponseEntity<>(clientDto, HttpStatus.OK);
    }

    @PutMapping("/{clientId}")
    public ResponseEntity<ClientDto> updateClient(@PathVariable Long clientId, @RequestBody ClientDto clientDto) {
        logger.info("Request to update client with ID: {}. Update data: {}", clientId, clientDto);
        ClientDto updatedClient = clientService.updateClient(clientId, clientDto);
        logger.info("Client updated successfully: {}", updatedClient);
        return new ResponseEntity<>(updatedClient, HttpStatus.OK);
    }

    @DeleteMapping("/{clientId}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long clientId) {
        logger.info("Request to delete client with ID: {}", clientId);
        clientService.deleteClient(clientId);
        logger.info("Client deleted successfully with ID: {}", clientId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}