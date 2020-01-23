import React, {useContext, useState, useRef} from "react"
import AuthContext from "../../context/auth-context"
import SingleEvent from "../../components/Event/SingleEvent"

function CreateEvent(props){
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [event,setEvent] = useState()
    const user = useContext(AuthContext)
    const title = useRef()
    const date = useRef()
    const description = useRef()
    const price = useRef()
    const onSubmit = async (event)=>{
        event.preventDefault()
        setLoading(true)    
        const requestBody = {
            query:`
                mutation{
                    createEvent(
                        eventInput:{
                            title: "${title.current.value}"
                            description: "${description.current.value}"
                            price: ${price.current.value}
                            date:"${date.current.value}"
                        }
                    ){
                        title
                        description
                        price
                        date
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
                    'Authorization': 'Bearer ' + user.token
                }
            })
            const prettyData = await data.json()
            if(data.status !==200 && data.status !==201){
                setLoading(false)    
                const errorArray = prettyData.errors.map(error=>{
                    return {error: error.message}
                })
                setLoading(false)
                setErrors([...errorArray])
                
                throw new Error("Something went wrong!")
            }
            if(prettyData.data.createEvent){
                setEvent(prettyData.data.createEvent)
                setLoading(false)
            }
        }catch(err){

        }
    }
    const component = event ? (
        <div style={{display:"table",margin:"auto",marginTop:250}}>
            <h4 style={{fontSize:20, textAlign:"center"}} className="ui green header">Event is created succesfully!</h4>
            <SingleEvent key={event._id} event={event}/>
        </div>
    ) : (
        <div style={{width:40+"%",margin:"auto",marginTop:100}}>
            <h1>Create Event</h1>
            <form  className={loading? "ui form loading" : "ui form"  }onSubmit={onSubmit}>
                <div className="field">
                    <label>Title</label>
                    <input type="text" ref={title} name="title" placeholder="Title"/>
                </div>
                <div className="field">
                    <label>Description</label>
                    <input type="text" ref={description} name="description" placeholder="Description"/>
                </div>
                <div className="field">
                    <label>Price</label>
                    <input type="number" ref={price} name="price" placeholder="Price"/>
                </div>
                <div className="field">
                    <label>Date</label>
                    <input type="datetime-local" ref={date} name="date" placeholder="Date"/>
                </div>
                <button className="ui button"  type="submit">Submit</button>
            </form>
        </div>
    )
    return (
        component
    )
}

export default CreateEvent;