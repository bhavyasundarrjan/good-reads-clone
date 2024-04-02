// import { Link } from 'react-router-dom';

// material-ui
import { Grid } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { Button } from '../../../node_modules/@mui/material/index';
import { auth } from 'utils/firebase.utils';
import { signInWithGmail } from 'utils/firebase.utils';
import { useState, useEffect } from 'react';
import AuthWrapper from './AuthWrapper';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';

// ================================|| LOGIN ||================================ //



export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true)
      navigate('/dashboard/default', { replace: true});
      
    } else {
      setLoggedIn(false)
    }
  });

  useEffect(() => {
    if (loggedIn != undefined) {
      
      //do loggedIn stuff
    }
  }, [loggedIn]);
  
  return(
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12} justifyContent="center"
          alignItems="center">
      <img alt={"goodreads"} src={"https://s.gr-assets.com/assets/react_components/currently_reading/icn_default_CR_ltrail-16f28d39654104ceb329648a474943eb.svg"} width="30px" height="30px"></img>
    <img src={"https://s.gr-assets.com/assets/layout/header/goodreads_logo.svg"} alt="GoodReads" width="100" />
      </Grid>
      
      <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary" onClick={signInWithGmail}>
                    SignIn with Gmail
                  </Button>
                </AnimateButton>
      </Grid>
      
    </Grid>
  </AuthWrapper>
  )
}
