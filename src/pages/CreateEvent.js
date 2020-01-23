import React, {useContext, useState} from "react"

function CreateEvent(props){
    return (
        <div style={{width:40+"%",margin:"auto",marginTop:100}}>
            <h1>Create Event</h1>
            <form className="ui form">
                <div className="field">
                    <label>Title</label>
                    <input type="text" name="first-name" placeholder="First Name"/>
                </div>
                <div className="field">
                    <label>Description</label>
                    <input type="text" name="last-name" placeholder="Last Name"/>
                </div>
                <div className="field">
                    <label>price</label>
                    <input type="text" name="last-name" placeholder="Last Name"/>
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateEvent;