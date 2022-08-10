import {Flex, Box } from '@chakra-ui/react';
import {Link} from "react-router-dom";
import {useSelector , useDispatch} from "react-redux";
import {logOut} from "./../Redux/Login/action";
import jwt_decode from "jwt-decode";
import React from "react";

export const Navbar = () => {
    const SECRET = "tyruyqaguytughjgh";
       const dispatch = useDispatch();
       const {auth } = useSelector((state) => state.loginUser);
       const [user , setUser] = React.useState({})

       let thunkUserAuth = localStorage.getItem('thunkUserAuth');

        let token = thunkUserAuth.loginUser.token

       React.useEffect(() => {

        if (token) {
          const decoded_user = jwt_decode(token, SECRET);
          const { id, name, email} = decoded_user
          setUser({
            id, name, email
          })


        } else {
          console.log("token not found")
        }
      }, [token])


console.log(user.name)

      return(
        <Flex className = "flex"  
              height = "60px" 
              align = "center"
              bg = "teal"
              justify = "space-around"
              color = "white"
              fontSize = "20px"
              >
              <Box>
                     <Link to = "/">Home</Link>
              </Box>
              <Box>
                     <Link to = "/register">{auth?(user.name):("Register")}</Link>
              </Box>
              <Box>
                     <Link to = "/login" onClick = {() => dispatch(logOut())}>{auth?("LogOut"):("Login")}</Link>
              </Box>
      </Flex>
      )
}