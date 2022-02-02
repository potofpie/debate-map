import {FC} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import  { ReactFlowProvider} from 'react-flow-renderer';
import {DocumentProvider} from './context/docmentContext'
import {AuthProvider} from './context/authContext'

// import {Login} from "./components/AuthenticationPages/" 
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link
// } from "react-router-dom";
import { ApplicationRouter } from './ApplicationRouter'

// import {VideoPlayer } from './components/VideoPlayer'
// import {NodePicker} from './components/NodePicker';
// import {Header} from './components/Header';
// import { ReactFlowContainer } from './components/ReactFlowContainer';
// import {DiagramActions} from './components/DiagramActions'
// import Divider from '@mui/material/Divider';





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
      <AuthProvider>

        <ThemeProvider theme={theme}>
          <ReactFlowProvider>
             <DocumentProvider>
                <ApplicationRouter/>
            </DocumentProvider>
          </ReactFlowProvider>
        </ThemeProvider>
      </AuthProvider>
      </div>
);
}

