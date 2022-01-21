import {FC} from 'react';
import { DiagramPlayground } from './components';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import  { ReactFlowProvider} from 'react-flow-renderer';
import {DocumentProvider} from './context/docmentContext'




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
             <DocumentProvider>
                <DiagramPlayground />   
            </DocumentProvider>
          </ReactFlowProvider>
        </ThemeProvider>
      </div>
);
}

