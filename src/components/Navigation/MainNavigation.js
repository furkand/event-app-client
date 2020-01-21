import React, {useContext, useState} from "react"
import {NavLink} from "react-router-dom"
import { Menu,Segment} from "semantic-ui-react"

const MainNavigation = (props) => {
  const defaultValue = window.location.href.split("/")[3]
    const [activeItem, setActiveItem] = useState(defaultValue)
    console.log(defaultValue);
    const handleItemClick = (e,{name}) =>{ setActiveItem(name)

    }

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
        <NavLink to='/signup'>
          <Menu.Item
            name='signup'
            active={activeItem === 'signup'}
            onClick={handleItemClick}
          />
          </NavLink>
          <NavLink to='/login'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
          />
          </NavLink>
          <NavLink to='events'>
          <Menu.Item
            name='events'
            active={activeItem === 'events'}
            onClick={handleItemClick}
          />
          </NavLink>
          <NavLink to='bookings'>
          <Menu.Item
            name='bookings'
            active={activeItem === 'bookings'}
            onClick={handleItemClick}
          />
          </NavLink>
        </Menu>
      </Segment>
    )
}

export default MainNavigation;