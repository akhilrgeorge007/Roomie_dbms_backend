const execute = require('../db/connection');
const {OwnerQueries} = require('../queries/owner');
const {v4 : uuidv4} = require('uuid');
const {PropertyQueries, PropertyCostQueries, RentPorpertyQueries} = require ('../queries/properties');

async function getOwnerController(req,res){
    try {
        const user = await execute(OwnerQueries.GetOwners,[]);
        console.log(user)
        res.status(200).json({
            users:user
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            messgae:"Fetching error"
        })
    }
}

async function registerOwnerController(req,res){
    try{
        const {Name, Email, Password} = req.body;
        console.log(Email);
        let user = await execute(OwnerQueries.GetOwnerByEmail,[Email]);
        console.log(user);
        if(user.length == 0){
            user = await execute(OwnerQueries.AddOwner,[Name,Email,Password]);
            res.status(200).json({
            message:"Owner registeration successful",
            user: user
            })
            return;
        }
        res.status(409).json({
            message:"user already registered",
            user:user
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Error registering"
        })
    }
}

async function loginOwnerController(req,res){
    try{
        const {Email,Password} = req.body;
        let user = await execute(OwnerQueries.GetOwnerByEmail,[Email]);
        console.log(user)
        if(user.length!=0){
            if(user[0].Password==Password){
                res.status(200).json({
                    message:"Login Successful",
                    user: user
                })
            }
            else{
                res.status(401).json({ error: "Invalid password" });
            }
        }
        else{
            res.status(404).json({ error: "user not found" });
        }


    } catch(error){
        console.log(error);
        res.status(404).json({ error: "user not found" });
    }


}


async function addProperty(req,res){
    try {
        const {Name,Location,Type,Description,Max_occupant,Rent} = req.body;
        const Owner_id = req.params.id;
        const Current_occupant = 0;
        const Id = uuidv4();
        let result1 = await execute(PropertyQueries.AddProperty,[Id,Name,Location,Type,Description,Max_occupant,Current_occupant,Owner_id]);
        let result2 = await execute(PropertyCostQueries.AddPropertyCost,[Id,0,0,0,Rent]);
        res.status(200).json({
            message:'Property Added',
            result1: result1,
            result2:result2

        })


    } catch (error) {
        res.status(500).json({
            message:"Error while adding property",
            error:error
        })
    }   
}

async function updatePropertyCost(req,res){
    try {
        const Id = req.params.id;
        const {Gas, Water, Electricity,Rent} = req.body;
        const cost = await execute(PropertyCostQueries.UpdatePropertyCost,[Gas,Water,Electricity,Rent,Id]);
        if(cost.affectedRows==0){
            res.status(404).json({
                message:"Property not found",
            })
        }
        else{
            const property = await execute(PropertyQueries.GetPropertyById,[Id]);
            console.log(property)
            if(property[0].Current_occupant !=0 ){
                const utilityamtdue = (Gas+Water+Electricity)/property[0].Current_occupant;
                const rent = Rent/property[0].Current_occupant;
                const rentproperty = await execute(RentPorpertyQueries.UpdateRentProperty,[utilityamtdue,rent,Id])
                console.log(rentproperty)

            }
            
            res.status(200).json({
                message:"Cost Updated",
                cost: cost
            })
        }
        

    } catch (error) {
        res.status(500).json({
            message:"Error while updating cost",
            error:error
        })
        
    }
}

module.exports = {
    getOwnerController,
    registerOwnerController,
    loginOwnerController,
    addProperty,
    updatePropertyCost
}