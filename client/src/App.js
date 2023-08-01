
import Auth from "./components/Auth";
import {useCookies} from "react-cookie";
import Content from "./components/Content";


const App = () => {

    const [cookies, setCookies, removeCookies] = useCookies(null)

    const authToken = cookies.AuthToken
    const user_email = cookies.Email

  return (
    <div className="app">
        {authToken?<Content removeCookies={removeCookies} userEmail={user_email}/>:<Auth/>}
    </div>
  );
}

export default App;
