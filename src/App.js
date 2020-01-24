import React ,{useReducer,useState,useContext}from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom"
import AuthPage from "./pages/Auth"
import EventPage from "./pages/Event/Event"
import BookingPage from "./pages/Booking"
import MainNavigation from "./components/Navigation/MainNavigation"
import  'semantic-ui-css/semantic.min.css';
import Login from "./pages/Login"
import Home from "./pages/Home"
import CreateEvent from "./pages/Event/CreateEvent"
import {AuthProvider} from "./context/auth-context"
import {AuthContext} from './context/auth-context'
import {AuthRoute} from "./AuthRoute"
import {NonAuthRoute} from "./AuthRoute"



function App(props) {
const user = useContext(AuthContext)
console.log("app.js user: " + user.user)
  return (
    <BrowserRouter >
      <React.Fragment>
      <AuthProvider>
        <MainNavigation/>
        <main className="main-content" >
        <Switch>
          <NonAuthRoute path="/create-event" component={CreateEvent} exact/>
          <NonAuthRoute path="/bookings" component={BookingPage} exact/>
          <AuthRoute path="/login" component={Login} exact/>
          <AuthRoute path="/signup" component={AuthPage} exact/>
          <Route path="/" component={Home} exact/>
          <Route path="/events" component={EventPage} />
         
        </Switch>
        </main>
      </AuthProvider>
      </React.Fragment>
    </BrowserRouter>
    
  );
}

export default App;
