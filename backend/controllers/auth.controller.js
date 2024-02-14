import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req,res) =>{
   try {
        const{fullName,username,password,confirmPassword,gender}= req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords don't match"});
        }
        const user = await User.findOne({username});
        
        if(user){
            return res.status(400).json({error:"Username already exists"});
        }
       
        //HASH PASSWORD HERE

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=Scott=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=Maria=${username}`;

        const newUser = new User({
            fullName,
            username,
            password:hashPassword,
            gender,
            profilepic: gender === "male" ? boyProfilePic : girlProfilePic
        });
    
        
        if(newUser){

            //Generate JWT token
            generateTokenAndSetCookie(newUser._id,res);

            await newUser.save();

            res.status(201).json({
                __id: newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                profilepic:newUser.profilepic
            })
        }

        else{
            res.status(400).json({error:"Invalid User data"});
        }

   } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
   }
};

export const login = async (req,res) =>{
   try {

    const {username,password} = req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

    if(!user || !isPasswordCorrect){
        return res.status(400).json({error: "Invalid Username or password"});
    }

    generateTokenAndSetCookie(user._id,res);

    res.status(200).json({
        __id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilepic:user.profilepic,
    });
    
   } catch (error) {
    console.log("Error in Login controller", error.message);
    res.status(500).json({error:"Internal Server Error"});
   }
};

export const logout = (req,res) =>{
   try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    
   } catch (error) {
    console.log("Error in Logout controller", error.message);
    res.status(500).json({error:"Internal Server Error"});
   }
};

