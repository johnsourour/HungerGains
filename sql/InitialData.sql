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

Insert into user
Values('johnuser', 'end_user', '88172381238', null, null, 'user@email', 'john', 'user', 'userpwd', null, 'alive');

Insert into user
Values('johnadmin', 'admin', '55381238', null, null, 'admin@email', 'john', 'admin', 'adminpwd', null, 'alive');