import React from "react";
import "../styles/FlightList.css";
import { Button } from '@chakra-ui/react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


export function FlightList(){

    const [flightData , setFlightData] = React.useState([])

      let flightDetails = JSON.parse(localStorage.getItem('flightDetails'));

      const {auth} = useSelector((state) => state.loginUser);

      const navigate = useNavigate()

         function getFlightDetails(){
               if(flightDetails){  
               fetch(` http://localhost:8080/flights?source=${flightDetails.source}&destination=${flightDetails.destination}`)
                .then((res) => res.json())
                .then((res) => {
                      setFlightData(res)
                }).catch((err) => {
                       console.log(err)
                })

               }
         }

        React.useEffect(()=> {
            getFlightDetails()
        }, [])


          function handleBook(){
                auth?navigate("/payment"):navigate("/login")
          }

  if(flightData.length == 0){
        return (
              <div style = {{fonWeight : "600" , fontSize : "24px" , textAlign : "center" , marginTop : "30px"}}>No Such Flight Found</div>
        )
  }

        return(
             <div style = {{width : "60%" , margin : "auto" , marginTop: "50px"}}>

                    <div style = {{fontWeight : "600" , fontSize : "30px" , textAlign : "center" , marginBottom : "20px"}}>{`${flightData.length} flight found`}</div>
                 
                   <table id = "flightTable" style = {{width : "100%"}}>
                          <thead>
                                 <tr>
                                       <th>Serial No.</th>
                                       <th>Flight Name</th>
                                       <th>Source</th>
                                       <th>Destination</th>
                                       <th>Arrival</th>
                                       <th>Departure</th>
                                       <th>Price</th>
                                       <th>Booking</th>
                                 </tr>
                          </thead>
                          <tbody>
                                 {
                                    flightData?.map((data , index)=> (
                                            <tr key = {index}>
                                                  <td>{index + 1}</td>
                                                  <td>{data.name}</td>
                                                  <td>{data.source}</td>
                                                  <td>{data.destination}</td>
                                                  <td>{data.arrival}</td>
                                                  <td>{data.departure}</td>
                                                  <td>{`Rs. ${data.price}`}</td>
                                                  <td>
                                                        <Button onClick = {handleBook}>Book Now</Button>
                                                  </td>
                                            </tr>
                                    )) 
                                 }
                          </tbody>
                   </table>
                
             </div>
        )
}