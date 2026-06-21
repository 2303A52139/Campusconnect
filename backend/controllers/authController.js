const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SeniorProfile = require("../models/SeniorProfile");

// Register
const register = async (req, res) => {
try {

    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if(existingUser){
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const hashedPassword =
    await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    });

    res.status(201).json({
        message: "User registered successfully",
        user
    });

}
catch(error){
    res.status(500).json({
        error: error.message
    });
}
};

// Login Function
const login = async (req,res)=>{
try{

    const {email,password} = req.body;

    const user =
    await User.findOne({email});

    if(!user){
        return res.status(404).json({
            message:"User not found"
        });
    }

    const isMatch =
    await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(400).json({
            message:"Invalid Credentials"
        });
    }

    const token = jwt.sign(
        {
            id:user._id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    );

    res.status(200).json({
        token,
        user
    });

}
catch(error){
    res.status(500).json({
        error:error.message
    });
}
};


//Get Profile
const getProfile = async(req,res)=>{
try{

    const user =
    await User.findById(req.user.id)
    .select("-password");

    res.status(200).json(user);

}
catch(error){
    res.status(500).json({
        error:error.message
    });
}
};

// Update Profile
const updateProfile = async (req, res) => {
try {

    const user = await User.findByIdAndUpdate(
        req.user.id,
        req.body,
        { new: true }
    ).select("-password");

    // If Senior, create/update SeniorProfile
    if (user.role === "senior") {

        await SeniorProfile.findOneAndUpdate(
            { userId: user._id },
            {
                userId: user._id,
                company: user.company || "",
                role: "Senior",
                experience: user.experience || 0,
                city: user.city || "",
                availability:
                    user.availability || "Available"
            },
            {
                upsert: true,
                new: true
            }
        );
    }

    res.status(200).json(user);

}
catch (error) {
    res.status(500).json({
        error: error.message
    });
}
};

//Export
module.exports = {
    register,
    login,
    getProfile,
    updateProfile
};