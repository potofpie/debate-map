import  {FC } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';


import AddTaskIcon from '@mui/icons-material/AddTask';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import DangerousIcon from '@mui/icons-material/Dangerous';

const actions = [
//   { icon: <FileCopyIcon />, name: 'Save' },
  { icon: <EmojiObjectsIcon />, name: 'Topic / Sub Topic' },
  { icon: <AddTaskIcon />, name: 'Suporting Claim' },
  { icon: <DangerousIcon />, name: 'Opposing Claim' },
];

export const DiagramActions:FC = () =>  {
  return (
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
  );
}