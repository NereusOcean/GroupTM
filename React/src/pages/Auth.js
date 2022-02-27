
import React,{useState} from "react";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";

import {Registration} from "../actions/login/registration";
import "../css/Auth.css";
import {Login} from "../actions/login/login";

const Auth = () =>{

    const [data,setData] = useState(null);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const changeEmail = (event) => {
        setEmail(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    const dispatch = useDispatch();

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
            <div>
                <Button  style={{margin:" 15px"}} onClick={() => dispatch(Login(email,password))}>Вход</Button>
            </div>

        </div>
      </>
    );
}

export {Auth}
