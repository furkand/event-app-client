import React, {useContext, useState,useEffect} from "react"
import SingleEvent from "../components/Event/SingleEvent"

function BookingPage(props){
    const [bookings, setBookings] = useState([])
    const [errors,setErrors] = useState([])
    const [loading,setLoading] = useState([])
    const fetchData = async ()=>{
        const requestBody = {
            query: `
            query{
                bookings{
                    _id
                    event{
                        price
                        title
                        date
                        description
                        _id
                    }
                    user{
                        _id
                    }
                    createdAt
                }
            }
        `
        }  
        try{
            const data = await fetch("https://furkan-event-app.herokuapp.com/graphql", {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                }
            })
            const prettyData = await data.json()
            if(data.status !==200 && data.status !== 201){
                const errorArray = prettyData.errors.map(error=>{
                    return {error: error.message}
                })
                setLoading(false)
                setErrors([...errorArray])
                
                throw new Error("Something went wrong!")
            }
            if(prettyData.data.bookings){
                console.log(prettyData.data.bookings)
                setBookings(prettyData.data.bookings)
                setLoading(false)
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
    return (
        <div className="booking-container">
            {bookings.map((item)=>(
                <div className="single-booking">
                    <SingleEvent key={item._id} event={item.event}/>
                </div>
            ))}
        </div>
    )
}

export default BookingPage;