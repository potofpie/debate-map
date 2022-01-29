import React, {FC} from 'react';
import ReactFlow, { Handle, Position } from 'react-flow-renderer';
import AddTaskIcon from '@mui/icons-material/AddTask';

const elements = [
  {
    id: '2',
    type: 'special',
    position: { x: 100, y: 100 },
    data: { text: 'A custom node' },
  },
];

const customNodeStyles = {
//   background: '#9CA8B3',
//   color: '#FFF',
//   padding: 10,
    borderStyle: "dashed",
    borderColor: "#6E9000",
    // borderWidth: 3
};

interface CustomNodeProps {
    id: string;
    data: any;
}

export const SuportingNode:FC<CustomNodeProps> = ({ id, data }) => {
  return (
    <div  className='react-flow__node-default'  data-id={id} style={customNodeStyles} >
      {/* <Handle type="target" position={Position.Left} style={{ borderRadius: 0 }} /> */}
      <AddTaskIcon style={{color: "#6E9000"}}/>
      <div>{data.label}    </div>
      <Handle
        type="source"
        position={Position.Top}
        id="a"
        // style={{ top: '30%', borderRadius: 0 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        // style={{ top: '70%', borderRadius: 0 }}
      />
    </div>
  );
};