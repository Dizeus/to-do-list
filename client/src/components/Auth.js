import {useState} from "react";
import {Formik} from "formik";
import {useCookies} from "react-cookie";

const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
   const [isLogInForm, setIsLoginForm] = useState(true)

    const viewLogin = (val) =>{
       setIsLoginForm(val)
    }
    const onClickSubmit = async (values, endpoint) => {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(  {user_email: values.email, password: values.password})
        })
        const data = await response.json();
        console.log(data)
        if(data.detail){
            //setError
        }else{
            setCookie('Email', data.user_email)
            setCookie('AuthToken', data.token)
        }
        window.location.reload()
    }


  return (
      <div className="auth-container">
          <div className="auth-container-box">
              <Formik
                  initialValues={{email: '', password:'', confirmPassword:''}}
                  validate={values => {
                      const errors = {};

                      if (!values.aboutMe) {
                           errors.email = 'Required';
                      } else if (!values.password) {
                           errors.aboutMe = 'Required';
                      }else if (!values.confirmPassword) {
                          errors.lookingForAJobDescription = 'Required';
                      }

                      return errors;

                  }}
                  onSubmit={(values, { setSubmitting, setStatus }) => {
                      onClickSubmit(values, isLogInForm? 'login': 'signup');
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
                          <h2>{isLogInForm  ? 'Please log in' : 'Please sign up!'}</h2>
                          <input
                              required
                              type="email"
                              name='email'
                              placeholder="email"
                              onBlur={handleBlur}
                              value={values.title}
                              onChange={handleChange}
                          />
                          <input
                              required
                              type="password"
                              name='password'
                              placeholder="password"
                              onBlur={handleBlur}
                              value={values.title}
                              onChange={handleChange}
                          />
                          {!isLogInForm && <input
                              required
                              type="password"
                              name='confirmPassword'
                              placeholder="confirm password"
                              onBlur={handleBlur}
                              value={values.title}
                              onChange={handleChange}
                          />}
                          <input type="submit" className="create" disabled={isSubmitting}/>
                      </form>
                  )}
              </Formik>
              <div className="auth-options">
                  <button
                      onClick={() => viewLogin(false)}
                      style={{backgroundColor : !isLogInForm ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
                  >Sign Up</button>
                  <button
                      onClick={() => viewLogin(true)}
                      style={{backgroundColor : isLogInForm ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
                  >Login</button>
              </div>

          </div>
      </div>
  )
}

export default Auth;
