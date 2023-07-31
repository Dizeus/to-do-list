import {useState} from "react";
import Modal from "./Modal";

const ListHeader = ({updateTask, createTask, listName, removeCookies}) => {

	const [showModal, setShowModal] = useState(false)
	const signOut = () =>{
		removeCookies('Email')
		removeCookies('AuthToken')
		window.location.reload()
	}
  return (
    <div className="list-header">
		<h1>{listName}</h1>
		<div className="button-container">
			<button className='create' onClick={()=>setShowModal(true)}>ADD NEW</button>
			<button className="signout" onClick={signOut}>Sign out</button>
		</div>
		{showModal && <Modal updateTask={updateTask} createTask={createTask} mode={'create'} setShowModal={setShowModal} task={{}}/>}
    </div>
  );
}

export default ListHeader;
