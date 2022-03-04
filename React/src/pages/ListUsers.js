import {useSelector} from "react-redux";
import axios from "axios";
import {useEffect, useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "../css/ListUser.css";

 let myRow = 0;
const headers = [
    {
        dataField: "id",
        text: "ID",
        sort: true
    },
    {
        dataField: "email",
        text: "User email",
        sort: true
    },
    {
        dataField: "group",
        text: "Group",
        sort: true
    },
    {
        dataField: "role",
        text: "Role",
        sort: true
    }
];

// events: {
//     onClick: (e, column, columnIndex, row, rowIndex) => { console.log(e) },
// }
async function changeRole(event) {
    let changeStatus = await axios.post('api/auth/setRole', {
        email: event.target.id,
        role: event.target.value
    });
    console.log(changeStatus.data.message);
}

function makeColumns(object){
    let column =[];
    let myEmail = localStorage.getItem('email');
    for(let i in object){
        let input = (<select id={`${object[i].email}`} onChange={changeRole}>
            <option value={object[i].role}>{object[i].role}</option>
            <option value={object[i].role === 'moderator'? "user":"moderator"}>{object[i].role === 'moderator'? "user":"moderator"}</option>
        </select>);
        if(myEmail === object[i].email){
            myRow = Number(i);
            column.push({id: i, email: myEmail,group:object[i].group, role: object[i].role, });
        }else{
            column.push({id: i, email: object[i].email,group:object[i].group, role: object[i].role === 'admin'? "admin":input});
        }

    }
    console.log(object);
    return column;
}

function rowStyleFormat(row, rowIdx) {
    return { backgroundColor: rowIdx === myRow ? 'rgba(0,0,0, 0.05)' : 'white' };
}

const ListUsers = () =>{

    const [users,setUsers] = useState();
    useEffect( () => {
         axios.get("api/auth/getUsers").then(res => {
            setUsers(res.data);
        }).catch((error) =>{
            console.log(error);
         });
    },[])

    return(
        <>
            <h2>Список пользователей</h2>
            <BootstrapTable
                bootstrap4
                keyField="id"
                data={makeColumns(users)}
                columns={headers}
                rowStyle={ rowStyleFormat }
                rowClasses = "mytable-hover-row"
            />
        </>
    )
};
export {ListUsers};
