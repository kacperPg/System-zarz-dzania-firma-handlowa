use test;


CREATE TABLE role (
    role_id INT AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (role_id)
);

-- Tabela użytkowników
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    enabled TINYINT NOT NULL,
    PRIMARY KEY (id)
);

-- Tabela łącząca użytkowników i role
CREATE TABLE users_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);

-- Pozostałe tabele
CREATE TABLE permissions (
    permission_id INT AUTO_INCREMENT,
    permission_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (permission_id)
);

CREATE TABLE role_permission (
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id) REFERENCES role(role_id),
    FOREIGN KEY (permission_id) REFERENCES permissions(permission_id)
);


INSERT INTO users (username, password, enabled)
VALUES ('user', '{noop}test123', 1);


INSERT IGNORE INTO role (role_name)
VALUES ('ROLE_USER');


INSERT IGNORE INTO permissions (permission_name)
VALUES ('standard');


INSERT INTO users_roles (user_id, role_id)
SELECT id, role_id FROM users, role WHERE username = 'user' AND role_name = 'ROLE_USER';


INSERT INTO role_permission (role_id, permission_id)
SELECT role_id, permission_id FROM role, permissions WHERE role_name = 'ROLE_USER' AND permission_name = 'standard';



INSERT INTO users (username, password, enabled)
VALUES ('admin', '{noop}test123', 1);


INSERT IGNORE INTO role (role_name)
VALUES ('ROLE_ADMINISTRATOR');


INSERT IGNORE INTO permissions (permission_name)
VALUES ('canWatchAdminPage');


INSERT INTO users_roles (user_id, role_id)
SELECT id, role_id FROM users, role WHERE username = 'admin' AND role_name = 'ROLE_ADMINISTRATOR';


INSERT INTO role_permission (role_id, permission_id)
SELECT role_id, permission_id FROM role, permissions WHERE role_name = 'ROLE_ADMINISTRATOR' AND permission_name = 'canWatchAdminPage';



