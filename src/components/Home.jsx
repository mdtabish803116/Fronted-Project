import {useSelector} from "react-redux";
import { Box ,Select , Input , Button , Center} from '@chakra-ui/react';
import {
      AlertDialog,
      AlertDialogBody,
      AlertDialogFooter,
      AlertDialogContent,
      AlertDialogOverlay,
      useDisclosure 
    } from '@chakra-ui/react'

import React from "react";
import {useNavigate} from "react-router-dom";

export const Home = () => {
      const {auth} = useSelector((state) => state.loginUser);
      const navigate = useNavigate()
      const { isOpen, onOpen, onClose } = useDisclosure();
      const cancelRef = React.useRef();

      const cityData = [
              "Patna", "Mumbai" , "Delhi" , "Kolkata" , "Hyderabad" , "Chennai"
      ]

      const [fromCity , setFromCity] = React.useState("");
      const [toCity , setToCity] = React.useState("");
      const [date , setDate] = React.useState("");

        console.log("fromCity" , fromCity);
        console.log("toCity" , toCity);
        console.log("date" , date);

        let currentDate = new Date()

        let month = currentDate.getMonth() + 1;
         month =  month <= 9?"0"+month:month
        let year = currentDate.getFullYear();
        let day = currentDate.getDate();
        day =  day <= 9?"0"+day:day

         let currentStringDate = year.toString()+month.toString()+day.toString()

         console.log(currentStringDate)

         console.log(date.split("-").join(""))

         let differenceDate = parseInt(date.split("-").join("")) - parseInt(currentStringDate)

   console.log(differenceDate)
         function handleClick(){
                 onOpen()
         }

         const handleClose = () => {
            (fromCity !== "" && toCity !== "" && date !== "" && differenceDate >= 0)?(
                  navigate("/flightlist")
            ):(onClose())
      }


      return(
        <Box w = "30%" m = "auto"> 
              <Box>
                  <Box fontWeight = "600" fontSize = "30px">From</Box>
              <Select  placeholder='Select City' onChange = {(e)=>setFromCity(e.target.value) }>
                      {
                          cityData.map((ele , index)=>(
                                <option key = {index} value = {ele}>{ele}</option>
                          ))
                      }
              </Select>
              </Box>

              <Box>
              <Box fontWeight = "600" fontSize = "30px">To</Box>
              <Select placeholder='Select City'onChange = {(e)=>setToCity(e.target.value) }>
                    {
                          cityData.map((ele , index)=>(
                                <option key = {index} value = {fromCity==ele?null:ele}>{fromCity==ele?null:ele}</option>
                          ))
                      }
              </Select>
              </Box>

              <Box mt = "20px">
                     <Input type = "date" onChange = {(e) => setDate(e.target.value)}/>
              </Box>
                <Center>
                  <Button  mt = "30px" onClick = {handleClick}>Search Flite</Button>
                </Center>

                <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>

            <AlertDialogBody>
                   {
                        (fromCity === "" || toCity === "" || date === "")?("Please Fill the details properly"):(differenceDate < 0)?("Past Travel not Possible"):("Press Ok to go to next Page")
                   }
              
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme='teal' onClick={handleClose} ml={3}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
            
    
        </Box>  
      )
}