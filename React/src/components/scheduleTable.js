import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from 'react-bootstrap-table2-editor';
import {render} from "react-dom";



function formaterForColumn(cell,mode){
    return (
        <div className={"cell"} id={(cell.type !== ""?(cell.intramural? "lect":"dist"):null)}>
            <div className={"nameAndType"}>
                {mode ==="input"?<input placeholder={cell.name}/>:cell.name}
                 <div className={cell.type !== ""?"typeLesson":null} >
                    {mode ==="input"?<input placeholder={cell.type}/>:cell.type}
                </div>
            </div>
            <div className={"teacherCabinet"}>
                {mode ==="input"?<input placeholder={cell.teacher}/>:cell.teacher}
                <div>
                {mode ==="input"?<input placeholder={cell.cabinet}/>
                        :(cell.cabinet !== ""?
                            ("a." + cell.cabinet):"")}
                </div>
                {mode ==="input"?<select placeholder={"isDistant"}><option value={"true"}>Да</option><option value={"false"}>Нет</option></select>:""}
            </div>
        </div>
    )
}

function ChangeData(props){
        console.log(props.row);
        console.log(Object.keys(daysOfTheWeekClear)[props.columnIndex-1]);
        return formaterForColumn(props.row[Object.keys(daysOfTheWeekClear)[props.columnIndex-1]],"input");


}

const daysOfTheWeek ={
    Mon: {teacher:"Коточигов А.М",cabinet:"5427",name:"ЭлФункцАн",type:"Лек",intramural: true,rowIndex:0},
    Tue: {teacher:"Коточигов А.М",cabinet:"5427",name:"ЭлФункцАн",type:"Лек",intramural: false,rowIndex:1},
    Wed: {teacher:"Коточигов А.М",cabinet:"5427",name:"ЭлФункцАн",type:"Лек",intramural: true,rowIndex:2},
    Thu: {teacher:"Коточигов А.М",cabinet:"5427",name:"ЭлФункцАн",type:"Лек",intramural: true,rowIndex:3},
    Fri: {teacher:"Коточигов А.М",cabinet:"5427",name:"ЭлФункцАн",type:"Лек",intramural: true,rowIndex:4},
    Sat: {teacher:"Коточигов А.М",cabinet:"5427",name:"ЭлФункцАн",type:"Лек",intramural: true,rowIndex:5},
}
const daysOfTheWeekClear ={
    Mon: {teacher:"",cabinet:"",name:"",type:"",intramural: true,rowIndex:0},
    Tue: {teacher:"",cabinet:"",name:"",type:"",intramural: false,rowIndex:1},
    Wed: {teacher:"",cabinet:"",name:"",type:"",intramural: true,rowIndex:2},
    Thu: {teacher:"",cabinet:"",name:"",type:"",intramural: true,rowIndex:3},
    Fri: {teacher:"",cabinet:"",name:"",type:"",intramural: true,rowIndex:4},
    Sat: {teacher:"",cabinet:"",name:"",type:"",intramural: true,rowIndex:5},
}

const Grid = {
    headers:[
        {
            dataField: "time",
            text:"Время",
            headerStyle: (colum, colIndex) => {
                return {width: '6%', textAlign: 'center',
                    position: 'sticky', top: '0', backgroundColor: "white", };
            },
            formatter:(cell) =>(<div className={"cell"}>{cell}</div>),
            editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                <ChangeData row={row} columnIndex={columnIndex}/>
            )
        },
        {
            dataField: "Mon",
            text:"Понедельник",
            headerStyle: (colum, colIndex) => {
                return {width: '13%', textAlign: 'center',
                    position: 'sticky', top: '0', backgroundColor: "white", };
            },
            formatter:(cell) => formaterForColumn(cell),
            editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                <ChangeData row={row} columnIndex={columnIndex}/>
            )
        },
        {
            dataField: "Tue",
            text:"Вторник",
            headerStyle: (colum, colIndex) => {
                return {width: '13%', textAlign: 'center',
                    position: 'sticky', top: '0', backgroundColor: "white", };
            },
            formatter:(cell) =>formaterForColumn(cell),
            editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                <ChangeData row={row} columnIndex={columnIndex}/>
            )
        },
        {
            dataField: "Wed",
            text:"Среда",
            headerStyle: (colum, colIndex) => {
                return {width: '13%', textAlign: 'center',
                    position: 'sticky', top: '0', backgroundColor: "white", };
            },
            formatter:(cell) =>formaterForColumn(cell),
            editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                <ChangeData row={row} columnIndex={columnIndex}/>
            )
        },
        {
            dataField: "Thu",
            text:"Четверг",
            headerStyle: (colum, colIndex) => {
                return {width: '13%', textAlign: 'center',
                    position: 'sticky', top: '0', backgroundColor: "white", };
            },
            formatter:(cell) =>formaterForColumn(cell),
            editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                <ChangeData row={row} columnIndex={columnIndex}/>
            )
        },
        {
            dataField: "Fri",
            text: "Пятница",
            headerStyle: (colum, colIndex) => {
                return {width: '13%', textAlign: 'center',
                    position: 'sticky', top: '0', backgroundColor: "white", };
            },
            formatter:(cell) =>formaterForColumn(cell),
            editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                <ChangeData row={row} columnIndex={columnIndex}/>
            )
        },
        {
            dataField: "Sat",
            text:"Суббота",
            headerStyle: (colum, colIndex) => {
                return {width: '13%', textAlign: 'center',
                    position: 'sticky', top: '0', backgroundColor: "white", };
            },
            formatter:(cell) =>formaterForColumn(cell),
            editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                <ChangeData row={row} columnIndex={columnIndex}/>
            )
        }
    ],



    columns:[
        {time:"8:00"},
        {time:"9:50"},
        {time:"11:40"},
        {time:"13:40"},
        {time:"15:30"},
        {time:"17:20"}
    ],
    columns2:[
        {time:"8:00"},
        {time:"9:50"},
        {time:"11:40"},
        {time:"13:40"},
        {time:"15:30"},
        {time:"17:20"}
    ]
};



function fillColumn(){
    for(let i in Grid.columns){
        for(let j in daysOfTheWeek){
            if(i/1 === daysOfTheWeek[j].rowIndex){
                Grid.columns[i][j] = daysOfTheWeek[j];
            }else{
                Grid.columns[i][j] = daysOfTheWeekClear[j];
            }

        }
    }
}
fillColumn();




export function CustomTable(){

    const rowStyle = (row, rowIndex) => {
        if(rowIndex % 2){
            return {borderBottom:"1px solid black"};
        }
        return {borderBottom:"2px"};

    }

    return(
        <>
            <BootstrapTable
                striped
                hover
                condensed
                keyField='ФИО студента'
                data={ Grid.columns }
                columns={Grid.headers }
                rowStyle={rowStyle}
                cellEdit={ cellEditFactory({ mode: 'click' }) }
            >
                Error 505!
            </BootstrapTable>
        </>
    )
}
