import {useState} from "react";

const Modal = ({mode,setShowModal,task}) => {

    const [data, setData] = useState({
        user_email: task.user_email,
        title: task.title,
        progress: task.progress,
        date: task.date
    })

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }
  return (
      <div className="overlay">
          <div className="modal">
              <div className="form-title-container">
                  <h3>Let's {mode} your task</h3>
                  <button onClick={() => setShowModal(false)}>X</button>
              </div>

              <form>
                  <input
                      required
                      maxLength={30}
                      placeholder=" Your task goes here"
                      name="title"
                      value={data.title}
                      onChange={handleChange}
                  />
                  <br/>
                  <label htmlFor="range">Drag to select your current progress</label>
                  <input
                      required
                      type="range"
                      id="range"
                      min="0"
                      max="100"
                      name="progress"
                      value={data.progress}
                      onChange={handleChange}
                  />
                  <input className={mode} type="submit" onClick={editData}/>
              </form>

          </div>
      </div>
  );
}

export default Modal;

