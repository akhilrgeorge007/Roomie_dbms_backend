const execute = require('../db/connection');
const {PropertyQueries, PropertyCostQueries} = require('../queries/properties');

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

async function getPropertyCostController(req,res){
    try {
        const Property_id = req.params.id;
        const propertyCost = await execute(PropertyCostQueries.GetPropertyCostById,[Property_id]);
        if(propertyCost.length!=0){
            res.status(200).json({
                message:"PropertyCost found",
                propertyCost:propertyCost
            });
        }
        else{
            res.status(404).json({
                message:"PropertyId not found"
            });
        }

    } catch (error) {
        res.status(500).json({
            message:"Fetching Error",
            error:error
        })        
    }
}

module.exports = {
    getPropertyController,
    getPropertyCostController
}