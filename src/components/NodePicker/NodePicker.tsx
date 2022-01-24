import {FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import YouTube, {PlayerVars, Options} from 'react-youtube';
import { useDocument } from '../../context';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import {banned, point, focus } from '../../assets'


type Anchor = 'top' | 'right' | 'bottom' | 'right';
interface INodePicker {
  
}

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
        <div key={'right'}>
          <Drawer
            anchor={'right'}
            open={Boolean(selectedElement)}
            onClose={ async () => { 
              await toggleDrawer('right', false)
              
            }}
            variant={'persistent'}
          >
            <Box
              style={{display: 'flex', flexDirection: 'column', padding: 10}}
              onClick={toggleDrawer('right', false)}
              onKeyDown={toggleDrawer('right', false)}
            >
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              value={label}
              onChange={(e: any) => {setLabel(e.target.value);}}
              placeholder="Enter your label text here..."
              style={{ maxWidth: 200, maxHeight: 50, minWidth: 200, minHeight: 50, border: 'none', resize: 'none' }}
            />
            <div>

              <Typography variant='caption' style={{color: 'grey'}}>
                <b> Start Time: </b> 
              </Typography>
              <input type='number' value={startTime} onChange={(e: any) => setStartTime(e.target.value) } />
            </div>
            <div>
              <Typography variant='caption' style={{color: 'grey'}}>
                <b> End Time: </b> 
              </Typography>
              <input type='number' value={endTime} onChange={(e: any) => setEndTime(e.target.value) } />
            </div>
            {/* <YouTube  videoId={url.split('=')[1] } className='youtube-player' opts={options}/> */}
            <Typography variant='caption' style={{color: 'grey'}}>
              <b> Node ID: </b> {selectedElement?.id}
            </Typography>

            </Box>
          </Drawer>
        </div>
    </div>
  );
}