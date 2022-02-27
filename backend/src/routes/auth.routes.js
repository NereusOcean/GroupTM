const Router = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const authMiddleWare = require("../middleware/auth.middleware");
const {check, validationResult} = require("express-validator");
const router = new Router();

const passwordRule ={min: 3, max:16};
const groupRule ={min:4,max:4};
let admins = ["niki_5555@mail.ru", "admin@mail.ru"];

router.post('/registration', [
        check('email',"Uncorrect email").isEmail(),
        check("password",`Password must be longer than ${passwordRule.min} and shorter than ${passwordRule.max}`).isLength({min:passwordRule.min,max:passwordRule.max}),
        check("group",`Group must be ${groupRule.min} digit`).isLength({min:groupRule.min,max:groupRule.max}).isNumeric(),
    ],
    async (req,res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            let ErrorMesage = "";
            console.log(errors)
            for(let i in errors.errors){
                console.log(i);
               ErrorMesage += errors.errors[i].msg +"\n";
            }
            return res.status(400).json({message: ErrorMesage, errors});
        }

        const {email, password,group} = req.body;
        const candidate = await User.findOne({email});
        if(candidate){
            return res.status(400).json({message: `User with email ${email} alredy exist`});
        }

        let role = 'user';
        for(let i in admins){
            email === admins[i]? role = 'admin': null;
        }


        const hashPassword = await bcrypt.hash(password, 6);
        const user = new User({email, password: hashPassword, role,group});
        await user.save();
        return res.json({message: "User was created"});
    }catch (e){
        console.log(e);
        res.send({message:"Server error!"});
    }
});

router.post('/login', async (req,res) =>{
        try{
            const {email,password} = req.body;
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({message: "User not found"});
            }

            const isPassValid = bcrypt.compareSync(password,user.password);
            if(!isPassValid){
                return res.status(400).json({message: "Invalid password"});
            }

            const token = jwt.sign({id: user.id}, config.privateKey,{expiresIn: "2h"});
            return res.json({
                token,
                user:{
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            })

        }catch (e){
            console.log(e);
            res.send({message:"Server error!"});
        }
    });


router.get('/auth', authMiddleWare ,
    async (req,res) =>{
        try{
            const user = await User.findOne({_id: req.user.id});
            const token = jwt.sign({id: user.id}, config.privateKey,{expiresIn: "2h"});
            return res.json({
                token,
                user:{
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            });

        }catch (e){
            console.log(e);
            res.send({message:"Server error!"});
        }
});

router.post('/setRole',
    async (req,res) =>{
        try{
            const {email,role} = req.body;
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({message: "User not found"});
            }

            user.role = role;
            await user.save();
            console.log(`${email} is ${role} now`);
            return res.send({message:`${email} is ${role} now!`})

        }catch (e){
            console.log(e);
            res.send({message:"Server error!"});
        }
    });

router.get('/getUsers',
    async (req,res) =>{
        try{
            let rowData =[];
            const user = await User.find({}).then(doc => {
                doc.forEach(el => {
                    let rowEl ={};
                    rowEl["id"] = el["_id"];
                    rowEl["email"] = el["email"];
                    rowEl["role"] = el["role"];
                    rowData.push(rowEl);
                })
            });
            return res.json(rowData);

        }catch (e){
            console.log(e);
            res.send({message:"Server error!"});
        }
    });



module.exports = router;
