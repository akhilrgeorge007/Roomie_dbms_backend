exports.OwnerQueries = {
    GetOwners: 'SELECT * FROM Owner',
    GetOwnerById: 'SELECT * FROM Owner WHERE Id = ?',
    GetOwnerByEmail: 'SELECT * FROM Owner WHERE Email = ?',
    AddOwner: `
        INSERT INTO Owner 
        (Name, Email, Password) 
        VALUES (?, ?, ?) `,
};