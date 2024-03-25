package kul.projekt.backend.service;

import kul.projekt.backend.entity.User;
import kul.projekt.backend.user.WebUser;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    public User findByUserName(String userName);

    void save(WebUser webUser);
}
