import {useSelector} from "react-redux";
let roleUser;
let auth;
function SelectorGetRole(){
    roleUser = useSelector(state => state.user.currentUser.role);
    auth = useSelector(state => state.user.isAuth);
}

export const isAuth = () =>{
    SelectorGetRole();
    return auth;
}

export const isAdmin = () =>{
    SelectorGetRole();
    console.log(roleUser === "admin" || roleUser ==="superAdmin" );
    return roleUser === "admin" || roleUser ==="superAdmin" ;
}
export const isSuperAdmin = () =>{
    SelectorGetRole();
    return roleUser ==="superAdmin";
}

