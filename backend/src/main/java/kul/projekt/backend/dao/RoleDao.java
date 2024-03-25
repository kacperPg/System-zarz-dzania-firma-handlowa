package kul.projekt.backend.dao;

import kul.projekt.backend.entity.Role;

public interface RoleDao {
    public Role findRoleByName(String theRoleName);
}
