import {Formik} from "formik";
import {useCookies} from "react-cookie";

const Modal = ({updateTask, createTask, mode, task, setShowModal}) => {

    const [cookies, setCookies, removeCookies] = useCookies(null)

    const editMode = mode ==='edit'

  return (
      <div className="overlay">
          <div className="modal">
              <div className="form-title-container">
                  <h3>Let's {mode} your task</h3>
                  <button onClick={() => setShowModal(false)}>X</button>
              </div>
              <Formik
                  initialValues={{user_email:cookies.Email, title: editMode?task.title:'', progress: editMode?task.progress:'0', date: editMode?task.date:new Date()}}
                  onSubmit={(values, { setSubmitting, setStatus }) => {
                      editMode? updateTask(values, task.id): createTask(values);
                      setShowModal(false)
                      setSubmitting(false);
                  }}
              >
                  {({
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        status,
                    }) => (
                      <form onSubmit={handleSubmit}>
                          <input
                              required
                              maxLength={30}
                              placeholder=" Your task goes here"
                              name="title"
                              onBlur={handleBlur}
                              value={values.title}
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
                              value={values.progress}
                              onChange={handleChange}
                          />
                          <input className={mode} type="submit" disabled={isSubmitting}/>
                      </form>
                  )}
              </Formik>
          </div>
      </div>
  );
}

export default Modal;

