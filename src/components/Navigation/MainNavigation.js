import React, {useContext, useState,useEffect} from "react"
import {Link,NavLink} from "react-router-dom"
import { Menu,Segment} from "semantic-ui-react"
import UserContext from "../../context/auth-context";
import "./MainNavigation.css"


const MainNavigation = (props) => {

    const user = useContext(UserContext)

    return ( <header className="main-navigation">
    <div className="main-navigation__logo">
      <h1>Join&Create Events</h1>
    </div>
    <nav className="main-navigation__items">
      <ul>
        {!user.token && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
         {!user.token && (
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/events">Events</NavLink>
        </li>
        {user.token && (
          <React.Fragment>
            <li>
              <NavLink to="/bookings">Bookings</NavLink>
            </li>
            <li>
              <button onClick={user.logout}>Logout</button>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  </header>
);

}

export default MainNavigation;