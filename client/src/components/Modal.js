import {useState} from "react";
import {Formik} from "formik";
import {useCookies} from "react-cookie";

const Modal = ({updateTask, getData, createTask, mode, task, setShowModal}) => {

    const [cookies, setCookies, removeCookies] = useCookies(null)

    const editMode = mode ==='edit'

    const editTask = async (data) => {
        await updateTask(data, task.id)
        await getData(task.user_email)
        setShowModal(false)
    }
    const createTask1 = async (data)=>{
        await createTask(data)
        await getData(cookies.Email)
        setShowModal(false)
    }
  return (
      <div className="overlay">
          <div className="modal">
              <div className="form-title-container">
                  <h3>Let's {mode} your task</h3>
                  <button onClick={() => setShowModal(false)}>X</button>
              </div>
              <Formik
                  initialValues={{user_email:cookies.Email, title: editMode?task.title:'', progress: editMode?task.progress:'', date: editMode?task.date:new Date()}}
                  validate={values => {
                      const errors = {};

                      // if (!values.aboutMe) {
                      //     errors.aboutMe = 'Required';
                      // } else if (!values.fullName) {
                      //     errors.aboutMe = 'Required';
                      // }else if (!values.lookingForAJobDescription) {
                      //     errors.lookingForAJobDescription = 'Required';
                      // }

                      return errors;

                  }}
                  onSubmit={(values, { setSubmitting, setStatus }) => {
                      editMode? editTask(values): createTask1(values);
                      setSubmitting(false);
                  }}
              >
                  {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        status,
                        /* and other goodies */
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

