import {FC} from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { CustomNodeProps } from './CustomNodeProps';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';




export const IdeaNode:FC<CustomNodeProps> = ({ data, id, selected }) => {
    const customNodeStyles = {
        borderStyle: "dashed",
        borderColor: "#006E90",
        borderWidth: selected ? 2 : 1
    };
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