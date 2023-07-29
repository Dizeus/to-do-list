import ListHeader from './components/ListHeader';
import {useEffect, useState} from "react";
import ListItem from "./components/ListItem";
import {connect} from "react-redux";
import {createTask, deleteTask, getData, updateTask} from "./redux/app-reducer";


const App = ({deleteTask, updateTask, tasks, getData, createTask}) => {

    useEffect(()=>getData,[])

    const sortedTasks = tasks?.sort((a,b)=>new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
		<ListHeader updateTask={updateTask} getData={getData} createTask={createTask} listName={'Holliday tick list'}/>
        {sortedTasks?.map((task)=><ListItem deleteTask={deleteTask} updateTask={updateTask} getData={getData} createTask={createTask} task={task} key={task.id}/>)}
    </div>
  );
}

const mapStateToProps = (state)=>({
    tasks: state.app.tasks
})
export default connect(mapStateToProps, {getData, createTask, updateTask, deleteTask})(App);
