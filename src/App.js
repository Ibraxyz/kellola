import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Fab } from '@mui/material';
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import RMSTempDrawer from './components/RMSTempDrawer';
//icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//hooks
import useSnackbar from './hooks/useSnackbar';
//router
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
//redux
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators } from "./state/index";
//firebase
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
//comps
import KCHome from './pages/KCHome';
import KCDialogCart from './components/KCDialogCart';

const App = () => {
  const [ic_st_isDrawerOpen, ic_st_setIsDrawerOpen] = useState(false);
  //state
  const [ic_st_isCartOpen, ic_st_setIsCartOpen] = useState(false);
  //redux 
  const dispatch = useDispatch();
  const { updateCurrentLoginStatus, updateCurrentUser } = bindActionCreators(actionCreators, dispatch);
  const r_currentPathState = useSelector((state) => state.currentPath);
  const r_currentLoginStatus = useSelector((state) => state.currentLoginStatus);
  const r_currentUser = useSelector((state) => state.currentUser);
  const r_currentCart = useSelector((state) => state.currentCart);
  //snackbar
  const [h_st_isSnackbarShown, h_st_message, h_st_severity, h_sf_showSnackbar, h_sf_closeSnackbar] = useSnackbar();
  //firebase auth
  const auth = getAuth();
  //handle logout operation
  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('user is signed out');
      updateCurrentLoginStatus(false);
    }).catch((error) => {
      // An error happened.
      console.log(error.message);
    });
  }
  return (
    <Router>
      <Box>
        <PrimarySearchAppBar
          title={"Kellola Cafe"}
          handleMenuClick={() => ic_st_setIsDrawerOpen(!ic_st_isDrawerOpen)}
          handleLogout={handleLogout}
        />
        <RMSTempDrawer isOpen={ic_st_isDrawerOpen}
          handleClick={(bool) => ic_st_setIsDrawerOpen(bool)}
        />
        <Container>
          <Box sx={{ paddingTop: '40px', paddingBottom: '40px' }}> {/** content is here */}
            <Route path="/" exact={true}>
              <KCHome />
            </Route>
          </Box>
        </Container>
        {/** cart opener */}
        <Fab color="secondary" aria-label="add" onClick={() => ic_st_setIsCartOpen(true)} sx={{zIndex:100,position:'fixed',bottom:40,right:40}}>
          <ShoppingCartIcon />
        </Fab>
      </Box>
      {/** Dialog Cart */}
      <KCDialogCart isOpen={ic_st_isCartOpen} cart={r_currentCart} handleClose={() => ic_st_setIsCartOpen(false)} />
    </Router>
  )
}

export default App;