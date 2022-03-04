import {useSelector} from "react-redux";

const MainWindow = () =>{
    const isAuth = useSelector(state => state.user.isAuth);

    return(
        <>
            {!isAuth &&<h1>Приветствую вас товарищи!</h1>}
            {!isAuth && <p>Для полноценного опыта зарегестрируйтесь и войдите на свой аккакнт</p>}
            {isAuth && <h1>Welcome!</h1>}
        </>
    )
};
export {MainWindow};
