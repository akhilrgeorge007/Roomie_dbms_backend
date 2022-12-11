
CREATE TABLE Tenant(
Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
Name varchar(200),
Email varchar(200),
Password varchar(200)
);

CREATE TABLE Owner(
Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
Name varchar(200),
Email varchar(200),
Password varchar(200)
);

CREATE TABLE Property(
Id varchar(200) PRIMARY KEY,
Name varchar(200),
Location varchar(200),
Type varchar(10),
Description varchar(300),
Max_occupant int,
Current_occupant int,
Owner_id int, 
FOREIGN KEY(Owner_id) REFERENCES Owner(Id)
);


CREATE TABLE PropertyCost(
Property_id varchar(200),
Gas int,
Water int,
Electricity int,
Rent int,
FOREIGN KEY(Property_id) REFERENCES Property(Id)
);


