var mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  "email":  { "type": String, "unique":true},
  "password": String,
  
  
});

let finalUsers;

module.exports.startDB = function()
{
    return new Promise(function (resolve, reject) {
        let db= mongoose.createConnection("mongodb+srv://Tatiana:vty.cat14@cluster0.70jjou4.mongodb.net/a6",{ useNewUrlParser: true, useUnifiedTopology: true }, function(error){
             if(error)  reject("unable to sync the database");
             else 
             {
                finalUsers = db.model("final", userSchema);
                console.log("DB connection successful.");
                 resolve()}
         });       
        
 });
       
}

module.exports.register = function(user)
{
    
    return new Promise(function (resolve, reject) {
       
        if (user.email.trim().length==0 || user.password.trim().length==0)
        {
         reject("email or password cannot be empty.")
        }
        else
        {
           bcrypt.hash(user.password, 10).then(hash=>{ // Hash the password using a Salt that was generated using 10 rounds
                     // TODO: Store the resulting "hash" value in the DB
                     user.password=hash;
                     let newUser = new finalUsers(user);
                     newUser.save().then(function()
                     {
                          resolve(user)
                     })
                     .catch(function(err)
                     {
                          if (err.code==11000)
                          {
                              reject(`(${user.email}) already exists`)
                          }
                          else{
                              reject(`cannot create the user`)
                          }
                     })
                     });
             
        }
       
        
       
        });
       
}

module.exports.signIn = function(user)
{
    return new Promise(function (resolve, reject) {
        finalUsers.findOne({ email : user.email }).exec().then(function(userf)
        {
            //console.log(user)
            if (userf==null)
            {
                reject(`Cannot find the user: ${userData.userName}`)
            }
           
            bcrypt.compare(user.password,userf.password).then((res) => {
                // res === true if it matches and res === false if it does not match
                if (res===false)
                {

               
                    reject(`Incorrect Password for user: ${user.email}`)
                }
                else{
                    
                        resolve(user)
                  
                }
               });
               
           
           
        })
       .catch(function(err)
       {
            reject(`Unable to find user: ${userData.userName}`)
       })
       });
       
}