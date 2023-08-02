import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import {useState} from "react";
import Modal from "./Modal";

const ListItem = ({deleteTask, updateTask, getData, createTask,task}) => {

    const [showModal, setShowModal] = useState(false)

    const onClickDelete = async()=>{
        await deleteTask(task.id, task.user_email)
    }
  return (

    <li className='list-item'>
        <div className='info-container'>
            <div className='tick-title-container'>
                <TickIcon/>
                <p className='task-title'>{task.title}</p>
            </div>
            <ProgressBar progress={task.progress}/>
            <div className="button-container button-container-item">
                <button className='edit' onClick={()=>setShowModal(true)}>Edit</button>
                <button className='delete' onClick={onClickDelete}>Delete</button>

            </div>
        </div>
        {showModal &&  <Modal updateTask={updateTask} createTask={createTask} mode={'edit'} setShowModal={setShowModal} task={task}/>}
    </li>
  );
}

export default ListItem;
