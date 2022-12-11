const execute = require('../db/connection');
const {PropertyQueries} = require('../queries/properties');

async function getPropertyController(req,res){
    try {
        const property = await execute(PropertyQueries.GetAllAvailProperties,[]);
        console.log(property);
        res.status(200).json({
            properties:property
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Fetching error"
        })
    }
}

module.exports = {
    getPropertyController,
}