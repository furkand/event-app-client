import React from "react"
import moment from "moment"

function SingleEvent({event:{title,date,description,price}}){

    return (
        
                    <div className="event-card ui card ">
                    <div className="event-content">
                     <div className="content">
                     <div className="center aligned header"><h3 className="ui header yellow">{title}</h3></div>
                        <div className="center aligned description">
                             <h4 className="ui olive header">{description}</h4>
                        </div>
                    </div>
                     <div class="extra content">
                     <div class="center aligned author">
                         <h4 className="ui green header">{price} $ </h4>
                     </div>
                     </div>
                     <div class="extra content">
                     <div class="center aligned author">
                         <h4 className="ui green header">Date: {moment(date).fromNow()}</h4>
                     </div>
                     </div>
                     </div>
                     </div>
                    
    )
}

export default SingleEvent;