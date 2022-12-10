const execute = require('../db/connection');
const {TenantQueries} = require('../queries/tenant')

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

module.exports = {
    getTenantsController,
    registerTenantController,
    loginTenantController
}