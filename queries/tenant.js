exports.TenantQueries = {
    GetTenants: 'SELECT * FROM Tenant',
    GetTenantById: 'SELECT * FROM Tenant WHERE Id = ?',
    GetTenantByEmail: 'SELECT * FROM Tenant WHERE Email = ?',
    GetTenantByPropertyId:'SELECT Name,utilityamtdue,Rent FROM tenant, rentproperty where tenant.Id = rentproperty.Tenant_id and rentproperty.Property_id = ?',
    AddTenant: `
        INSERT INTO Tenant 
        (Name, Email, Password) 
        VALUES (?, ?, ?) `,
};