import React, {useContext, useState,useEffect} from "react"
import SingleBooking from "../components/SingleBooking"

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
        <React.Fragment>
        {loading ? (<div class="ui segment loading-container">
        <div class="ui active dimmer -loading-content">
            <div class="ui text loader">Loading</div>
        </div>
        <p></p>
        </div> 
        ): (<div className="booking-container">
        {bookings.map((item)=>(
            <div key={item._id} className="single-booking">
                <SingleBooking key={item._id} id={item._id} event={item.event}/>
            </div>
        ))}
    </div>)}
    </React.Fragment>
    )
}

export default BookingPage;