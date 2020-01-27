import React ,{useState,useContext,useEffect}from "react"
import {AuthContext} from "../context/auth-context"

const BookingButton = ({id,booked}) => {
    const [booking, setBooking] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const {user} = useContext(AuthContext)
    
    useEffect(()=>{
        booked ? setBooking(true) : setBooking(false)
    },[])

    const makeBooking = async (event) =>{
        event.preventDefault()
        const requestBody = {
            query:`
                mutation{
                    bookEvent(
                        eventId: "${id}"
                    ){
                        _id
                        user{
                            _id
                        }
                        event{
                            _id
                        }
                    }
                }
            `
        }
        try{
            const data = await fetch ('https://furkan-event-app.herokuapp.com/graphql', {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                }
            })
            const prettyData = await data.json()
            if(data.status !== 200 && data.status !==201){
                setLoading(false)
                const errorArray = prettyData.errors.map(
                    error=>{
                        return {error:error.message}
                     })
                     setErrors([...errorArray])
                     throw new Error("Something went wrong")
            }
            if(prettyData.data){
                const raw = localStorage.getItem("bookings")
                const bookings = [...JSON.parse(raw), prettyData.data.bookEvent.event._id]
                localStorage.setItem("bookings", JSON.stringify(bookings))
                setBooking(true)
                setLoading(false)
               
            }

        }catch(err){
            setErrors(err)
        }
    }

    return(
    <div className="make-booking">
        {user ? ( <button disabled={loading} onClick={makeBooking} className="book"> {loading ? "Loading.." : (booking===false ? "Book" : "Booked")}</button>) : <div></div>}
    </div>
    )
}
export default BookingButton