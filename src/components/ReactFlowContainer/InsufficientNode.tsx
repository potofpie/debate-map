import  {FC} from 'react';
import  { Handle, Position } from 'react-flow-renderer';
import HelpIcon from '@mui/icons-material/Help';
import { CustomNodeProps } from './CustomNodeProps';
import { styled } from '@mui/system';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


const StyledNode = styled('div')`
border-radius: 3px;
border-style: solid;
border-width: 1px;
color: #222;
font-size: 12px;
text-align: center;
width: 250px;
background: #FFEDFB;
`




export const InsufficientNode:FC<CustomNodeProps> = ({ data,id,selected }) => {
  const customNodeStyles = {
      // borderStyle: "dashed",
      borderColor: "#D1A7C8",
      display: 'flex',
      borderWidth: 1,
      boxShadow: !selected ? "none" : "0 4px 8px 0 rgba(0,0,0,0.2)",
      // box-sh

      borderRadius: 5,
      overflow: "hidden"
  };

  // align-items: center;
  // justify-content: center;
  
  
  return (
    <StyledNode   data-id={id} style={customNodeStyles}>
      <div style={{backgroundColor: "#90006E", padding: 10, "display" : 'flex', "justifyContent": "center", "alignItems": "center",}}>
        <QuestionMarkIcon fontSize="small" style={{color: "white"}}/>
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