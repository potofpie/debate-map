import  {FC} from 'react';
import  { Handle, Position } from 'react-flow-renderer';
import { CustomNodeProps } from './CustomNodeProps';
import { styled } from '@mui/system';
import AddTaskIcon from '@mui/icons-material/AddTask';


const StyledNode = styled('div')`
border-radius: 3px;
border-style: solid;
border-width: 1px;
color: #222;
font-size: 12px;
text-align: center;
width: 250px;
background: #FAFFEB;
`




export const SuportingNode:FC<CustomNodeProps> = ({ data,id,selected }) => {
  const customNodeStyles = {
      borderColor: "#CDD1C0",
      display: 'flex',
      borderWidth: 1,
      boxShadow: !selected ? "none" : "0 4px 8px 0 rgba(0,0,0,0.2)",
      borderRadius: 5,
      overflow: "hidden"
  };
  
  
  return (
    <StyledNode   data-id={id} style={customNodeStyles}>
      <div style={{backgroundColor: "#6E9000", padding: 10, "display" : 'flex', "justifyContent": "center", "alignItems": "center",}}>
        <AddTaskIcon fontSize="small" style={{color: "white"}}/>
      </div>

      <div style={{"display" : 'flex', "justifyContent": "center", "alignItems": "center", width: "100%", padding: 10}}>
        <div>{data.label}</div>
      </div>
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
    </StyledNode>
  );
};