const express = require('express')
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const JWT_SECRET = "ranaisgreat";

// create user api or insert api 
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 character').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send(400).json({ errors: errors.array() });
        }

        try {
            

            // check whether the user is already exist or not
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email is already exist" });
            }

            // creating password hash to secure our password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            //query to create user or insert query
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            
            res.send({ authToken })

        } catch (error) {
            console.log("errrrr")
        }
    })

// login api 
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body("password", "Password can not be blank").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(400).json({ errors: errors.array() });
    }
    const{email,password} = req.body;
    try {

        let user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({ error: "Please login with right credential" });
        }

        const passwordCheck = await bcrypt.compare(password,user.password);
        if(!passwordCheck)
        {
            return res.status(400).json({ error: "Please login with right credential" });
        }
        const data={
            user:{
                id:user.id
            }
        }

        const authToken = jwt.sign(data,JWT_SECRET);
        res.json(authToken);

    }catch (error) {
        res.status(500).send("Some error occured"+error)
        // console.log(error.message)
    }
})

// Get data of loged user
router.post('/getdetails', fetchuser,async (req, res) => {
    
    try {
        let userId = req.user.id
        const user = await User.findById(userId).select("-password")
        
        res.send(user)
    }catch (error) {
        res.status(500).send("Some error occured"+error)
        // console.log(error.message)
    }
})
module.exports = router;