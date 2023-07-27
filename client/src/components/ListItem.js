import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import {useState} from "react";
import Modal from "./Modal";

const ListItem = ({task}) => {
    const [showModal, setShowModal] = useState(false)


  return (

    <li className='list-item'>
        <div className='info-container'>
            <TickIcon/>
            <p className='task-title'>{task.title}</p>
            <ProgressBar/>

            <div className="button-container">
                <button className='edit' onClick={()=>setShowModal(true)}>Edit</button>
                <button className='delete'>Delete</button>

            </div>
        </div>
        {showModal &&  <Modal mode={'edit'} setShowModal={setShowModal} task={task}/>}
    </li>
  );
}

export default ListItem;
