const mongoose = require("mongoose");
const UserSchema = require("../models/User");
const User = mongoose.model("User", UserSchema);
class UserService {

    //---------------------------------------

     async getUser(){
        return await User.find({isDel: false}).select(["-salt", "-hash"])
    }

    //----------------------------------------

    async getUserById(id){
        return await User.find({isDel: false, _id: id}).select(["-salt", "-hash"])
    }

    //----------------------------------------

    async setUser(user){
        
        if(user["_id"] !== undefined){
           return await User.updateOne({ _id: user["_id"] }, { $set: user })
        }
        else{
            const userObj = new User(user);
            userObj.setPassword(user.password)
            const result = await userObj.save();
            result["salt"]="";
            result["hash"]="";
            return result;
        }
    }

    //-----------------------------------

    async loginUser(loginObject){

        let FoundUser = await User.findOne({email: loginObject.email})
        //console.log(FoundUser)

        if(FoundUser){
            console.log("User Found...")
            const user = FoundUser;
        
            if(user.validatePassword(loginObject.password)){
                user.hash = "";
                user.salt = "";
                const objUser = user.toObject();
                objUser.token = user.generateToken();

                return objUser;
            }else{
                return "";
            }
        }else{
            return ""
        }

    }

    //-------------------------------------

    async removeUser(id){
           return await User.updateOne({_id: id}, { $set: {isDel: true } }) 
    }
    //---------------------------------------



}


module.exports = UserService;