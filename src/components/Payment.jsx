import { Box , Button , Input , Text , Center , OrderedList , ListItem} from '@chakra-ui/react';
import React from "react";
import {useParams , useNavigate} from "react-router-dom";

import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
  } from '@chakra-ui/react'


export function Payment(){
      const [passenger , setPassenger] = React.useState("");
      const [passengerError , setPassengerError] = React.useState(false);
      const [age , setAge] = React.useState("");
      const [ageError , setAgeError] = React.useState(false);
      const [cardNumber , setCardNumber] = React.useState("");
      const [cardNumberError , setCardNumberError] = React.useState(false);
      const [emptyCardNumberError , setEmptyCardNumberError] = React.useState(false);
      const [expiryDate , setExpiryDate] = React.useState("");
      const [expiryDateError , setExpiryDateError] = React.useState(false);
      const [cvvValue , setCvvValue] = React.useState("");
      const [cvvValueError , setCvvValueError] = React.useState(false);
      const [couponValue , setCouponValue] = React.useState("");
      const [paidAmount , setPaidAmount] = React.useState("");
      const [validCoupon , setValidCoupon] = React.useState(false);
      const [couponError , setCouponError] = React.useState(false)

      const { isOpen, onOpen, onClose } = useDisclosure()
      const btnRef = React.useRef()

      const navigate = useNavigate()
    

      const params = useParams();

      const [bookingFlight , setBookingFlight] = React.useState({});


      function getFlight(){
          fetch(`${process.env.REACT_APP_BASE_URL}/flights/${params.id}`)
          .then((res) => res.json())
          .then((res) => {
               setBookingFlight(res)
               setPaidAmount(res.price)
          }).catch((err)=> {
               console.log(err);
          })
      }

      React.useEffect(()=> {
          getFlight()
      } , [params.id])

      console.log(bookingFlight)

  function handlePayment(){
      if(passenger === ""){setPassengerError(true)}else{setPassengerError(false)}
      if(age === ""){setAgeError(true)}else{setAgeError(false)}
      if(cardNumber === ""){setEmptyCardNumberError(true)}else{setEmptyCardNumberError(false)}
      if(cardNumber !== "" && cardNumber.toString().length !== 16){setCardNumberError(true)}else{setCardNumberError(false)}
      if(expiryDate === ""){setExpiryDateError(true)}else{setExpiryDateError(false)}
      if(cvvValue === ""){setCvvValueError(true)}else{setCvvValueError(false)}
    
      if(passenger !== "" && age !== "" && cardNumber !== "" && expiryDate !== "" && cvvValue !== "" && cardNumber.toString().length >= 16){
                alert("You have succesfully booked the Ticket");
                navigate("/")
      }
    
    }

    function applyCoupon(){
         if(couponValue === ""){setCouponError(true)}else{setCouponError(false)}

         if(couponValue !== ""){
                console.log(couponValue);
            for(let i = 0; i <  bookingFlight.offers.length; i++){
                   console.log(bookingFlight.offers[i].code)
                 if(couponValue === bookingFlight.offers[i].code){
                      setValidCoupon(true);
                      setPaidAmount(bookingFlight.offers[i].price)
                      break;
                 }
            }

            
                validCoupon?alert("You have applied the coupon successfully"):alert("Please provide the valid coupon")
              
               
         }

    }


     return(
          <>
            <Text style = {{textAlign : "center" , fontSize : "23px" , marginTop : "20px" , fontWeight : "600"}}>{`Amount to be paid :  Rs. ${paidAmount}`}</Text>
         <Box  width = "40%"  m = "auto"  mt = "40px">
                 <Input variant = "outline" type = "text" value = {passenger} placeholder = "Passenger Name" onChange = {(e) => setPassenger(e.target.value)}  border = "2px solid black"/> 
                 {passengerError && <Text color = "red" fontWeight = "bold">Oops! You need to provide passenger name</Text>}
         
                 <Input mt = "20px" variant = "outline" type = "number" value = {age} placeholder = "Enter Age" onChange = {(e) => setAge(e.target.value)}  border = "2px solid black"/> 
                 {ageError && <Text color = "red" fontWeight = "bold"> Please enter age !</Text>}
         

                 <Input mt = "20px" variant = "outline" type = "number" value = {cardNumber} placeholder = "Enter card number" onChange = {(e) => setCardNumber(e.target.value)}  border = "2px solid black"/> 
                 {emptyCardNumberError && <Text color = "red" fontWeight = "bold"> Please provide card number !</Text>}
                 {cardNumberError && <Text color = "red" fontWeight = "bold"> Card digit must be of 16 !</Text>}
         
                 <Input mt = "20px" variant = "outline" type = "text" value = {expiryDate} placeholder = "Enter card expiry date" onChange = {(e) => setExpiryDate(e.target.value)}  border = "2px solid black"/> 
                 {expiryDateError && <Text color = "red" fontWeight = "bold"> Please provide expiry date !</Text>}
         
                 <Input mt = "20px" variant = "outline" type = "number" value = {cvvValue} placeholder = "Enter card Cvv" onChange = {(e) => setCvvValue(e.target.value)}  border = "2px solid black"/> 
                 {cvvValueError && <Text color = "red" fontWeight = "bold"> Please Enter Card Cvv !</Text>}
                 
                  <Box display = "flex" mt = "30px" justifyContent="space-between">
                        <Button ref={btnRef} bg  = "teal" color = "grey" onClick = {onOpen}>Offers</Button>
                        <Box w = "60%">
                        <Input type = "text" placeholder = "Apply code" value = {couponValue} onChange = {(e)=> setCouponValue(e.target.value)} w = "100%"/>
                        {couponError && <Text color = "red"  fontWeight = "bold">You need to provide coupon</Text>}
                        </Box>
                        <Button bg  = "teal" color = "grey" onClick = {applyCoupon}>Apply</Button>
            
                  </Box>

                  <Center>
                         <Button w = "30%" bg  = "teal" color = "grey" mt = "40px" marginBottom = "50px" onClick = {handlePayment}>Pay</Button>
                  </Center>
                  <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
    
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody mt = "40px">
                <OrderedList>
                         {
                             bookingFlight.offers?.map((data , index)=> (
                                  <ListItem key = {index + 1} style = {{"boxShadow": "rgba(0, 0, 0, 0.35) 0px 5px 15px" , "borderRadius" : "10px" , "marginTop" : "50px" , "padding" : "10px"}}>
                                    <Text>{`Get discount on booking ticket after ${data.duration} months`}</Text>
                                    <Text>{`Price : Rs. ${data.price}`}</Text>
                                    <Text>{`Coupon Code : ${data.code}`}</Text>
                                  </ListItem>
                             ))
                         }
                </OrderedList>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
         </Box>
         </>
     )
}