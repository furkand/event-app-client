import React, {useContext, useState} from "react"
import {NavLink} from "react-router-dom"
import { Menu,Segment} from "semantic-ui-react"
import UserContext from "../../context/auth-context";


const MainNavigation = (props) => {
    const takeHref = () =>{
      return window.location.href.split("/")[3]
    }
    const defaultValue = takeHref()
    const [activeItem, setActiveItem] = useState(defaultValue)
    console.log(defaultValue);
    console.log("main navigation is worked")
    const handleItemClick = (e,{name}) =>{ setActiveItem(name)}
    const user = useContext(UserContext)
    return (

        <Segment inverted>
        <Menu inverted pointing secondary>
        <NavLink to='/'>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
          />
        </NavLink>
          {!(user.userId) && (
            <NavLink to='/signup'>
            <Menu.Item
              name='signup'
              active={activeItem === 'signup'}
              onClick={handleItemClick}
            />
            </NavLink>
          )}
          {!(user.userId) && (
          <NavLink to='/login'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
          />
          </NavLink>
          )}
          {(user.userId) && (
          <NavLink to='/logout'>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={user.logout}
          />
          </NavLink>
          )}
          <NavLink to='events'>
          <Menu.Item
            name='events'
            active={activeItem === 'events'}
            onClick={handleItemClick}
          />
          </NavLink>
          {(user.userId) && (
          <NavLink to='bookings'>
          <Menu.Item
            name='bookings'
            active={activeItem === 'bookings'}
            onClick={handleItemClick}
          />
          </NavLink>
          )}
        </Menu>
      </Segment>

    )
}

export default MainNavigation;