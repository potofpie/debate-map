import {FC} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import  { ReactFlowProvider} from 'react-flow-renderer';
import {DocumentProvider} from './context/docmentContext'

import {VideoPlayer } from './components/VideoPlayer'
import {NodePicker} from './components/NodePicker';
import {Header} from './components/Header';
import { ReactFlowContainer } from './components/ReactFlowContainer';
import {DiagramActions} from './components/DiagramActions'
import Divider from '@mui/material/Divider';





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

              <Header/>
              {/* <Divider style={{margin: 5}}/> */}

              <DiagramActions/>
              <ReactFlowContainer/>

              <NodePicker   />
              <VideoPlayer/>

            </DocumentProvider>
          </ReactFlowProvider>
        </ThemeProvider>
      </div>
);
}

