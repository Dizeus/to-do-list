import {useState} from "react";
import Modal from "./Modal";
import {createTask, updateTask} from "../redux/app-reducer";

const ListHeader = ({updateTask, getData, createTask, listName}) => {

	const [showModal, setShowModal] = useState(false);
	const signOut = () =>{
		console.log("signOut")
	}
  return (
    <div className="list-header">
		<h1>{listName}</h1>
		<div className="button-container">
			<button className='create' onClick={()=>setShowModal(true)}>ADD NEW</button>
			<button className="signout" onClick={signOut}>Sign out</button>
		</div>
		{showModal && <Modal updateTask={updateTask} getData={getData} createTask={createTask} mode={'create'} setShowModal={setShowModal} task={{}}/>}
    </div>
  );
}

export default ListHeader;
