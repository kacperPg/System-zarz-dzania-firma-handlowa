package kul.projekt.backend.dao;

import kul.projekt.backend.entity.User;

public interface UserDao {
    User findByUserName(String userName);

    void save(User theUser);
}
