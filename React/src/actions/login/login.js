import axios from "axios";
import {setUser} from "../../reducers/userReducer";

export const Login =  (email, password) =>{
    return async dispatch =>{
        try{

            let res = await axios.post('api/auth/login',{
                email,
                password
            });
            dispatch(setUser(res.data.user));
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('email', res.data.user.email);
            window.location = "/news";
        }catch (e) {
            alert(e.response.data.message);
        }
    }
}

export const auth =  (email, password) =>{
    return async dispatch =>{
        try{

            let res = await axios.get('api/auth/auth',
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            );
            dispatch(setUser(res.data.user));
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('email', res.data.user.email);
        }catch (e) {
            alert(e.response.data.message);
            localStorage.removeItem('token');
            localStorage.removeItem('email');
        }
    }
}

