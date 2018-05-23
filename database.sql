CREATE TABLE item(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1023) NOT NULL,
    price FLOAT NOT NULL,

    PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE item_image(
    id INT NOT NULL AUTO_INCREMENT,
    item_id INT NOT NULL,
    filename VARCHAR(255),

    PRIMARY KEY(id),
    FOREIGN KEY(item_id) REFERENCES item(id)
) ENGINE=InnoDB;


INSERT INTO item(name, description, price) VALUES('bread', 'white bread', 1.0);