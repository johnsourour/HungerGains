DROP TABLE IF EXISTS CartItem;
DROP TABLE IF EXISTS Cart;
DROP TABLE IF EXISTS OrderStatus;
DROP TABLE IF EXISTS Log;
DROP TABLE IF EXISTS LogType;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS UserType;
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

CREATE TABLE UserType (
  userType CHAR(20),
  description CHAR(60),
  CONSTRAINT usertype_pk PRIMARY KEY(userType)
  );
  
CREATE TABLE User (
  username  CHAR(20),
  userType  CHAR(20),
  phoneNo     CHAR(11),
  addressLine1    CHAR(40),
  addressLine2    CHAR(40),
  email     CHAR(40),
  Fname     CHAR(15),
  Lname     CHAR(15),
  hashedPwd CHAR(70),
  Bdate Date, 
  CONSTRAINT usertype_fk FOREIGN KEY(userType) REFERENCES UserType(userType),
  CONSTRAINT user_pk PRIMARY KEY(username, userType),
  CONSTRAINT user_Fname_nn CHECK (Fname is NOT NULL),
  CONSTRAINT user_Lname_nn CHECK (Lname is NOT NULL),
  CONSTRAINT user_pwd_nn CHECK (hashedPwd is NOT NULL),
  CONSTRAINT user_email_nn CHECK (email is NOT NULL),
  CONSTRAINT user_phone_nn CHECK (phoneNo is NOT NULL)
  );
  
CREATE TABLE LogType (
  logType CHAR(20),
  CONSTRAINT logtype_pk PRIMARY KEY(logType)
  );
  
CREATE TABLE Log (
  logNo  INT,
  logType  CHAR(20),
  Tstamp     Date,  
  changedByName  CHAR(20),
  changedByType  CHAR(20),
  changedOnName  CHAR(20),
  changedOnType  CHAR(20),
  CONSTRAINT logtype_fk FOREIGN KEY(logType) REFERENCES LogType(logType),
  CONSTRAINT log_pk PRIMARY KEY(logNo),
  CONSTRAINT changedOn_fk FOREIGN KEY(changedOnName, changedOnType) REFERENCES User(username, userType),  
  CONSTRAINT changedBy_fk FOREIGN KEY(changedByName, changedByType) REFERENCES User(username, userType)
  );

CREATE TABLE Discount (
	discountID INT,
    expiryDate Date, 
    rate FLOAT,
    CONSTRAINT discount_pk PRIMARY KEY(discountID),
    CONSTRAINT rate_chk CHECK(rate>=0 and rate<=1)
);

CREATE TABLE Cuisine (
	cuisineName CHAR(20),
    CONSTRAINT cuisine_pk PRIMARY KEY(cuisineName)
);

CREATE TABLE Restaurant (
	restaurantID INT,
    restaurantName CHAR(25),
    cuisine CHAR(20), 
    deliveryFee FLOAT,
    taxPercent FLOAT,
    CONSTRAINT restaurant_pk PRIMARY KEY(restaurantID),
    CONSTRAINT cuisine_fk FOREIGN KEY(cuisine) REFERENCES Cuisine(cuisineName),  
    CONSTRAINT cuisine_nn CHECK (cuisine is NOT NULL),  
    CONSTRAINT rname_nn CHECK (restaurantName is NOT NULL),  
    CONSTRAINT tax_chk CHECK(taxPercent>=0 and taxPercent<=1)
);


CREATE TABLE Day (
    dayName Char(10),    
    CONSTRAINT day_pk PRIMARY KEY(dayName)
);

CREATE TABLE WorkingHour (
    wday CHAR(10),
	restaurantID INT,
    startHour TIME,
    endHour TIME,
    CONSTRAINT wday_pk PRIMARY KEY(wday, restaurantID),
    CONSTRAINT wday_fk FOREIGN KEY(wday) REFERENCES Day(dayName),  
    CONSTRAINT shour_nn CHECK (startHour is NOT NULL),
    CONSTRAINT ehour_nn CHECK (endHour is NOT NULL),  
    CONSTRAINT hrs_chk CHECK (endHour > startHour)
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
    quantity INT,
    CONSTRAINT  rest_menu_item_config_pk PRIMARY KEY(menuType, restaurantID, menuItemName, configID),
    CONSTRAINT restaurant_menu_item_fk FOREIGN KEY(menuType, restaurantID, menuItemName) REFERENCES RestaurantMenuItem(menuType, restaurantID, menuItemName),
    CONSTRAINT config_fk FOREIGN KEY(configID) REFERENCES ItemConfiguration(configID),
    CONSTRAINT quantity_nn CHECK (quantity is NOT NULL)
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
	orderedByName  CHAR(20),
	orderedByType  CHAR(20),
    areaName CHAR(20),
    restaurantID INT,
    discountID INT,
    address CHAR(100),
    statusName CHAR(20),
	CONSTRAINT cart_pk PRIMARY KEY(cartID),
    CONSTRAINT rest_area_fk FOREIGN KEY(areaName, restaurantID) REFERENCES RestaurantDeliveryArea(areaName, restaurantID),
    CONSTRAINT orderedBy_fk FOREIGN KEY(orderedByName, orderedByType) REFERENCES User(username, userType),
    CONSTRAINT discount_fk FOREIGN KEY(discountID) REFERENCES Discount(discountID),
    CONSTRAINT status_fk FOREIGN KEY(statusName) REFERENCES OrderStatus(statusName),
    CONSTRAINT orderedByN_nn CHECK (orderedByName is NOT NULL),
    CONSTRAINT orderedByT_nn CHECK (orderedByType is NOT NULL),
	CONSTRAINT rest_areaR_nn CHECK (restaurantID is NOT NULL),
    CONSTRAINT rest_areaA_nn CHECK (areaName is NOT NULL),
    CONSTRAINT status_nn CHECK (statusName is NOT NULL),
    CONSTRAINT address_nn CHECK (address is NOT NULL)    
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