CREATE TABLE aip_db.product (
product_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
product_nm VARCHAR(30) NOT NULL,
description VARCHAR(255),
reg_date TIMESTAMP
);

CREATE TABLE aip_db.users (
 `id` int(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
 `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `created` TIMESTAMP,
 `modified` TIMESTAMP
); 
Insert into aip_db.users (first_name,last_name,role,email,password,created,modified) values ('vatsh','patel','customer','vatsh@gmail.com','Minmin@1',now(),now());
select * from aip_db.users where email = 'vatsh@gmail.com' AND password = 'Minmin@1';
update aip_db.users set role = "admin" where id = 1;

CREATE TABLE aip_db.flavor (
flavor_id INT(6)  UNSIGNED AUTO_INCREMENT PRIMARY KEY,
product_id INT(6) UNSIGNED,
flavor_nm VARCHAR(30) NOT NULL,
reg_date TIMESTAMP,
INDEX i_prod_id (product_id),
    FOREIGN KEY (product_id)
        REFERENCES aip_db.product(product_id)
        ON DELETE CASCADE
);

CREATE TABLE aip_db.reviews (
review_id INT(6)  UNSIGNED AUTO_INCREMENT PRIMARY KEY,
product_id INT(6) UNSIGNED,
review_description VARCHAR(100) NOT NULL,
review_stars INT(10) UNSIGNED,
reg_date TIMESTAMP,
modify_date TIMESTAMP,
INDEX i_prod_id (product_id),
    FOREIGN KEY (product_id)
        REFERENCES aip_db.product(product_id)
        ON DELETE CASCADE
);

CREATE TABLE aip_db.ingredient (
ingred_id INT(6)  UNSIGNED AUTO_INCREMENT PRIMARY KEY,
ingred_nm VARCHAR(30) NOT NULL,
reg_date TIMESTAMP
);

CREATE TABLE aip_db.ingred_qty (
no INT(6)  UNSIGNED AUTO_INCREMENT PRIMARY KEY,
flavor_id INT(6) UNSIGNED  NOT NULL,
ingred_id INT(6)  UNSIGNED  NOT NULL,
quantity decimal(6,2) NOT NULL,
unit varchar(30), 
reg_date TIMESTAMP,

    INDEX(flavor_id, ingred_id),

    FOREIGN KEY (flavor_id)
      REFERENCES aip_db.flavor(flavor_id)
        ON DELETE CASCADE,
        
    FOREIGN KEY (ingred_id)
      REFERENCES aip_db.ingredient(ingred_id)
        ON DELETE CASCADE
);

--drop table aip_db.ingred_qty;

insert into aip_db.product (product_nm , description , reg_date) values ('Chicken Pizza', 'Best Pizza in Sydney', Now());
insert into aip_db.product (product_nm , description , reg_date) values ('Pasta', 'Best Pasta in Sydney', Now());
insert into aip_db.flavor (product_id , flavor_nm, reg_date) values (1, 'Normal', Now());
insert into aip_db.flavor (product_id , flavor_nm, reg_date) values (1, 'Spicy', Now());
insert into aip_db.ingredient (ingred_nm, reg_date) values ('Onion', Now());
insert into aip_db.ingredient (ingred_nm, reg_date) values ('Cheese', Now());
insert into aip_db.ingredient (ingred_nm, reg_date) values ('Tomato', Now());

insert into aip_db.ingred_qty (flavor_id, ingred_id, quantity, unit, reg_date) values (1, 1, 100.0, 'g', Now());
insert into aip_db.ingred_qty (flavor_id, ingred_id, quantity, unit, reg_date) values (1, 2, 50.0, 'g', Now());
insert into aip_db.ingred_qty (flavor_id, ingred_id, quantity, unit, reg_date) values (1, 3, 300.0, '', Now());

insert into aip_db.ingred_qty (flavor_id, ingred_id, quantity, unit, reg_date) values (2, 1, 120.0, 'g', Now());
insert into aip_db.ingred_qty (flavor_id, ingred_id, quantity, unit, reg_date) values (2, 2, 80.0, 'g', Now());
insert into aip_db.ingred_qty (flavor_id, ingred_id, quantity, unit, reg_date) values (2, 3, 320.0, '', Now());


UPDATE aip_db.product set product_nm = 'Beef Piza'  , description = 'Best Pizza in Australia'  where product_id = 1;


select * from aip_db.product;
select * from aip_db.flavor;
select * from aip_db.ingredient;
select * from aip_db.ingred_qty;

-- Get Product
SELECT p.product_id , p.product_nm FROM aip_db.product as p ;

-- Get Flavor
SELECT f.flavor_id  , f.flavor_nm FROM aip_db.flavor as f where f.product_id = 1 -- product_id
;

-- Get Ingredient
SELECT i.ingred_id
  , i.ingred_nm
  , q.quantity
  , q.unit
from aip_db.ingredient as i
  , aip_db.ingred_qty as q
where i.ingred_id = q.ingred_id
and   q.flavor_id = 1 -- flavor_id
;
