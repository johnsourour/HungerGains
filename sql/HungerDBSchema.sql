DROP TABLE IF EXISTS CartItem;
DROP TABLE IF EXISTS Cart;
DROP TABLE IF EXISTS OrderStatus;
DROP TABLE IF EXISTS Log;
DROP TABLE IF EXISTS LogType;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS UserCat;
DROP TABLE IF EXISTS UserStatus;
DROP TABLE IF EXISTS Discount;
DROP TABLE IF EXISTS RestaurantDeliveryArea;
DROP TABLE IF EXISTS Restaurant;
DROP TABLE IF EXISTS Cuisine;
DROP TABLE IF EXISTS WorkingHour;
DROP TABLE IF EXISTS Day;
DROP TABLE IF EXISTS RestaurantMenuItemConfig;
DROP TABLE IF EXISTS RestaurantMenuItem;
DROP TABLE IF EXISTS RestaurantMenu;
DROP TABLE IF EXISTS MenuType;
DROP TABLE IF EXISTS MenuItem;
DROP TABLE IF EXISTS ItemConfiguration;
DROP TABLE IF EXISTS DeliveryArea;



CREATE TABLE UserCat (
  userType CHAR(20),
  description CHAR(60),
  CONSTRAINT usertype_pk PRIMARY KEY(userType)
  );
  
  CREATE TABLE UserStatus (
  userStatusName CHAR(20),
  description CHAR(60),
  CONSTRAINT usertype_pk PRIMARY KEY(userStatusName)
  );


CREATE TABLE User (
  username  CHAR(20),
  userType  CHAR(20) NOT NULL,
  phoneNo     CHAR(11) NOT NULL UNIQUE,
  addressLine1    CHAR(40),
  addressLine2    CHAR(40),
  email     CHAR(40) NOT NULL UNIQUE,
  Fname     CHAR(15) NOT NULL,
  Lname     CHAR(15) NOT NULL,
  hashedPwd CHAR(70) NOT NULL,
  Bdate Date,   
  userStatusName  CHAR(20) NOT NULL,
  CONSTRAINT user_pk PRIMARY KEY(username),
  CONSTRAINT usertype_fk FOREIGN KEY(userType) REFERENCES UserCat(userType),
  CONSTRAINT userstatus_fk FOREIGN KEY(userStatusName) REFERENCES userStatus(userStatusName)
  );
  
CREATE TABLE LogType (
  logTypeName CHAR(20),
  CONSTRAINT logtype_pk PRIMARY KEY(logTypeName)
  );
  
CREATE TABLE Log (
  logTime     Timestamp,  
  logTypeName  CHAR(20) NOT NULL,
  changedByName  CHAR(20)  NOT NULL,
  changedOnName  CHAR(20)  NOT NULL,
  CONSTRAINT logtype_fk FOREIGN KEY(logTypeName) REFERENCES LogType(logTypeName),
  CONSTRAINT log_pk PRIMARY KEY(logTime),
  CONSTRAINT changedOn_fk FOREIGN KEY(changedOnName) REFERENCES User(username),  
  CONSTRAINT changedBy_fk FOREIGN KEY(changedByName) REFERENCES User(username)
  );

CREATE TABLE Discount (
	discountID INT,
    expiryDate Date, 
    rate INT,
    CONSTRAINT discount_pk PRIMARY KEY(discountID)
);

CREATE TABLE Cuisine (
	cuisineName CHAR(20),
    CONSTRAINT cuisine_pk PRIMARY KEY(cuisineName)
);

CREATE TABLE Restaurant (
	restaurantID INT,
    restaurantName CHAR(25) UNIQUE NOT NULL,
    cuisine CHAR(20) NOT NULL, 
    deliveryFee FLOAT,
    taxPercent FLOAT CHECK(taxPercent>=0 and taxPercent<=1),
    CONSTRAINT restaurant_pk PRIMARY KEY(restaurantID),
    CONSTRAINT cuisine_fk FOREIGN KEY(cuisine) REFERENCES Cuisine(cuisineName)
);


CREATE TABLE Day (
    dayName Char(10),    
    CONSTRAINT day_pk PRIMARY KEY(dayName)
);

CREATE TABLE WorkingHour (
    wday CHAR(10),
	restaurantID INT,
    startHour TIME NOT NULL,
    endHour TIME NOT NULL,
    CONSTRAINT wday_pk PRIMARY KEY(wday, restaurantID),
    CONSTRAINT wday_fk FOREIGN KEY(wday) REFERENCES Day(dayName)
);

