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