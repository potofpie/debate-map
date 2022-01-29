import {FC} from 'react';
import  { Handle, Position } from 'react-flow-renderer';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { CustomNodeProps } from './CustomNodeProps'




export const SuportingNode:FC<CustomNodeProps> = ({ id, data, selected }) => {
    const customNodeStyles = {
        borderStyle: "dashed",
        borderColor: "#6E9000",
        borderWidth: selected ? 2 : 1
    };
    return (
    <div  className='react-flow__node-default'  data-id={id} style={customNodeStyles} >
      <AddTaskIcon style={{color: "#6E9000"}}/>
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