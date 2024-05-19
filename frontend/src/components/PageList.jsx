import React from 'react';

import { Box } from '@mui/system';

import {
  Routes,
  Route
} from 'react-router-dom';

import Register from './Register'
import Login from './Login'
import LandingScreen from './LandingScreen';
import NavBar from './NavBar';
import MyListings from './MyListings';
import About from './About';
import EditListing from './EditListing';
import ViewListing from './ViewListing'
import ViewBookings from './ViewBookings'

const PageList = () => {
  const [token, setToken] = React.useState(null);
  const [email, setEmail] = React.useState(null);

  // Check local storage for token
  React.useEffect(() => {
    const checkToken = localStorage.getItem('token');
    if (checkToken) {
      setToken(checkToken);
    }
  }, [])

  React.useEffect(() => {
    const checkEmail = localStorage.getItem('email');
    if (checkEmail) {
      setEmail(checkEmail);
    }
  }, [])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <NavBar
        token={token}
        setToken={setToken}
      />
      <Box style={{ marginTop: 70, width: '100%', maxWidth: 1500 }}>
        <Routes>
          <Route
            path='/'
            element={
              <LandingScreen
                token={token}
                setToken={setToken}
                email={email}
              />}>

          </Route>
          <Route
            path='/register'
            element={
              <Register
                token={token}
                setToken={setToken}
                setEmail={setEmail}
              />}
          >
          </Route>
          <Route
            path='/login'
            element={
              <Login
                token={token}
                setToken={setToken}
                setEmail={setEmail}
              />}
          >
          </Route>
          <Route
            path='/myListings'
            element={
              <MyListings
                token={token}
                setToken={setToken}
                email={email}
              />}
          >
          </Route>
          <Route path='/about' element={<About />}></Route>
          <Route
            path='/myListings/editListing/:id'
            element={
              <EditListing
                token={token}
              />}
          >
          </Route>
          <Route
            path='/listings/:id'
            element={
              <ViewListing
                token={token}
              />}
          >
          </Route>
          <Route
            path='/myListings/viewBookings/:id'
            element={
              <ViewBookings
                token={token}
              />}
          >
          </Route>
        </Routes>
      </Box>
    </Box>
  )
}

export default PageList;
