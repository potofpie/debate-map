import './Login.css';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
// import GlassesIcon from '../../CustomIcons/GlassesIcon';
// import GoogleIcon from '../../CustomIcons/GoogleIcon';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import React, {FC, useState} from 'react';
import { useAuth } from '../../context/authContext'
// import {
//   wi
// } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '10px',
    width: '80%'
  },
}))



export const Login:FC = () => {
  const [email, setEmail] = useState<string | undefined>()
  const [password, setPassword] = useState<string | undefined>()
  const { login } = useAuth()!;
  const classes = useStyles();
  let onLogin = () => {
    login(email,password)
    // props.history.push('/')
  }

  return (
    <div className="Login">
      <div className="Login-card ">
      {/* <GlassesIcon size='100px' /> */}
      <Typography variant="h4" color='textPrimary' style={{fontFamily: 'Comfortaa', wordSpacing: '-.3ch'}}> <b style={{fontFamily: 'Comfortaa'}}>lens </b>hash</Typography>
      {/* <Typography variant="h4" color='textPrimary' style={{fontFamily: 'Comfortaa'}}>lens<b style={{fontFamily: 'Comfortaa'}}>hash</b></Typography> */}
      <TextField 
        className='Login-field'
        // onChange={(e: Event) => {setEmail(e?.target?.value)}}
        style={{
          height: '40px',
          margin: '5px'
        }}
        inputProps={{
          style: { height: '3px'}
        }}
        id="outlined-basic" 
        label="Email" 
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment  
        position="start">
          <EmailIcon />
          </InputAdornment>,
        }}
       />
      <TextField 
        className='Login-field'
        // onChange={(e: Event) => {setPassword(e?.target?.value)}}
        style={{
          height: '40px',
          margin: '5px'
        }}
        inputProps={{
          style: { height: '3px'}
        }}
        id="outlined-basic" 
        type="password" 
        label="Password" 
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment  
        position="start"><LockIcon  /></InputAdornment>,
        }}
       />

      <Button
        variant="contained"
        color="default"
        className={classes.button}
        onClick={onLogin}
      >
        Sign in
      </Button>
      {/* <Button
        variant="contained"
        color="default"
        disabled
        className={classes.button}
        startIcon={<GoogleIcon size='20px' />}
      > */}
      {/* Sign in with google
      </Button> */}
      <Typography  color='textPrimary'>
        <Link href="/signup" >
          I need an account! 
        </Link>
      </Typography>
      <Typography  color='textPrimary'>
        <Link href="/reset" >
          I forgot my password! 
        </Link>
      </Typography>
      </div>

    </div>
  );
}
