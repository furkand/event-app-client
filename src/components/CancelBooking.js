import React ,{useState,useContext,useEffect}from "react"
import {AuthContext} from "../context/auth-context"

const CancelBooking = ({id}) => {
    const [booking, setBooking] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const {user} = useContext(AuthContext)
    

    const cancelBooking = async (event) =>{
        event.preventDefault()
        const requestBody = {
            query:`
                mutation{
                    cancelBooking(
                        bookingId: "${id}"
                    ){
                        _id
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
                setBooking(true)
                setLoading(false)
               
            }

        }catch(err){
            setErrors(err)
        }
    }

    return(
    <div className="make-booking">
        <button disabled={booking} onClick={cancelBooking} className="book">{booking ? "Cancelled" : "Cancel Booking"} </button>
    </div>
    )
}
export default CancelBooking