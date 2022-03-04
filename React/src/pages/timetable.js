import React, {useState} from 'react';
import axios from "axios";
import {Button} from "react-bootstrap";
import "../css/timeTable.css";
import {CustomTable} from "../components/scheduleTable";

let nextTypeSchedule = "Расписание от старосты";

async function getSchedule(group){
   let res = await axios.post("/api/schedule/setScheduleFromLeti",{group});
   // let schedule = [];
   // for(let i in res.data){
   //     if(res.data[i].fullNumber === group)  schedule.push(res.data[i]);
   // }
    console.log(res.data.message);
}


export function LessonTable(){
    const [letiSchedule, setLetiSchedule] = useState(true);

    const setDbGroup = () => {
        getSchedule(6781);
    }
   // console.log(getSchedule(9382));

    const changeSchedule = () => {
        if(letiSchedule === true){
            setLetiSchedule(false);
                nextTypeSchedule = "Расписание от университета";
        }else{
            setLetiSchedule(true);
            nextTypeSchedule = "Расписание от старосты";
        }


    }


    return(
        <>
            <Button onClick={changeSchedule} style={{margin:"10px"}}>{nextTypeSchedule}</Button>
            <Button onClick={setDbGroup}>sdsdsd</Button>
            {letiSchedule &&
               <CustomTable/>
            }

            <div style={{display: "flex",
                justifyContent: "center"}}>
                {!letiSchedule && <div style={{width:"80%"}}>
                    <iframe src="https://digital.etu.ru/schedule" width="100%" height="1000" frameBorder="0">
                        Ваш браузер не поддерживает iframe!
                    </iframe>
                </div>}

            </div>
        </>

    );
}

