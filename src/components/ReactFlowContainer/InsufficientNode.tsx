import  {FC} from 'react';
import  { Handle, Position } from 'react-flow-renderer';
import HelpIcon from '@mui/icons-material/Help';
import { CustomNodeProps } from './CustomNodeProps';



export const InsufficientNode:FC<CustomNodeProps> = ({ data,id,selected }) => {
  const customNodeStyles = {
      borderStyle: "dashed",
      borderColor: "#90006E",
      borderWidth: selected ? 2 : 1
  };
  
  
  return (
    <div  className='react-flow__node-default' data-id={id} style={customNodeStyles}>
      <HelpIcon style={{color: "#90006E"}}/>
      <div>{data.label}    </div>
      <Handle
        type="source"
        position={Position.Top}
        id="a"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
      />
    </div>
  );
};