import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'

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

export {registerUser,loginUser}
