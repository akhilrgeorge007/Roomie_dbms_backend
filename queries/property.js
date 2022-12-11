exports.PropertyQueries = {
    GetAllAvailProperties: 'SELECT * from Property WHERE Current_occupant < Max_occupant',
};