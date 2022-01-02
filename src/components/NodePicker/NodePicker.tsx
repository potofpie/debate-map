import {FC, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';

type Anchor = 'top' | 'right' | 'bottom' | 'right';
interface INodePicker {
  selectedElement: any;
  elements: any; 
  setElements: Function;

}
export const NodePicker:FC<INodePicker> = ({selectedElement, elements, setElements }) => {
  const findElement = (element: any) => element?.id === selectedElement?.id;
  const [label, setLabel] = useState()
  
  useEffect(() => {
    setLabel(selectedElement?.data?.label)
  },[selectedElement?.data?.label])

  useEffect(() => {
      const elementIndex =  elements.findIndex(findElement);
      const temp = elements;
      if(temp[elementIndex]){
        console.log(temp[elementIndex])
        temp[elementIndex].label = label
        console.log(temp[elementIndex])
        console.log(elements)

        setElements(temp)
      }
  },[label])





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
            <Typography variant='caption' style={{color: 'grey'}}>
              Node ID: {selectedElement?.id}
            </Typography>

            </Box>
          </Drawer>
        </div>
      {/* ))} */}
    </div>
  );
}