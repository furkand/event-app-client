import React, {useContext, useState,useEffect} from "react"
import SingleEvent from "../../components/Event/SingleEvent"
import {Link} from "react-router-dom"
import {AuthContext} from "../../context/auth-context"
import  "./event.css"



function EventsPage(props){
const [events,setEvents]= useState([])
const [bookings,setBookings]= useState([])
const [errors,setErrors]= useState([])
const [loading, setLoading] = useState(true)
const {user} = useContext(AuthContext);
const fetchBookings = async ()=>{
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
        if(prettyData.data){
            const data = prettyData.data.bookings.filter(item=>{
                return item.user._id === user.userId
            })
            setBookings(data)
            setLoading(false)
        }
    }catch(err){
        console.log(err)
    }
}
const fetchData = async ()=>{
    const requestBody = {
        query: `
        query{
            events{
                _id
                title
                description
                price
                date
                creator{
                    _id
                    email
                }
            }
        }
    `
    }
    try{
        const data = await fetch("https://furkan-event-app.herokuapp.com/graphql", {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers:{
                    "Content-Type" : "application/json"
                }
            })
        const prettyData = await data.json()
        setEvents(prettyData.data.events)
        if(user){
            fetchBookings()
        }else{
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
            {loading ? (<div className="ui segment loading-container">
                        <div className="ui active dimmer -loading-content">
                            <div className="ui text loader">Loading</div>
                        </div>
                        <p></p>
                        </div> 
                        ): ( <div className="events-container">
                        {user && (<div className="create-button-container">
                                  <Link className="createEvent" to="events/create-event">Create Event</Link>
                                      </div>)}
                          {events.map(event=>
                              (
                                  <SingleEvent  booked={bookings} key={event._id} event={event} />
                              )
                          )}
                      </div>)}
           
        </React.Fragment>
    )
}

export default EventsPage;