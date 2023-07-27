import ListHeader from './components/ListHeader';
import {useEffect, useState} from "react";
import ListItem from "./components/ListItem";


const App = () => {

    const [tasks, setTasks] = useState(null)

    const getData = async () =>{
        const userEmail = 'illia@gmail.com';
        try {
            const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
            const todos = await response.json();
            setTasks(todos)
        }catch (err){
            console.error(err)
        }
    }
    useEffect(()=>getData,[])

    const sortedTasks = tasks?.sort((a,b)=>new Date(a.date) - new Date(b.date))


  return (
    <div className="app">
		<ListHeader listName={'Holliday tick list'}/>
        {sortedTasks?.map((task)=><ListItem task={task} key={task.id}/>)}
    </div>
  );
}

export default App;
