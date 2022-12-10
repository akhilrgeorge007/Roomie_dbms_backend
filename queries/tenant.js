exports.TenantQueries = {
    GetTenants: 'SELECT * FROM Tenant',
    GetTenantById: 'SELECT * FROM Tenant WHERE Id = ?',
    GetTenantByEmail: 'SELECT * FROM Tenant WHERE Email = ?',
    AddTenant: `
        INSERT INTO Tenant 
        (Name, Email, Password) 
        VALUES (?, ?, ?) `,
};