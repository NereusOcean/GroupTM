
import { Button } from 'react-bootstrap';
import {useSelector} from "react-redux";

let newsHolder =[
    {
        photo:{},
        text:"Пока далбаебы пьют нефть. Правительство качает ее из их анусов",
        head:"Нефть",
        date: Date.now(),
        category:"Политика"
    },
    {
        photo:{},
        text:"Надеюсь ты не читал новость выше, это пиздец , ухади отсюда пажалуста ты нипонимаешь.",
        head:"Лексика",
        date:Date.now(),
        category:"Школа"
    }
];

function getModal(){

    return(
        <>


        </>
    )
}

function newsMarkup(news){
    return(
        <>
            <div className={"blockNews"}>
                <div className={"newsHeadline"}>{news.head}</div>
                <div className={"newsDate"}>{news.date}</div>
            </div>
        </>
    )
}



const News = () =>{

    const isAdmin = useSelector(state => state.user.currentUser.role) === "admin";
    let htmlNews = [];
    for(let i in newsHolder){
        htmlNews.push(newsMarkup(newsHolder[i]));
    }
    // <div className={"blockNews"}>dsfsfsfsfsfsfsfsfsdf</div>
    // <div className={"blockNews"}>dsfsfsfsfsfsfsfsfsdf</div>
    // <div className={"blockNews"}>ddsfsfsfsfsfsfsfsdf</div>
    // <div className={"blockNews"}>dsfsfsfsfsfsfsfsfsdf</div>
    return(
        <>
            {isAdmin && <Button variant="secondary">+</Button>}
            <div className={"Contentent"}>
                Some News
                <div className={"blocks"}>
                    {htmlNews}
                </div>
            </div>

        </>
    )
};
export {News};
