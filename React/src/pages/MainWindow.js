import {useSelector} from "react-redux";

const MainWindow = () =>{
    const isAuth = useSelector(state => state.user.isAuth);

    return(
        <>
            <h1>Приветствую вас товарищи!</h1>
            <p>Для полноценного опыта зарегестрируйтесь и войдите на свой аккакнт</p>

        </>
    )
};
export {MainWindow};
