require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require('./db/connection')
const tenantRouter  = require('./routes/tenant.router')
const ownerRouter  = require('./routes/owner.router')
const propertyRouter = require('./routes/property.router')
const port = process.env.PORT;

app.use('/tenant', tenantRouter);
app.use('/owner', ownerRouter);
app.use('/property', propertyRouter);

app.listen(port, () => { 
    console.log(`Server running on ${port}...`)
})