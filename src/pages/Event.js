import React, {useContext, useState,useEffect} from "react"
import SingleEvent from "../components/Event/SingleEvent"


function EventsPage(props){
const [events,setEvents]= useState([])
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
        console.log(events)
        setEvents(prettyData.data.events)
    }catch(err){
        console.log(err)
    }
}
  useEffect(()=>{
    fetchData()
  },[])

    return (
        <div style={{width:90+"%",margin:"auto",marginTop:150}}>
                {events.map(event=>
                    (
                        <SingleEvent event={event}/>
                    )
                )}
            </div>
    )
}

export default EventsPage;