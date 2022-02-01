import  {FC} from 'react';
import  { Handle, Position } from 'react-flow-renderer';
import { CustomNodeProps } from './CustomNodeProps';
import { styled } from '@mui/system';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';




const StyledNode = styled('div')`
border-radius: 3px;
border-style: solid;
border-width: 1px;
color: #222;
font-size: 12px;
text-align: center;
width: 250px;
background: #EDFBFF;
`




export const IdeaNode:FC<CustomNodeProps> = ({ data,id,selected }) => {
  const customNodeStyles = {
      borderColor: "#A5C5CF",
      display: 'flex',
      borderWidth: 1,
      boxShadow: !selected ? "none" : "0 4px 8px 0 rgba(0,0,0,0.2)",
      borderRadius: 5,
      overflow: "hidden"
  };
  
  
  return (
    <StyledNode   data-id={id} style={customNodeStyles}>
      <div style={{backgroundColor: "#006E90", padding: 10, "display" : 'flex', "justifyContent": "center", "alignItems": "center",}}>
        <EmojiObjectsIcon fontSize="small" style={{color: "white"}}/>
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
        type="target"
        position={Position.Bottom}
        id="b"
      />
    </StyledNode>
  );
};