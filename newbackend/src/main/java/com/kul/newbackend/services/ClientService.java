package com.kul.newbackend.services;

import com.kul.newbackend.dto.ClientDto;
import com.kul.newbackend.entities.Client;
import com.kul.newbackend.mappers.ClientMapper;
import com.kul.newbackend.repositories.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class ClientService {
    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

    public ClientDto addClient(ClientDto clientDto){
        Client client = clientMapper.clientDtoToEntity(clientDto);
        Client savedClient = clientRepository.save(client);
        return clientMapper.clientEntityToDto(savedClient);
    }

    public List<ClientDto> getAllClients() {
        List<Client> clients = clientRepository.findAll();
        return clientMapper.clientListToDtoList(clients);
    }

    public ClientDto getClientById(Long clientId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new NoSuchElementException("Client not found"));
        return clientMapper.clientEntityToDto(client);
    }

    public ClientDto updateClient(Long clientId, ClientDto clientDto) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new NoSuchElementException("Client not found"));

        // Update existing entity's fields
        client.setClientName(clientDto.getClientName());
        client.setClientEmail(clientDto.getClientEmail());
        client.setAddress(clientDto.getAddress());
        client.setNipNumber(clientDto.getNipNumber());
        client.setPhoneNumber(clientDto.getPhoneNumber());

        Client savedClient = clientRepository.save(client);
        return clientMapper.clientEntityToDto(savedClient);
    }

    public void deleteClient(Long clientId) {
        clientRepository.deleteById(clientId);
    }
}