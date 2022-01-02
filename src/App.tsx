import {FC} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { DiagramPlayground } from './components';
import {debate} from './assets';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';



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
      <DiagramPlayground/>
    </ThemeProvider>
  </div>
);
}

