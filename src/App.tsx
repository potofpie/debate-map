import {FC, useState} from 'react';
import { DiagramPlayground } from './components';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import  { ReactFlowProvider} from 'react-flow-renderer';




export const App:FC = () => {


  const theme = createTheme({
    palette: {
      primary: {
        main: '#fefefa',
      },
    },
  });

  return (
  <div className='App' >
    <ThemeProvider theme={theme}>
      <ReactFlowProvider>
        <DiagramPlayground />
        
      </ReactFlowProvider>
    </ThemeProvider>
  </div>
);
}

