const User = require("../models/user_model");
const bcrypt = require("bcryptjs");

const home = async ( req, res)=>{
    try {
        res.status(200).send("Welcome to world route")
    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res)=>{
    try {
        const {username, email, DateOfBirth, password} = req.body;
        console.log(req.body);
        const userExists =await User.findOne({email:email});
        if(userExists){
            return res.status(400).json({message:"Email already exists"});
        }
        
        
        const userCreated = await User.create({username, email, DateOfBirth, password});

        res.status(201).json({msg : userCreated,
             token: await userCreated.generateToken(), 
             userId:userCreated._id.toString(),  
        });
        // res.status(200).render("register.ejs");
    } catch (error) {
        res.status(400).send({message:"page not found"});
    }
};

// user Registration Steps :
// 1. Get registration data : retrieve user data (username, email, password)
// 2. check email existence : check if the email is already registered 
// 3. hash password : Securely hash password
// 4. create user : create a new user with hashed password
// 5. save to db : save user data to the database
// 6. responds : responds with registration successful or handle errors



// User Login Logic

const login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const userExists = await User.findOne({email});

        if(!userExists){
            res.status(400).send({message:"Invalid Email or password!"});
        }

        // const user = await bcrypt.compare(password, userExists.password);
        const user = await userExists.comparePassword(password);

        if(user){
            res.status(200).json({
                message : "Login Successful",
                token: await userExists.generateToken(), 
                userId:userExists._id.toString(), 
            });

        }else{
            res.status(401).json({message : "Invalid email or password"})
        }

    } catch (error) {
          res.status(500).send({message:"page not found"});
    }
}


// to send user data User Logic

const users = async( req, res)=>{
    try {
        const users = await User.find({},{password:0});
        console.log(users)
        if(!users || users.length === 0 ) {
            res.status(404).send({message:"Users not Found"});
        }
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteUser = async (req, res ) =>{
   try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
     res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}




module.exports = {home, register, login, users, deleteUser};