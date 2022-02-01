

import {FC, useState, useEffect} from 'react';
import { useAuth } from '../../context/authContext'
import { Card, Typography, Button, TextField, InputAdornment } from '@mui/material'
import PanoramaPhotosphereSelectIcon from '@mui/icons-material/PanoramaPhotosphereSelect';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { styled } from '@mui/system';

const AuthenticationPageContainer = styled('div')`
  display: flex; 
  width: 100%; 
  height: 100%;
  justify-content: center; 
  align-items: center; 
  background-color: #f6f8fa;
`






export const Login:FC = () => {
  const [email, setEmail] = useState<string | undefined>('')
  const [password, setPassword] = useState<string | undefined>('')
  const { auth, login } = useAuth()!;
  
  
  const onLogin = () => {
    login(email,password)
  }


  return (

    <AuthenticationPageContainer >
      <Card style={{display: "flex",  height: '450px', width: '350px', justifyContent: "center", alignItems: "center", flexDirection: "column"}} >
      <PanoramaPhotosphereSelectIcon style={{fontSize : '100px'}}  />
      <Typography variant='h5'>
        debate-map 
      </Typography>
      <Typography style={{color: "grey"}} variant='caption'>
        <b> test enviroment </b>
      </Typography>
      <TextField 
        onChange={(e: any) => {setEmail(e?.target?.value)}}
        style={{
          height: '40px',
          margin: '5px'
        }}
        inputProps={{
          style: { height: '3px'}
        }}
        id="outlined-basic" 
        label="Email" 
        // variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment  
        position="start">
          <EmailIcon />
          </InputAdornment>,
        }}
       />
      <TextField 
        onChange={(e: any) => {setPassword(e?.target?.value)}}
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
        // variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment  
        position="start"><LockIcon  /></InputAdornment>,
        }}
       />

      <Button
        variant="contained"
        // color="default"
        // className={classes.button}
        onClick={onLogin}
      >
        Sign in
      </Button>
      </Card>
    </AuthenticationPageContainer>
  );
}
