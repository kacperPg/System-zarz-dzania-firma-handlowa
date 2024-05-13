package com.kul.newbackend.mappers;

import com.kul.newbackend.dto.SignUpDto;
import com.kul.newbackend.dto.UserDto;
import com.kul.newbackend.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toUserDto(User user);

    @Mapping(target = "password",ignore = true)
    @Mapping(target = "id", ignore = true)
    User signUpToUser(SignUpDto userDto);

    List<UserDto> usersToListDto(List<User> users);
}
