import React, {useContext, useState,useEffect} from "react"
import SingleEvent from "../../components/Event/SingleEvent"
import {Link} from "react-router-dom"
import {AuthContext} from "../../context/auth-context"
import  "./event.css"



function EventsPage(props){
const [events,setEvents]= useState([])
const {user} = useContext(AuthContext);
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
    }catch(err){
        console.log(err)
    }
}
  useEffect(()=>{
    fetchData()
  },[])
    return (
        <React.Fragment>
            
            <div className="events-container">
              {user && (<div className="create-button-container">
                        <Link className="createEvent" to="events/create-event">Create Event</Link>
                            </div>)}
                {events.map(event=>
                    (
                        <SingleEvent  key={event._id} event={event} />
                    )
                )}
            </div>
        </React.Fragment>
    )
}

export default EventsPage;