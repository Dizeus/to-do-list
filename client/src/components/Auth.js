import {useState} from "react";
import {Formik} from "formik";
import {useCookies} from "react-cookie";
import {auth} from "../redux/app-reducer";

const Auth = () => {

    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [isLogInForm, setIsLoginForm] = useState(true)
    const [formError, setFormError] = useState(null)
    const viewLogin = (val) =>{
       setIsLoginForm(val)
    }
    const onClickSubmit = async (values, endpoint) => {
        const data = await auth(values, endpoint)
        if(data.detail){
            setFormError(data.detail)
        }else{
            setCookie('Email', data.user_email)
            setCookie('AuthToken', data.token)
            window.location.reload()
        }

    }


  return (
      <div className="auth-container">
          <div className="auth-container-box">
              <Formik
                  initialValues={{email: '', password:'', confirmPassword:''}}
                  validate={values => {
                      const errors = {};
                      if (!isLogInForm && values.password != values.confirmPassword) {
                            errors.password = 'Passwords should be identical';
                      }else if(!isLogInForm && values.password === values.confirmPassword){
                          delete errors.password
                      }
                      return errors;

                  }}
                  onSubmit={(values, { setSubmitting, setStatus }) => {
                      onClickSubmit(values, isLogInForm ? 'login' : 'signup');
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
                          {formError && <div className='error'>{formError}</div>}
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
                          <div className='error'>{errors.password && touched.confirmPassword && errors.password}</div>
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
