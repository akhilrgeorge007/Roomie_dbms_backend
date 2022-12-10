const execute = require('../db/connection');
const {OwnerQueries} = require('../queries/owner')

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

module.exports = {
    getOwnerController,
    registerOwnerController,
    loginOwnerController
}