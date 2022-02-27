import axios from "axios";
export const Registration = async (email, password,group) =>{

        try{

            let res = await axios.post('api/auth/registration',{
                email,
                password,
                group
            });

            await alert(res.data.message);
            window.location = "/login";
        }catch (e) {
            alert(e.response.data.message);
        }


}
