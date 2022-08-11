import {Navbar} from "./components/Navbar";
import {Routes , Route} from "react-router-dom";
import {Home} from "./components/Home"
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {FlightList} from "./components/FlightList";
import {Payment} from "./components/Payment";
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
            <div style = {{
                  width : "40%",
                  margin : "auto",
                  paddingTop : "50px",
            }}>
               <img style = {{display : "block" , margin : "auto" , borderRadius : "50%"}}src = "aeroplane.jpg"/>
            </div>
          
           <Routes>
                <Route path = "/" element = {<Home/>}></Route>
                <Route path = "/register" element = {<Register/>}></Route>
                <Route path = "/login" element = {<Login/>}></Route>
                <Route path = "/flightlist" element = {<FlightList/>}></Route>
                <Route path = "/payment/:id" element = {<Payment/>}></Route>
           </Routes>
    </div>
  );
}

export default App;

