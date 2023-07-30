import {useState} from "react";
import Modal from "./Modal";
import {createTask, updateTask} from "../redux/app-reducer";
import {useCookies} from "react-cookie";

const ListHeader = ({updateTask, getData, createTask, listName}) => {

	const [showModal, setShowModal] = useState(false)
	const [cookies, setCookie, removeCookie] = useCookies(null)
	const signOut = () =>{
		console.log("signOut")
		removeCookie('Email')
		removeCookie('AuthToken')
		window.location.reload()
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
