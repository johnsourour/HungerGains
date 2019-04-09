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

INSERT INTO Day
VALUES('Monday');
INSERT INTO Day
VALUES('Tuesday');
INSERT INTO Day
VALUES('Wednesday');
INSERT INTO Day
VALUES('Thursday');
INSERT INTO Day
VALUES('Friday');
INSERT INTO Day
VALUES('Saturday');
INSERT INTO Day
VALUES('Sunday');

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

INSERT INTO Restaurant
VALUES(null, 'McDonalds', 'American', 7, 'a street number', 0.14);