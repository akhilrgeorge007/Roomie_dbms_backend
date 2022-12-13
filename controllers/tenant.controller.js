const execute = require('../db/connection');
const {TenantQueries} = require('../queries/tenant')
const {PropertyQueries,RentPorpertyQueries,PropertyCostQueries} = require('../queries/properties');

async function getTenantsController(req,res){
    try {
        const user = await execute(TenantQueries.GetTenants,[]);
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

async function registerTenantController(req,res){
    try{
        const {Name, Email, Password} = req.body;
        console.log(Email);
        let user = await execute(TenantQueries.GetTenantByEmail,[Email]);
        console.log(user);
        if(user.length == 0){
            user = await execute(TenantQueries.AddTenant,[Name,Email,Password]);
            res.status(200).json({
            message:"Tenant registeration successful",
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

async function loginTenantController(req,res){
    try{
        const {Email,Password} = req.body;
        let user = await execute(TenantQueries.GetTenantByEmail,[Email]);
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

async function getTenantById(req,res){
    try{
        const Id = req.params.id;
        const user = await execute(TenantQueries.GetTenantById,[Id]);
        if(user.length!=0)
        {
            res.status(200).json({
                message:"user found",
                user: user
            })
        }
        else
        {
            res.status(500).json({
                message:"user not found!"
            })

        }
    }
    catch(err)
    {
        res.status(500).json({
            message:"fetching error"
        })
    }
    
    
} 

async function rentpropertyController(req,res){
    try {
        const Tenant_id = req.params.id;
        const {Property_id} = req.body;
        const property = await execute(PropertyQueries.GetPropertyById,[Property_id]);
        if(property[0].Current_occupant<property[0].Max_occupant){
            curr_occupant = property[0].Current_occupant+1;
            updated = await execute(PropertyQueries.UpdateCurrentOccupant,[curr_occupant,Property_id]);
            if(updated.affectedRows!=0){
                const propertyCost = await execute(PropertyCostQueries.GetPropertyCostById,[Property_id]);
                const rentProperty = await execute(RentPorpertyQueries.AddRentProperty,[Tenant_id,Property_id,0,property[0].Rent/curr_occupant]);
                if(rentProperty.affectedRows!=0){
                    res.status(200).json({
                        message:'Property Rented successful'
                    })
                }
                else{
                    res.status(404).json({
                        message:'Property Rented failed'
                    })
                }
            }

        }
    } catch (error) {
        res.status(500).json({
            message:'Eror adding',
            error:error
        })
    }
}

async function getrentpropertyByidContorller(req,res){
    try {
        const id = req.params.id
        const property = await execute(RentPorpertyQueries.GetRentPropertyByTenantId,[id]);
        if(property.length!=0){
            res.status(200).json({
                property:property
            })
        }
        else{
            res.status(404).json({
                message:'Propertyfailed'
            })
        }

    } catch (error) {
        res.status(500).json({
            message:"fetching error"
        })
    }
}

module.exports = {
    getTenantsController,
    registerTenantController,
    loginTenantController,
    getTenantById,
    rentpropertyController,
    getrentpropertyByidContorller
}