import {NavLink, Outlet} from "react-router-dom";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../reducers/userReducer";
import logo from "../img/logo192.png";
const Layout = () =>{

    const isAuth = useSelector(state => state.user.isAuth);
    const isAdmin = useSelector(state => state.user.currentUser.role) === "admin";
    const dispatch = useDispatch();

    return(
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{fontSize: "1.1em",padding: "15px"}}>
                {/*<Container>*/}
                    {/*<header className={"App-header"}>*/}
                    <Navbar.Brand>
                        <NavLink to={"/"}><img src={logo} width={"40px"} height={"40px"}/></NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                    <Navbar.Collapse  id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link><NavLink to={"/news"}>Новости</NavLink></Nav.Link>
                            <Nav.Link><NavLink to={"/lessons"}>Распиание</NavLink></Nav.Link>
                            <Nav.Link><NavLink to={"/materials"}>Материалы</NavLink></Nav.Link>
                            <Nav.Link><NavLink to={"/notes"}>Заметки</NavLink></Nav.Link>
                            {isAdmin &&<Nav.Link><NavLink to={"/listUsers"}>Пользователи</NavLink></Nav.Link>}
                            {!isAuth && <Nav.Link><NavLink to={"/login"}>Войти</NavLink></Nav.Link>}
                            {!isAuth && <Nav.Link><NavLink to={"/registration"}>Регистрация</NavLink></Nav.Link>}
                        </Nav>
                        <Nav>
                            {/*<div className={"auth"}>*/}
                                {isAuth && <div style={{color:"white"}}>{localStorage.getItem('email')}</div>}
                                {isAuth && <Button onClick={() => dispatch(logout())}>Выйти</Button>}
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
