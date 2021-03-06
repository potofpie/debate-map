import {FC, useEffect} from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import  { ReactFlowProvider} from 'react-flow-renderer';
// import {DocumentProvider} from './context/docmentContext'
// import {AuthProvider} from './context/authContext'

import {Login} from "./components/AuthenticationPages/" 
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate


} from "react-router-dom";


import {VideoPlayer } from './components/VideoPlayer'
import {NodePicker} from './components/NodePicker';
import {Header} from './components/Header';
import { ReactFlowContainer } from './components/ReactFlowContainer';
import {DiagramActions} from './components/DiagramActions'
import { useAuth } from './context/authContext'
import Divider from '@mui/material/Divider';





export const ApplicationRouter:FC = () => {
    const {  user  } =  useAuth()!



    useEffect(()=> {
        // console.log({ login : process.env.REACT_APP_SHOULD_AUTHENTICATE && !user } )
        // console.log({ home : process.env.REACT_APP_SHOULD_AUTHENTICATE  } )
    },[user])


  return (

    <Router>
        <Routes>
            <Route path="/"
                element={
                    process.env.REACT_APP_SHOULD_AUTHENTICATE === 'false' || user ?
                    <>
                        <Header/>
                        <Divider />
                        <DiagramActions/>
                        <ReactFlowContainer/>
                        <NodePicker   />
                        <VideoPlayer/>
                </> :
                <Navigate replace to="/login" />

                
            }>
            </Route>
            <Route path="/login" element={
                process.env.REACT_APP_SHOULD_AUTHENTICATE === 'true' && !user ?
                <Login/>
                :
                <Navigate replace to="/" />
            
            
            }></Route>
        </Routes>
    </Router>
);
}

