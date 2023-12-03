import Team from "../models/Team.js";
import User from "../models/User.js"

export const createUser = async (req, res) => {
  const { email } = req.body;

  try { 
    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) { 
      // If the email already exists, return a conflict response
      return res.status(409).json({ message: 'Email already exists' });
    }

    // If the email doesn't exist, create a new user
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).json(savedUser); // Respond with the saved user and status 201 (Created)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateUser = async (req,res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set : req.body },
            { new : true }
        )
        res.status(200).json(updateUser);
    } 
    catch (err) {
        res.status(409).json({message: err});
    }
}

export const deleteUser = async (req,res) => {
    try {
        await User.findByIdAndDelete(
            req.params.id
        )
        res.status(200).json("User has been deleted")
    } catch (err) {
        res.status(409).json({message: err});
    }
}

export const getUser = async (req,res) => {
    try {
        const Users = await User.findById( req.params.id );
        res.status(200).json(Users); 
    } catch (err) {
        res.status(409).json({message: err});
    }
}

export const getAllUser = async (req,res) => {
    const {...others} = req.query;
    try {
        const Users = await User.find({
            ...others,
        });
        res.status(200).json(Users);
    } catch (err) {
        res.status(409).json({message: err});
    }
}


export const domainGender = async (req, res) => {
    try {
        // const uniqueGenders = await User.distinct('gender');
        // const uniqueDomains = await User.distinct('domain');
        // console.log(uniqueGenders)
        // res.json({ uniqueGenders, uniqueDomains });
        // const { selectedGender, selectedDomain } = req.query;

        const filter = {};
        if (selectedGender) {
          filter.gender = selectedGender;
        }
        if (selectedDomain) {
          filter.domain = selectedDomain;
        }

        const filteredData = await User.find(filter).toArray();
        res.json(filteredData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}