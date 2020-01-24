import React, {useContext, useState,useEffect} from "react"
import {Link,NavLink} from "react-router-dom"
import { Menu,Segment} from "semantic-ui-react"
import {AuthContext} from "../../context/auth-context";
import "./MainNavigation.css"


const MainNavigation = (props) => {

    const {user,logout} = useContext(AuthContext)
    return ( <header className="main-navigation" style={{position:"fixed",zIndex:100}}>
    <div className="main-navigation__logo">
      <h1>Join&Create Events</h1>
    </div>
    <nav className="main-navigation__items">
      <ul>

          <li>
            <NavLink exact to="/">Home</NavLink>
          </li>

        {!user && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
         {!user && (
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/events">Events</NavLink>
        </li>
        {user && (
          <React.Fragment>
            <li>
              <NavLink to="/bookings">Bookings</NavLink>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  </header>
);

}

export default MainNavigation;