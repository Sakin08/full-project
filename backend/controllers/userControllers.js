import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate input
    if (!name || !email || !password) {
      return res.json({success:false,message:"Missing Details"})
    }
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Enter a valid Email"})
    }
    if(password.length<8){
        return res.json({success:false,message:"Enter a strong password"})

    }
    //hassing user password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const userData={
        name,
        email,
        password:hashedPassword,

    
    }

    const newUser=new userModel(userData)
    const user=await newUser.save()
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({success:true,token})

    //_id token




    }
   catch (error) {
     console.log(error)
     res.json({success:false,message:error.message})
  }
};

//api for login user

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await userModel.findOne({email})

        if(!user){
           return res.json({success:false,message:"user doesn't exist"})

        }
        const isMatch=await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({ success: false, message: "Invalid credentials" })

        }

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//api to get user profile data

const getProfile=async(req,res)=>{
    try{
        const userId = req.user.id;
        const userData=await userModel.findById(userId).select('-password')
        res.json({success:true,userData})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//api to update user profile

const updateProfile=async(req,res)=>{
    try{
        const {userId,name,phone,address,dob,gender}=req.body
        const imageFile=req.file 
        if(!name || !phone || !dob || !gender ){
            return res.json({success:false,message:"Data Missing"})
        }
        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
        if(imageFile){
            //upload image to cloudinary
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl=imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId,{image:imageUrl})

        }

        res.json({success:true,message:"Profile Updated"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {registerUser,loginUser,getProfile,updateProfile}
