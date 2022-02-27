
import React,{useState} from "react";
import {Button} from "react-bootstrap";
import {Registration} from "../actions/login/registration";

const RegistrationPage = () =>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [group,setGroup] = useState(0)

    const changeEmail = (event) => {
        setEmail(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    const changeGroup = (event) => {
        setGroup(event.target.value);
    }

    return(
        <>
            <div className={"Contentent"}>
                <div className="group">
                    <input className={"inputAuth"} type="text" onChange={changeEmail} required/>
                        <span className="bar"></span>
                        <label>Email</label>
                </div>
                <div className="group">
                    <input className={"inputAuth"} type="password" onChange={changePassword} required/>
                    <span className="bar"></span>
                    <label>Password</label>
                </div>
                <div className="group">
                    <input className={"inputAuth"} type={"number"} onChange={changeGroup} required/>
                    <span className="bar"></span>
                    <label>Group</label>
                </div>



                <div>
                    <Button  style={{margin:" 15px"}} onClick={() => Registration(email,password,group)}>Регистрация</Button>
                </div>

            </div>
        </>
    );
}

export {RegistrationPage}
