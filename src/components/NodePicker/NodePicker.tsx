import {FC, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import YouTube, {PlayerVars, Options} from 'react-youtube';


type Anchor = 'top' | 'right' | 'bottom' | 'right';
interface INodePicker {
  selectedElement: any;
  elements: any; 
  setElements: Function;

}
export const NodePicker:FC<INodePicker> = ({selectedElement, elements, setElements }) => {
  const findElement = (element: any) => element?.id === selectedElement?.id;
  const [label, setLabel] = useState()
  const [startTime, setStartTime] = useState(selectedElement?.data?.startTime)
  const [endTime, setEndTime] = useState(selectedElement?.data?.endTime)
  const playerVars: PlayerVars = {
    // autoplay: 1,
    start: startTime,
    end: endTime,

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
    const elementIndex =  elements.findIndex(findElement);
    const temp = elements;

    if(temp[elementIndex]){
      temp[elementIndex].data.label = label;
      setElements(temp);
    }
  },[label])

  useEffect(() => {
    const elementIndex =  elements.findIndex(findElement);
    const temp = elements;
    if(temp[elementIndex]){
      temp[elementIndex].data.startTime = startTime;
      setElements(temp);
    }
  },[startTime])

  useEffect(() => {
    const elementIndex =  elements.findIndex(findElement);
    const temp = elements;
    if(temp[elementIndex]){
      temp[elementIndex].data.endTime = endTime;
      setElements(temp);
    }
  },[endTime])






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
      {/* {(['right', 'right', 'top', 'bottom'] as const).map((anchor) => ( */}
        <div key={'right'}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer
            anchor={'right'}
            open={selectedElement}
            onClose={ async () => { 
              await toggleDrawer('right', false)
              
            }}
            variant={'persistent'}
          >
            <Box
              // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
              style={{display: 'flex', flexDirection: 'column', padding: 10}}
              onClick={toggleDrawer(selectedElement, false)}
              onKeyDown={toggleDrawer(selectedElement, false)}
            >

            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              value={label}
              onChange={(e: any) => {


                setLabel(e.target.value)
  

              }
               }
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
            <YouTube  videoId="q6NnCiosNwE" className='youtube-player' opts={options}/>
            <Typography variant='caption' style={{color: 'grey'}}>
              <b> Node ID: </b> {selectedElement?.id}
            </Typography>

            </Box>
          </Drawer>
        </div>
      {/* ))} */}
    </div>
  );
}