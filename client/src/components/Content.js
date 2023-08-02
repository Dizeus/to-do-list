import ListHeader from './ListHeader';
import {useEffect, useState} from "react";
import ListItem from "./ListItem";
import {connect} from "react-redux";
import {createTask, deleteTask, getData, updateTask} from "../redux/app-reducer";


const Content = ({deleteTask, updateTask, tasks, getData, createTask, userEmail, removeCookies}) => {

    const askData = ()=>{
        getData(userEmail)
    }
    useEffect(()=>{
        askData()
    },[])

    return (
            <>
                <ListHeader updateTask={updateTask} getData={getData} removeCookies={removeCookies} createTask={createTask} listName={'To do today'}/>
                {tasks?.map((task)=><ListItem deleteTask={deleteTask} updateTask={updateTask} getData={getData} createTask={createTask} task={task} key={task.id}/>)}
            </>
    );
}

const mapStateToProps = (state)=>({
    tasks: state.app.tasks
})
export default connect(mapStateToProps, {getData, createTask, updateTask, deleteTask})(Content)