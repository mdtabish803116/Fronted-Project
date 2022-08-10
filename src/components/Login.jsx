import React from "react";
import { Input , Button , Center} from '@chakra-ui/react';
import {useDispatch , useSelector} from "react-redux";
import { Spinner} from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";
import {getLogin} from "../Redux/Login/action";
import Styled from "styled-components";

import {
     AlertDialog,
     AlertDialogBody,
     AlertDialogFooter,
     AlertDialogContent,
     AlertDialogOverlay,
     useDisclosure 
   } from '@chakra-ui/react'

const ErrorDiv = Styled.div`
color : red;
font-size : 15px;
font-weight : bold;
`

export const Login = () =>{
     const { isOpen, onOpen, onClose } = useDisclosure();
     const cancelRef = React.useRef();

     const [password , setPassword] = React.useState('');
     const [passwordError , setPasswordError] = React.useState(false);
     const [mustPasswordError , setMustPasswordError] = React.useState(false);
     const [email , setEmail] = React.useState('');
    const [emailError , setEmailError] = React.useState(false);

     const dispatch = useDispatch();
     const navigate = useNavigate();
     const {loading , error , loginUser} = useSelector((state) => state.loginUser)

     const payload = {
           email : email,
           password : password,
        
     }

     const handleSubmit = (e) => {
          e.preventDefault()

          if(password === ""){
            setPasswordError(true);
      }else {
           setPasswordError(false);
      }

      if(password !== "" && password.length < 10){
             setMustPasswordError(true);
       }else {
            setMustPasswordError(false);
       }

       if(email === ""){
            setEmailError(true);
     }else {
             setEmailError(false);
     }
          
        
         if(password !== "" && email !== "" && password.length >= 10){  
          onOpen()
          dispatch(getLogin(payload))
         }
    }

    const handleClose = () => {
     if(loginUser.token){
             onClose();
             navigate("/")
     }else{
           onClose()
     }
}

    
     
     if(loading){
          return(
                <Center mt = "250px">
                        <Spinner thickness='10px'
                                 speed='1.5s'
                                 emptyColor='green.200'
                                 color='blue.500'
                                 size='xl'/>
                </Center>
                
          )
    }
    
//     if(error){
//           return(
//                 <h1 style = {{
//                     textAlign : "center" ,
//                     marginTop : "200px",
//                     color : "red",
//                     fontSize : "30px"
//                 }}
                   
//                 >Something Went Wrong...</h1>
//           )
//     }
        
     
     return(
          <>
          <form style = {{
               width : "50%",
               margin :"auto",
               marginTop : "50px"
          }}>
                  <Input mt = "40px" variant = "outline" type = "email" value = {email} onChange = {(e) => setEmail(e.target.value)} placeholder = "Enter Email" border = "2px solid black"/> 
                 {emailError && <ErrorDiv>Oops! You need to type your Email</ErrorDiv>}
                
                 <Input mt = "20px" variant = "outline" type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder = "Enter Password" border = "2px solid black"/> 
                 {mustPasswordError && <ErrorDiv>Must be 10 or more Characters</ErrorDiv>}
                 {passwordError && <ErrorDiv>Hey , We need a password here</ErrorDiv>}
                  
                  <Center>
                    <Button type = "submit" mt = "20px" onClick = {handleSubmit}>LOGIN</Button>
                  </Center>
                  <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        mt = "300px"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody>
                   {
                        loginUser.token?("You have Succesfully Loged in"):("Invalid Login Credentials")
                   }
              
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme='red' onClick={handleClose} ml={3}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
          </form>
       </>
    )
 
}
     