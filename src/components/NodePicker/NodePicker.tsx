import {FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import Cross from '@mui/icon/Cross';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import YouTube, {PlayerVars, Options} from 'react-youtube';
import { VideoPlayerSlider } from './BombSlider'
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
  const { selectedElement, setSelectedElement } = diagramControler
  const { updateElement, url } = documentDataControler
  const [position, setPosition] = useState<number[]>([0, 0]);

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
              <StyledTypography variant='caption'  >
              <IconButton style={{float: "right"}}  onClick={() => {
                setSelectedElement(false)
                const tempData = {
                  ...selectedElement?.data,
                  startTime: position[0],
                  endTime: position[1],
                  label
                }
                updateElement( {...selectedElement, data: tempData} )
              }}>
                <CloseIcon/>
              </IconButton>                         
                Node ID:  {selectedElement?.id}
              </StyledTypography>
              <YouTube  videoId={url.split('=')[1] } className='youtube-player' opts={options}/>
              <VideoPlayerSlider setPosition={setPosition} position={position} />
              <StyledTextareaAutosize
                aria-label="minimum height"
                minRows={3}
                value={label}
                onChange={(e: any) => {setLabel(e.target.value);}}
                placeholder="Enter your label text here..."
              />
            </StyledBox>


          </Drawer>
        </div>
    </div>
  );
}