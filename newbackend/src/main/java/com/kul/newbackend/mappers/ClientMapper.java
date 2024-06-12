package com.kul.newbackend.mappers;

import com.kul.newbackend.dto.ClientDto;
import com.kul.newbackend.entities.Client;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClientMapper {
    @Mapping(target = "clientId", ignore = true)
    Client clientDtoToEntity(ClientDto clientDto);

    ClientDto clientEntityToDto(Client client);
    List<ClientDto> clientListToDtoList(List<Client> clients);
}
