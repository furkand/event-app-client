import React from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom"
import AuthPage from "./pages/Auth"
import EventPage from "./pages/Event"
import BookingPage from "./pages/Booking"
import MainNavigation from "./components/Navigation/MainNavigation"
import  'semantic-ui-css/semantic.min.css';


function App() {
  return (
    <BrowserRouter >
    <MainNavigation/>
    <Switch>
    <Route path="/" component={null} exact/>
    <Route path="/events" component={EventPage} />
    <Route path="/auth" component={AuthPage} />
    <Route path="/bookings" component={BookingPage} />
    </Switch>
    </BrowserRouter>
    
  );
}

export default App;
