import React ,{useReducer,useState,useContext}from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom"
import AuthPage from "./pages/Auth"
import EventPage from "./pages/Event"
import BookingPage from "./pages/Booking"
import MainNavigation from "./components/Navigation/MainNavigation"
import  'semantic-ui-css/semantic.min.css';
import Login from "./pages/Login"
import UserContext from './context/auth-context'



function App(props) {
  const userContext = useContext(UserContext)
  const [userCredentials, setUserCredentials] = useState({
    token:null,
    userId:null
  })
  const login = (token,userId,tokenExpirition)=>{
    setUserCredentials({
      ...userCredentials,
      token: token,
      userId: userId
    })
  }

  const logout = ()=>{
    setUserCredentials({
      ...userCredentials,
      token: null,
      userId: null
    })
  }
  console.log("App.js userContext:  " + userContext.token)
  return (
    <BrowserRouter >
      <React.Fragment>
      <UserContext.Provider value={{
            token: userCredentials.token,
            userId:userCredentials.token,
            login: login,
            logout: logout
      }}>
        <MainNavigation/>
        <main className="main-content">
        <Switch>
          <Redirect from="/" to="/events" exact/>
          {userCredentials.token && (<Redirect from="/login" to="/events" exact/>)}
          {userCredentials.token && (<Redirect from="/signup" to="/events" exact/>)}
          {!userCredentials.token && (<Redirect from="/bookings" to="/login" exact/>)}
          {!userCredentials.token && (<Redirect from="/logout" to="/events" exact/>)}
          <Route path="/" component={null} exact/>
          <Route path="/events" component={EventPage} />
          {!userCredentials.token && (<Route path="/signup" component={AuthPage} />)}
          {userCredentials.token &&(<Route path="/bookings" component={BookingPage} />)}
          {!userCredentials.token &&(<Route path="/login" component={Login} />)}
        </Switch>
        </main>
      </UserContext.Provider>
      </React.Fragment>
    </BrowserRouter>
    
  );
}

export default App;
