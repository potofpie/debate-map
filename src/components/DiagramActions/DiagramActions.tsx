import  {FC } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';


import AddTaskIcon from '@mui/icons-material/AddTask';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import DangerousIcon from '@mui/icons-material/Dangerous';
import HelpIcon from '@mui/icons-material/Help';
import {useDocument} from '../../context/docmentContext';



const actions = [
  { icon: <EmojiObjectsIcon />, name: 'Topic / Sub Topic', type: "IdeaNode" },
  { icon: <AddTaskIcon />, name: 'Suporting Claim', type: "SuportingNode" },
  { icon: <DangerousIcon />, name: 'Opposing Claim', type: "OpossingNode" },
  { icon: <HelpIcon />, name: 'Insufficient Claim', type: "InsufficientNode" },

];

export const DiagramActions:FC = () =>  {
    const { documentDataControler } = useDocument()!
    const {addElement } = documentDataControler!   

  return (
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            onClick={ () => addElement(action.type)}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
  );
}