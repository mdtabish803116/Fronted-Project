import {Navbar} from "./components/Navbar";
import {Routes , Route} from "react-router-dom";
import {Home} from "./components/Home"
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {loginUserSuccess , logOut} from "./Redux/Login/action";
import {useDispatch} from "react-redux";
import React from "react";
function App() {
      const dispatch = useDispatch();
     const userAuth = JSON.parse(localStorage.getItem("thunkUserAuth"));
      React.useEffect(()=> {
        if(userAuth === null){
          dispatch(logOut())
         }else {
       dispatch(loginUserSuccess(userAuth.loginUser))
         }
      } , [dispatch])
      
  return (
    <div>
           <Navbar />
           <Routes>
                <Route path = "/" element = {<Home/>}></Route>
                <Route path = "/register" element = {<Register/>}></Route>
                <Route path = "/login" element = {<Login/>}></Route>
           </Routes>
    </div>
  );
}

export default App;

