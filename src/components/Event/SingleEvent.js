import React from "react"
import moment from "moment"
import BookingButton from "../BookingButton"

function SingleEvent({event:{title,date,description,price,_id},booked}){
    const condition = booked.filter(item=>{
        return item.event._id === _id
    })
    return (
                    <div className="event-card ">
                    <div className="event-content">
                     <div className="content">
                     <div className="center aligned header"><h3 className="ui header yellow">{title}</h3></div>
                        <div className="center aligned description">
                             <h4 className="description">{description}</h4>
                        </div>
                    </div>
                     <div className="extra content">
                     <div className="center aligned author">
                         <h4 className="price">{price} $ </h4>
                     </div>
                     </div>
                     <div className="extra content">
                     <div className="center aligned author">
                         <h4 className="date">Date: {moment(date).fromNow()}</h4>
                     </div>
                     </div>
                     </div>
                    {condition.length > 0 ? (<BookingButton booked={true} id={_id}/>) : (<BookingButton  booked={false}id={_id}/>)}
                     </div>
                    
    )
}

export default SingleEvent;