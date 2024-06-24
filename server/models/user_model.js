const mongoose =require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,

    },
    email:{
        type:String,
        require:true
    },
    DateOfBirth:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});


// secure the password with the bcrypt
userSchema.pre('save', async function() {
    // console.log("pre method ", this);
    const user = this
    if(!user.isModified('password')){
        next();
    }
    try {

        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;

    } catch (error) {
        next(error);
    }
});

// compare the password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}


// JSON web token
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email : this.email,
            isAdmin : this.isAdmin
        },
            process.env.JWT_SECRET_KEY, 
            {
                expiresIn : "1d",
            }
        )
    } catch (error) {
        console.error(error);
    }
}

// define the  model or the collection name

const User =new mongoose.model('User',userSchema);

module.exports = User;









//  Schema is defined the structure of the document within a collection.
// It specifies the fields and their types and any additional constraints or validations 



// Model : Acts as a higher level abstraction that interact with the database based on
// the defined schema. it Represent a collection and provides and interface for querying, creating, updating, deleting
// documents in that collection.
// Models are created from schemas and enable you to work with mongodb data in a more structure manner in your 
// application.


// What is JWT 
// json web token (JWT) is an open standard (RFC 7519) that defines a compact and self content way for 
// securely transmitting information between parties as a json object.
// jWT s are often used for authentication and authorization in web application
// 1. authentication : Verifying the identity of a user or client 
// 2. authorization : Determining what action a user a client is allowed to performed.


// Components of jwt 
// 1. header  : contains meta data about the token, such as the type of token and the sign in alogorithms 
// being used.
// payload : contains claims or statements about an  entity (Typically, user ) and additional data.
// common claims : include userId, username, and expiration time
// signature : to verify that the sender of the jwt is who it say it is and to ensure that the message was't change 
// along the way, a  signature is included.


// Tokens :
// such as JWTs (JSON WEB TOKEN), are typically not stored in the database along with other users details.
// instead, they are issued by the server during the  authentication process and then stored on the client side.
// e.g  in cookies or local storage for later use