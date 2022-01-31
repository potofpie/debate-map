import {FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import YouTube, {PlayerVars, Options} from 'react-youtube';
import { useDocument } from '../../context';
import { styled } from '@mui/system';





type Anchor = 'top' | 'right' | 'bottom' | 'right';
interface INodePicker {
  
}



const StyledTypography = styled(Typography)`
  color: grey;
`
const StyledTextareaAutosize = styled(TextareaAutosize)`
  max-width: 300px; 
  max-height: 50px; 
  min-width: 300px;
  min-height: 50px; 
  background: transparent;
  border: none; 
  resize: none; 
`
const StyledBox = styled(Box)`
  display: 'flex'; 
  flex-direction: 'column';
  padding: 10px;
  background-color: #f6f8fa;
  height: 100%;


`


export const NodePicker:FC<INodePicker> = () => {
  const { diagramControler, documentDataControler } = useDocument()!;
  const { selectedElement } = diagramControler
  const { updateElement } = documentDataControler

  const [label, setLabel] = useState()
  const [startTime, setStartTime] = useState(selectedElement?.data?.startTime)
  const [endTime, setEndTime] = useState(selectedElement?.data?.endTime)
  const playerVars: PlayerVars = {
    start: startTime,
    end: endTime
  }
  const options: Options = {
    playerVars
  }
  
  useEffect(() => {
    setLabel(selectedElement?.data?.label)
  },[selectedElement?.data?.label])

  useEffect(() => {
    setEndTime(selectedElement?.data?.endTime)
  },[selectedElement?.data?.endTime])

  useEffect(() => {
    setStartTime(selectedElement?.data?.startTime)
  },[selectedElement?.data?.startTime])

  useEffect(() => {
    if(!Boolean(selectedElement)){
      return
    }
    const tempData = {
      ...selectedElement?.data,
      startTime,
      endTime,
      label
    }
    // console.log(selectedElement)
    // console.log({...selectedElement, data: tempData})
    updateElement( {...selectedElement, data: tempData} )
  },[label, startTime, endTime])






  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };



  return (
    <div>
        <div key={'right'}  >
          <Drawer
            anchor={'right'}
            open={Boolean(selectedElement)}
            onClose={ async () => { 
              await toggleDrawer('right', false)
              
            }}
            variant={'persistent'}
          >
            <StyledBox
              onClick={toggleDrawer('right', false)}
              onKeyDown={toggleDrawer('right', false)}
            >
            <StyledTextareaAutosize
              aria-label="minimum height"
              minRows={3}
              value={label}
              onChange={(e: any) => {setLabel(e.target.value);}}
              placeholder="Enter your label text here..."
            />
            <div>

              <StyledTypography variant='caption' >
                <b> Start Time: </b> 
              </StyledTypography>
              <input style={{background: 'transparent', border: "none" }}  type='number' value={startTime} onChange={(e: any) => setStartTime(e.target.value) } />
            </div>
            <div>
              <StyledTypography variant='caption' >
                <b> End Time: </b> 
              </StyledTypography>
              <input style={{background: 'transparent', border: "none" }} type='number' value={endTime} onChange={(e: any) => setEndTime(e.target.value) } />
            </div>
            {/* <YouTube  videoId={url.split('=')[1] } className='youtube-player' opts={options}/> */}
            <StyledTypography variant='caption' >
              <b> Node ID: </b> {selectedElement?.id}
            </StyledTypography>

            </StyledBox>
          </Drawer>
        </div>
    </div>
  );
}