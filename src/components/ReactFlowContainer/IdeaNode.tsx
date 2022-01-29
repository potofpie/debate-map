import React, {FC} from 'react';
import ReactFlow, { Handle, Position } from 'react-flow-renderer';
import { CustomNodeProps } from './CustomNodeProps';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

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
    borderColor: "#006E90",
    // borderWidth: 3
};


export const IdeaNode:FC<CustomNodeProps> = ({ data, id }) => {
  return (
    <div  className='react-flow__node-default' data-id={id} style={customNodeStyles}>
      {/* <Handle type="target" position={Position.Left} style={{ borderRadius: 0 }} /> */}
      <EmojiObjectsIcon style={{color: "#006E90"}}/>
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