CREATE TABLE MenuType (
    menuType CHAR(15),
    CONSTRAINT menutype_pk PRIMARY KEY(menuType)
);

CREATE TABLE RestaurantMenu (
    menuType CHAR(15),
	restaurantID INT,
    CONSTRAINT  menu_pk PRIMARY KEY(menuType, restaurantID),
    CONSTRAINT menuType_fk FOREIGN KEY(menuType) REFERENCES MenuType(menuType)
);

CREATE TABLE MenuItem (
    menuItemName CHAR(25),
    CONSTRAINT  menuItem_pk PRIMARY KEY(menuItemName)
);

CREATE TABLE ItemConfiguration (
	configID INT,
    CONSTRAINT  config_pk PRIMARY KEY(configID)
);

CREATE TABLE RestaurantMenuItem (
    menuType CHAR(15),
	restaurantID INT,
    menuItemName CHAR(25),
    CONSTRAINT  rest_menu_item_pk PRIMARY KEY(menuType, restaurantID, menuItemName),
    CONSTRAINT restaurant_menu_fk FOREIGN KEY(menuType, restaurantID) REFERENCES RestaurantMenu(menuType, restaurantID),
    CONSTRAINT menu_item_fk FOREIGN KEY(menuItemName) REFERENCES MenuItem(menuItemName)    
);


CREATE TABLE RestaurantMenuItemConfig (
    menuType CHAR(15),
	restaurantID INT,
    menuItemName CHAR(25),
    configID INT,
    quantity INT NOT NULL,
    CONSTRAINT  rest_menu_item_config_pk PRIMARY KEY(menuType, restaurantID, menuItemName, configID),
    CONSTRAINT restaurant_menu_item_fk FOREIGN KEY(menuType, restaurantID, menuItemName) REFERENCES RestaurantMenuItem(menuType, restaurantID, menuItemName),
    CONSTRAINT config_fk FOREIGN KEY(configID) REFERENCES ItemConfiguration(configID)
);

CREATE TABLE DeliveryArea(
	areaName CHAR(20),
	CONSTRAINT  areaname_pk PRIMARY KEY(areaName)
);

CREATE TABLE RestaurantDeliveryArea(
	areaName CHAR(20),
    restaurantID INT,
	CONSTRAINT  rest_area_pk PRIMARY KEY(areaName, restaurantID),
    CONSTRAINT rest_fk FOREIGN KEY(restaurantID) REFERENCES Restaurant(restaurantID),
    CONSTRAINT area_fk FOREIGN KEY(areaName) REFERENCES DeliveryArea(areaName)
);

CREATE TABLE OrderStatus(
	statusName CHAR(20),
	CONSTRAINT  status_pk PRIMARY KEY(statusName)
);

CREATE TABLE Cart(
	cartID INT,
	orderedByName  CHAR(20)  NOT NULL,
    areaName CHAR(20) NOT NULL,
    restaurantID INT NOT NULL,
    discountID INT ,
    address CHAR(100)  NOT NULL,
    statusName CHAR(20)  NOT NULL,
	CONSTRAINT cart_pk PRIMARY KEY(cartID),
    CONSTRAINT rest_area_fk FOREIGN KEY(areaName, restaurantID) REFERENCES RestaurantDeliveryArea(areaName, restaurantID),
    CONSTRAINT orderedBy_fk FOREIGN KEY(orderedByName) REFERENCES User(username),
    CONSTRAINT discount_fk FOREIGN KEY(discountID) REFERENCES Discount(discountID),
    CONSTRAINT status_fk FOREIGN KEY(statusName) REFERENCES OrderStatus(statusName) 
);

CREATE TABLE CartItem (
	CartID INT,
    menuType CHAR(15),
	restaurantID INT,
    menuItemName CHAR(25),
    configID INT,    
    comment CHAR(100),
    CONSTRAINT user_ordered_item_pk PRIMARY KEY(cartID, menuType, restaurantID, menuItemName, configID),
    CONSTRAINT menu_item_config_fk FOREIGN KEY(menuType, restaurantID, menuItemName, configID) REFERENCES RestaurantMenuItemConfig(menuType, restaurantID, menuItemName, configID),
    CONSTRAINT cart_fk FOREIGN KEY(cartID) REFERENCES Cart(cartID)
);