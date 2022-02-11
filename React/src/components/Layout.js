import {Link, Outlet} from "react-router-dom";

const Layout = () =>{

    return(
        <>
            <header>
                <Link to={"/lessons"}>Распиание</Link>
                <Link to={"/materials"}>Распиание</Link>
                <Link to={"/notes"}>Распиание</Link>
            </header>
            <Outlet />
            <footer>Some shit in ass</footer>
        </>
    )
}
