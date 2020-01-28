import React from "react"
import moment from "moment"
import CancelBooking from "./CancelBooking"

function SingleBooking({event:{title,date,description,price,_id} , id}){

    return (
                    <React.Fragment >
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
                        <CancelBooking id={id} />
                     </React.Fragment>
                    
    )
}

export default SingleBooking;