import ListHeader from './components/ListHeader';
import {useEffect, useState} from "react";
import ListItem from "./components/ListItem";
import {connect} from "react-redux";
import {createTask, deleteTask, getData, updateTask} from "./redux/app-reducer";
import Auth from "./components/Auth";
import {useCookies} from "react-cookie";


const App = ({deleteTask, updateTask, tasks, getData, createTask}) => {


    const [cookies, setCookies, removeCookies] = useCookies(null)



    const authToken = cookies.AuthToken
    const user_email = cookies.Email

    useEffect(()=>loadData,[])
    const loadData = () =>{
        authToken && getData(user_email)
    }
    const sortedTasks = tasks?.sort((a,b)=>new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
        {!authToken && <Auth/>}
        {authToken && <><ListHeader updateTask={updateTask} getData={getData} createTask={createTask} listName={'Holliday tick list'}/>
            {sortedTasks?.map((task)=><ListItem deleteTask={deleteTask} updateTask={updateTask} getData={getData} createTask={createTask} task={task} key={task.id}/>)}</>}

    </div>
  );
}

const mapStateToProps = (state)=>({
    tasks: state.app.tasks
})
export default connect(mapStateToProps, {getData, createTask, updateTask, deleteTask})(App);
