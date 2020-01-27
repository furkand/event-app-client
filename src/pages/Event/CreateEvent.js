import React, {useContext, useState, useRef} from "react"
import SingleEvent from "../../components/Event/SingleEvent"

function CreateEvent(props){
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [event,setEvent] = useState()
    let title = useRef()
    let date = useRef()
    let description = useRef()
    let price = useRef()
    const onSubmit = async (event)=>{
        event.preventDefault()
        setLoading(true)
        title = title.current.value
        date = date.current.value
        description = description.current.value
        price = price.current.value
        if(
            title.trim().length === 0 ||
            price <= 0 ||
            date.trim().length === 0 ||
            description.trim().length === 0
            ){const error = {error : "Inputs must not be blank!"}
            setLoading(false)
            setErrors([error])
            return;
        }    
        const requestBody = {
            query:`
                mutation{
                    createEvent(
                        eventInput:{
                            title: "${title}"
                            description: "${description}"
                            price: ${price}
                            date:"${date}"
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
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                }
            })
            const prettyData = await data.json()
            if(data.status !==200 && data.status !==201){
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
        <div className="create-event-container" >
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
            {errors.length > 0 && (
                        <div className='ui error message'>
                        <ul className='list'>
                            {errors.map(value=>(
                            <li key={Math.random()}>{value.error}</li>
                            ))}
                        </ul>
                    </div>
                   )}
        </div>
    )
    return (
        component
    )
}

export default CreateEvent;