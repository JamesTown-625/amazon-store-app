DROP DATABASE bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(6,2),
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

SELECT * FROM bamazon_db.products;

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('PS4', 'Electronics', 281.99, 625);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('XBOX', 'Electronics', 499.99, 600);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('NINTENDO SWITCH', 'Electronics', 299.99, 575);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Nalgene Water Bottle', 'Camping', 4.99, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('REI Sleeping Bag', 'Camping', 349.99, 125);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Osprey Backpack', 'Camping', 148.93, 300);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Moby Dick', 'Books', 13.99, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Hatchet', 'Books', 5.99, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Treasure Island', 'Books', 10.99, 75);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Robinson Crusoe', 'Books', 8.99, 35);


