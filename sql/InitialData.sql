-- Default Data
INSERT INTO UserCat
VALUES('admin', 'A System Administrator');
INSERT INTO UserCat
VALUES('staff', 'An Ordering Staff Member');
INSERT INTO UserCat
VALUES('end_user', 'The End User / Client');

INSERT INTO UserStatus
VALUES('alive', 'The User is active in the system');
INSERT INTO UserStatus
VALUES('dead', 'The User has been deleted from the system');

INSERT INTO LogType
VALUES('create_staff');
INSERT INTO LogType
VALUES('create_admin');
INSERT INTO LogType
VALUES('modifyPassword_admin');
INSERT INTO LogType
VALUES('modifyPassword_staff');
INSERT INTO LogType
VALUES('remove_admin');
INSERT INTO LogType
VALUES('remove_staff');


INSERT INTO Cuisine
VALUES('Italian');
INSERT INTO Cuisine
VALUES('Asian');
INSERT INTO Cuisine
VALUES('French');
INSERT INTO Cuisine
VALUES('Indian');
INSERT INTO Cuisine
VALUES('International');
INSERT INTO Cuisine
VALUES('Mexican');
INSERT INTO Cuisine
VALUES('American');
INSERT INTO Cuisine
VALUES('Egyptian');
INSERT INTO Cuisine
VALUES('Lebanese');
INSERT INTO Cuisine
VALUES('British');
INSERT INTO Cuisine
VALUES('Turkish');


INSERT INTO DeliveryArea
VALUES('6th of October');
INSERT INTO DeliveryArea
VALUES('New Cairo');
INSERT INTO DeliveryArea
VALUES('Nasr City');
INSERT INTO DeliveryArea
VALUES('Heliopolis');
INSERT INTO DeliveryArea
VALUES('Downtown');
INSERT INTO DeliveryArea
VALUES('Mohandessin');
INSERT INTO DeliveryArea
VALUES('Giza');
INSERT INTO DeliveryArea
VALUES('Zamalek');
INSERT INTO DeliveryArea
VALUES('Dokki');
INSERT INTO DeliveryArea
VALUES('Maadi');
INSERT INTO DeliveryArea
VALUES('Sheraton');

INSERT INTO MenuType
VALUES('Breakfast');
INSERT INTO MenuType
VALUES('Lunch');
INSERT INTO MenuType
VALUES('Dinner');
INSERT INTO MenuType
VALUES('Dessert');

INSERT INTO OrderStatus
VALUES('Pending');
INSERT INTO OrderStatus
VALUES('Received');
INSERT INTO OrderStatus
VALUES('Preparing');
INSERT INTO OrderStatus
VALUES('Out For Delivery');
INSERT INTO OrderStatus
VALUES('Delivered');
INSERT INTO OrderStatus
VALUES('Cancelled');

INSERT INTO ItemConfiguration
VALUES('Small', 1.0);
INSERT INTO ItemConfiguration
VALUES('Regular', 1.1);
INSERT INTO ItemConfiguration
VALUES('Large', 1.2);
INSERT INTO ItemConfiguration
VALUES('Combo - Small', 1.1);
INSERT INTO ItemConfiguration
VALUES('Combo - Regular', 1.17);
INSERT INTO ItemConfiguration
VALUES('Combo - Large', 1.25);



Insert into user
Values('johnuser', 'end_user', '88172381238', 'user@email', 'john', 'user', 'userpwd', null, 'alive');
Insert into user
Values('johnadmin', 'admin', '55381238', 'admin@email', 'john', 'admin', 'adminpwd', null, 'alive');

Insert into user
Values('johnlegit', 'admin', '01281583389', 'johnsourour@gmail.com', 'john', 'admin', 'forgottenpwd', null, 'alive');

INSERT INTO Restaurant
VALUES(null, 'McDonalds', 'American', 7, 'a street number', 0.14, '093000', '230000');
INSERT INTO Restaurant
VALUES(null, 'KFC', 'Italian', 7, 'a street number', 0.14,'093000', '230000');

insert into RestaurantMenu values ('Lunch', 1 , '083000', '223000');
insert into RestaurantMenu values ('Dinner', 2 , '193000', '223000');
insert into RestaurantMenu values ('Dessert', 1 , '123000', '203000');
insert into RestaurantMenu values ('Dinner', 1 , '193000', '233000');


insert into RestaurantDeliveryArea values ('Heliopolis', 1);
insert into RestaurantDeliveryArea values ('New Cairo',2);
insert into RestaurantDeliveryArea values ('Zamalek',1);

insert into UserAddress values (null, 'johnuser', 'Heliopolis','asdads',null);
insert into UserAddress values (null, 'johnuser', 'Zamalek','asdads',null);


insert into RestaurantMenuItem values ('Lunch', 1 , 'BigMac', 30);
insert into RestaurantMenuItem values ('Lunch', 1 , 'BigTasty', 40);
insert into RestaurantMenuItem values ('Dinner', 1 , 'Pancakes', 30);
insert into RestaurantMenuItemConfig values ('Lunch', 1 , 'BigMac', 'Regular');
insert into RestaurantMenuItemConfig values ('Lunch', 1 , 'BigTasty', 'Regular');

insert into RestaurantMenuItemConfig values ('Lunch', 1 , 'BigMac', 'Combo - Small');
insert into Discount values(10,'2020-02-02',0.1); 
insert into Discount values(5,'2020-02-02',0.2); 

insert into Cart values(null, 'johnuser', 1, 1, 10, 'Pending');
insert into CartItem values(1, 'Lunch', 1, 'BigMac', 'Regular',2,null);
insert into CartItem values(1, 'Lunch', 1, 'BigMac', 'Combo - Small',2,null);

insert into Cart values(null, 'johnuser', 1, 1, null, 'Pending');
insert into CartItem values(2, 'Lunch', 1, 'BigMac', 'Regular',2,null);
insert into CartItem values(2, 'Lunch', 1, 'BigMac', 'Combo - Small',2,null);

insert into Cart values(null, 'johnuser', 1, 1, 5, 'Pending');
insert into CartItem values(3, 'Lunch', 1, 'BigMac', 'Regular',2,null);
insert into CartItem values(3, 'Lunch', 1, 'BigMac', 'Combo - Small',2,null);