const Router = require("express");
const Groups = require("../models/Groups");
const ScheduleLeti = require("../models/ScheduleLeti");
const ScheduleAdmin = require("../models/ScheduleAdmin");
const router = new Router();
const axios = require("axios");
const User = require("../models/User");


const timeSchedule = [
    "8:00",
    "9:50",
    "11:40",
    "13:40",
    "15:30",
    "17:20"
]

router.post('/updateGroupAndId',
     async (req,res) =>{
        try{
            const jsonData =await axios.get(`https://digital.etu.ru/api/general/dicts/groups?scheduleId=publicated`,{
                headers:{
                    "Host": "digital.etu.ru",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:96.0) Gecko/20100101 Firefox/96.0",
                    "Referer": "https://digital.etu.ru/schedule/",
                    "Connection": "close",
                }
            });

            for(let i in jsonData.data){
                const candidate = await User.findOne({customId:jsonData.data[i].id});
                if(candidate){
                   continue;
                }
                    const group = new Groups({customId: jsonData.data[i].id, nameGroup:jsonData.data[i].fullNumber});
                    await group.save();
            }
            console.log("Group is updated!");

            return res.json({message: "groupBD is updated"});

        }catch (e){
            console.log(e);
            res.send({message:"Server error!"});
        }
    });

router.post('/setScheduleFromLeti',
    async (req,res) =>{
        try{
            const {group} = req.body;
            const candidateGroup = await Groups.findOne({nameGroup:group});
            console.log(candidateGroup);
            if(!candidateGroup){
                return res.status(400).json({message: `There is no group with number ${group}`});
            }

            const candidateSchedule = await ScheduleLeti.findOne({nameGroup:group});
            if(candidateSchedule){
                return res.status(400).json({message: `There is a schedule for this group ${group}`});
            }
            //console.log(candidateSchedule,candidateGroup);
            const jsonData =await axios.get(`https://digital.etu.ru/api/schedule/objects/publicated?groups=${candidateGroup.customId}&withSubjectCode=true&withURL=true`,{
                headers:{
                    "Host": "digital.etu.ru",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:96.0) Gecko/20100101 Firefox/96.0",
                    "Referer": "https://digital.etu.ru/schedule/",
                    "Connection": "close",
                }
            });
            // console.log(jsonData.data);
            // console.log(jsonData.data[0].scheduleObjects);
            let schedule =[];
             for(let i in jsonData.data[0].scheduleObjects){
                 let lesson = jsonData.data[0].scheduleObjects[i].lesson;
                 let place = lesson.auditoriumReservation.reservationTime;

                 await Groups.updateMany({"_id":candidateGroup._id},
                     {"$push":
                             {"schedule": {
                                     group: group,
                                     time: timeSchedule[place.startTime % 100],
                                     weekDay: place.weekDay,
                                     title: lesson.subject.title,
                                     shortTitle: lesson.subject.shortTitle,
                                     teacher: (lesson.teacher ? lesson.teacher.initials : null),
                                     cabinet: lesson.auditoriumReservation.auditoriumNumber,
                                     kindWeek: place.week,
                                }
                             },
                         function (err, raw) {
                             if (err) return console.log(err);
                             console.log('The raw response from Mongo was ', raw);
                         }
                });

            }
            //let doc = await Groups.findOneAndUpdate(candidateGroup.customId, schedule);
            //doc = await Groups.findOne({customId:candidateGroup.customId});
            //console.log(doc);
            console.log(`Schedule for ${group} is set!`);
            return res.json({message: "Schedule is updated"});

        }catch (e){
            console.log(e);
            res.send({message:"Server error!"});
        }
    });



module.exports = router;
