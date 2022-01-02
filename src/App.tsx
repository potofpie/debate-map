import {FC} from 'react';
import { DiagramPlayground } from './components';
import { ThemeProvider, createTheme } from '@mui/material/styles';



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

