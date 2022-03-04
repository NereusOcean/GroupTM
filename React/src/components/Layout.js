import {NavLink, Outlet} from "react-router-dom";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../reducers/userReducer";
import logo from "../img/logo-krug-gold.png";
const Layout = () =>{

    const isAuth = useSelector(state => state.user.isAuth);
    const roleUser= useSelector(state => state.user.currentUser.role)
    const isModerator = (roleUser  === "moderator" || roleUser === "admin");
    const dispatch = useDispatch();

    return(
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{fontSize: "1.1em",padding: "15px"}}>
                {/*<Container>*/}
                    {/*<header className={"App-header"}>*/}
                    <Navbar.Brand>
                        <NavLink to={"/"}><img src={logo} width={"60px"} height={"60px"}/></NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                    <Navbar.Collapse  id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to={"/news"}>Новости</NavLink>
                            <NavLink to={"/lessons"}>Распиание</NavLink>
                            <NavLink to={"/materials"}>Материалы</NavLink>
                            <NavLink to={"/notes"}>Заметки</NavLink>
                            {isModerator &&<NavLink to={"/listUsers"}>Пользователи</NavLink>}

                        </Nav>
                        <Nav>
                            {/*<div className={"auth"}>*/}
                            {!isAuth && <NavLink to={"/login"}>Войти</NavLink>}
                            {!isAuth && <NavLink to={"/registration"}>Регистрация</NavLink>}
                                {isAuth && <div style={{color:"white"}}>{localStorage.getItem('email')}</div>}
                                {isAuth && <Button className={"logOut"} onClick={() => dispatch(logout())}>Выйти</Button>}
                            {/*</div>*/}
                        </Nav>
                    </Navbar.Collapse>

                    {/*</header>*/}
                {/*</Container>*/}
            </Navbar>
            <main className={"content"}>
                <Outlet />
            </main>

        </>
    )
};
export {Layout};
