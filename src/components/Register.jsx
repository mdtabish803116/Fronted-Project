import React from "react";
import { Input , Button , Center} from '@chakra-ui/react';
import {getRegister} from "./../Redux/Register/action";
import {useDispatch , useSelector} from "react-redux";
import { Spinner} from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";
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

export const Register = () =>{
      const { isOpen, onOpen, onClose } = useDisclosure();
      const cancelRef = React.useRef();

    const [name , setName] = React.useState('');
    const [nameError , setNameError] = React.useState(false);
    const [email , setEmail] = React.useState('');
    const [emailError , setEmailError] = React.useState(false);
    const [password , setPassword] = React.useState('');
    const [passwordError , setPasswordError] = React.useState(false);
    const [mustPasswordError , setMustPasswordError] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading , error , user} = useSelector((state) => state.registerUser)
    const {auth} = useSelector((state) => state.loginUser)

     const payload = {
        name : name,
        email : email,
        password : password,

     }

//  const getRegisterData = async() => {  
//       try {  
//             dispatch(registerUserLoading())
//       let res  =   await fetch("https://masai-api-mocker.herokuapp.com/auth/register" , {
//            method : "POST",
//            body : JSON.stringify(payload),
//            headers : {
//                  "Content-Type" : "application/json",
//            }
//          });
//          let data = await res.json();
//         dispatch(registerUserSuccess(data));
//           console.log(data)
//     }catch(error){  
//          dispatch(registerUserError())
//     }
// }


const handleSubmit = (e) => {
      e.preventDefault()
      if(email === ""){
            setEmailError(true);
       }else {
            setEmailError(false);
       }

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

       if(name === ""){
              setNameError(true)
       }else {
             setNameError(false)
       }

     

  if(name !== "" && email !== "" && password !== "" && password.length >= 10){  
      dispatch(getRegister(payload))
      onOpen()
  }
}

const handleClose = () => {
      if(user.message === "Registration Success"){
              onClose();
              navigate("/login")
      }else {

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

if(error){
      return(
            <h1 
                textalign = "center" 
                margintop = "200px"
                color = "red"
            >Something Went Wrong...</h1>
      )
}
    

    return auth?(<h1 style = {{
            marginTop : "200px",
            color : "green",
             fontSize : "30px",
              textAlign : "center"
    }}>My Account Details Here</h1>):(
        <>
          <form style = {{
               width : "50%",
               margin :"auto",
               marginTop : "50px"
          }}>
                 <Input mt = "40px" variant = "outline" type = "text" value = {name} onChange = {(e) => setName(e.target.value)} placeholder = "Enter Name" border = "2px solid black"/> 
                 {nameError && <ErrorDiv>We need your name - it's nicer that way</ErrorDiv>}
                 
                 <Input mt = "40px" variant = "outline" type = "email" value = {email} onChange = {(e) => setEmail(e.target.value)} placeholder = "Enter Email" border = "2px solid black"/> 
                 {emailError && <ErrorDiv>Oops! You need to type your Email</ErrorDiv>}
                
                 <Input mt = "20px" variant = "outline" type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder = "Enter Password" border = "2px solid black"/> 
                 {mustPasswordError && <ErrorDiv>Must be 10 or more Characters</ErrorDiv>}
                 {passwordError && <ErrorDiv>Hey , We need a password here</ErrorDiv>}
                  
                  <Center>
                    <Button type = "submit" mt = "50px" onClick = {handleSubmit}>REGISTER</Button>
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
                        user.message ===  "Registration Success"?("Registration Succesfull"):(" user already exists")
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
  
