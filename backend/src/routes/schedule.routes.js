const Router = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const authMiddleWare = require("../middleware/auth.middleware");
const {check, validationResult} = require("express-validator");
const router = new Router();
const axios = require("axios");


router.get('/getScheduleFromLeti',
     async (req,res) =>{
        try{
            let rowData =[];
            const jsonData =await axios.get(`https://digital.etu.ru/api/schedule/objects/publicated?facultyId=3&courses=3&withSubjectCode=true&withURL=true&studyingType=%D0%BE%D1%87`,{
                headers:{
                    "Host": "digital.etu.ru",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:96.0) Gecko/20100101 Firefox/96.0",
                    "Referer": "https://digital.etu.ru/schedule/",
                    "Connection": "close",
                }
            });
            return res.json(jsonData.data);

        }catch (e){
            console.log(e);
            res.send({message:"Server error!"});
        }
    });



module.exports = router;
