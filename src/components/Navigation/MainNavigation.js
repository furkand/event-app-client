import React, {useContext, useState} from "react"
import {NavLink} from "react-router-dom"
import { Menu,Segment} from "semantic-ui-react"

const MainNavigation = (props) => {
    const [activeItem, setActiveItem] = useState('home')
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
        <NavLink to='/auth'>
          <Menu.Item
            name='auth'
            active={activeItem === 'auth'}
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