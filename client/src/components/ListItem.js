import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import {useState} from "react";
import Modal from "./Modal";
import {deleteTask, updateTask} from "../redux/app-reducer";

const ListItem = ({deleteTask, updateTask, getData, createTask,task}) => {
    const [showModal, setShowModal] = useState(false)

    const onClickDelete = async()=>{
        await deleteTask(task.id)
        getData()
    }
  return (

    <li className='list-item'>
        <div className='info-container'>
            <TickIcon/>
            <p className='task-title'>{task.title}</p>
            <ProgressBar/>

            <div className="button-container">
                <button className='edit' onClick={()=>setShowModal(true)}>Edit</button>
                <button className='delete' onClick={onClickDelete}>Delete</button>

            </div>
        </div>
        {showModal &&  <Modal updateTask={updateTask} getData={getData} createTask={createTask.bind(this)} mode={'edit'} setShowModal={setShowModal} task={task}/>}
    </li>
  );
}

export default ListItem;
