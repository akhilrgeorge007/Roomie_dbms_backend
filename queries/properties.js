exports.PropertyQueries = {
    GetProperties:'SELECT * FROM Property',
    GetPropertyById:'SELECT * FROM Property WHERE Id = ?',
    GetAllAvailProperties: 'SELECT * from Property WHERE Current_occupant < Max_occupant',
    UpdateCurrentOccupant:'UPDATE Property SET Current_occupant = ? WHERE Id = ?',
    AddProperty:`
        INSERT INTO Property(Id,Name,Location,Type,Description,Max_occupant,Current_occupant,Owner_id)
        VALUES(?,?,?,?,?,?,?,?)
    `
}

exports.PropertyCostQueries = {
    GetPropertyCosts:'SELECT * FROM PropertyCost',
    GetPropertyCostById:'SELECT * FROM PropertyCost WHERE Property_id = ?',
    AddPropertyCost:`
        INSERT INTO PropertyCost(Property_id,Gas,Water,Electricity,Rent)
        VALUES(?,?,?,?,?)
    `,
    UpdatePropertyCost:'UPDATE PropertyCost SET Gas = ?, Water = ?, Electricity = ?, Rent = ? WHERE Property_id = ?'
}

exports.RentPorpertyQueries = {
    AddRentProperty:`
        INSERT INTO RentProperty(Tenant_id,Property_id,utilityamtdue,Rent)
        VALUES(?,?,?,?)
    `,
    UpdateRentProperty:`
        UPDATE RentProperty SET utilityamtdue = ?, Rent = ? WHERE Property_id = ?
    `
}