import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Fab, LinearProgress } from '@mui/material';
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
import { doc, getDoc } from 'firebase/firestore';
//db
import { db } from './';
//comps
import KCDialogCart from './components/KCDialogCart';
//pages
import KCHome from './pages/KCHome';
import RMSSignUp from './pages/RMSSignUp';

const App = () => {
  const [ic_st_isDrawerOpen, ic_st_setIsDrawerOpen] = useState(false);
  //state
  const [ic_st_isCartOpen, ic_st_setIsCartOpen] = useState(false);
  const [ic_st_user, ic_st_setUser] = useState(null);
  const [ic_st_isLoading, ic_st_setIsLoading] = useState(false);
  const [ic_st_nomorMeja, ic_st_setNomorMeja] = useState(null);
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
  //update current user redux state
  useEffect(() => {
    console.log('ic_st_user tracker effect');
    ic_st_setIsLoading(true);
    if (ic_st_user === null) {
      updateCurrentUser(null)
      updateCurrentLoginStatus(false);
    } else {
      //get user data from db
      try {
        const getDataFromDb = async () => {
          console.log('getting user db');
          const docSnap = await getDoc(doc(db, "user", ic_st_user.uid));
          if (docSnap.exists()) {
            updateCurrentUser(docSnap.data());
            ic_st_setIsLoading(false);
            updateCurrentLoginStatus(true);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            ic_st_setIsLoading(false);
            updateCurrentLoginStatus(false);
          }
        }
        getDataFromDb();
      } catch (err) {
        console.log(err.message);
      }
    }
    ic_st_setIsLoading(false);
  }, [ic_st_user]);
  //on auth state changed
  onAuthStateChanged(auth, (user) => {
    try {
      if (user) { //user is signed in
        console.log('onAuthStateChanged get called');
        ic_st_setUser(user);
      } else {
        // User is signed out
        ic_st_setUser(null);
      }
    } catch (err) {
      console.log(err.message);
      h_sf_showSnackbar(err.message, 'error');
    }
  });
  //handle order
  const handleOrder = () => {
    if (ic_st_nomorMeja === null | undefined | "") {
      h_sf_showSnackbar('Nomor Meja tidak boleh kosong', 'error');
      return;
    }
  }
  if (r_currentLoginStatus === true) {
    return (
      <Router>
        <Box>
          {
            ic_st_isLoading ?
              <LinearProgress /> : <></>
          }
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
          <Fab color="secondary" aria-label="add" onClick={() => ic_st_setIsCartOpen(true)} sx={{ zIndex: 100, position: 'fixed', bottom: 40, right: 40 }}>
            <ShoppingCartIcon />
          </Fab>
        </Box>
        {/** Dialog Cart */}
        <KCDialogCart
          isOpen={ic_st_isCartOpen}
          cart={r_currentCart}
          nomorMeja={ic_st_nomorMeja}
          handleClose={() => ic_st_setIsCartOpen(false)}
          handleOrder={handleOrder}
          handleChange={(v)=>ic_st_setNomorMeja(v)}
        />
      </Router>
    )
  } else {
    return (
      <RMSSignUp />
    )
  }
}

export default App;