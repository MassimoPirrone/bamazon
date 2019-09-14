DROP DATABASE IF EXISTS bamazon_DB;
-- Create Database -- 
CREATE DATABASE bmazon_db;

-- Use Database -- 
USE bamazon_db;

-- Create a table for products
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    department VARCHAR(100) NOT NULL,
    product VARCHAR(100) NOT NULL,
    price DECIMAL(8,2) default 0,
    quantity INT default 0,
    PRIMARY KEY (id)
);
-- Inseet Values for table *tested 2 different ways* --
INSERT INTO products (product, department, price, quantity)
VALUES("Macbook Pro", "electronics", 1200, 60);

INSERT INTO products (product, department, price, quantity)
VALUES("Dell XPS 15", "electronics", 1100, 55);

INSERT INTO products (product, department, price, quantity)
VALUES("Xbox 360", "electronics", 300, 100);

INSERT INTO products (product, department, price, quantity)
VALUES("Football", "sporting Goods", 9.99, 50);

INSERT INTO products (product, department, price, quantity)
VALUES("Baseball bat", "", 1200, 60);

INSERT INTO products (product, department, price, quantity)
VALUES ("Milk", "groceries", 2.95, 200),
("The Testaments", "books" , 15.99, 100),
("Inland: A Novel", "books", 10.99, 115),
("Striped Dog Leash", "pets", 5.00, 200),
("Plush Dog Bed" "pets", 9.99, 300);
