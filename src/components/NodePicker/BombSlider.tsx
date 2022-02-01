import {FC, useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import IconButton from '@mui/material/IconButton';
import {useDocument} from '../../context/docmentContext'
import { useEffect } from 'react';


const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});


export const VideoPlayerSlider:FC = () => {
  const theme = useTheme();
  const {documentDataControler, diagramControler} = useDocument()!
  const { selectedElement } = diagramControler
  const { updateElement } = documentDataControler
  const [position, setPosition] = useState<number[]>([0, 0]);
  const [view, setView] = useState<number[]>([0, 1800]);


    useEffect(() => {
        setPosition([selectedElement?.data?.startTime, selectedElement?.data?.endTime])
    },[selectedElement])


    useEffect(() => {
        const tempData = {
            ...selectedElement?.data,
            startTime: position[0], 
            endTime: position[1]
          }
        updateElement({ ...selectedElement,data: tempData})
    },[position, selectedElement, updateElement])
  const handleChange = (event: Event, newValue: number | number[]) => {

    setPosition(newValue as number[]);
  };

  const handleViewChange = (direction: "positive" | "negative" ) => {
      if(direction === "positive"){
          setView([view[0]+60, view[1]+60]);
      }
      else if(direction === "negative") {
        setView([view[0]-60, view[1]-60]);
      }
  };
  
  function formatDuration(value: number) {
    const hour = Math.floor(value / 1800);
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${hour}:${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }
//   const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
//   const lightIconColor =
//     theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  return (
         <Box
          sx={{
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'space-between',
            // mt: -2,
        }}
        >
         <Box  sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: "row",width: '100%',}}>
         <IconButton onClick={() => handleViewChange("negative")}>
            <ArrowLeftIcon/>
         </IconButton>


        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={view[0]}
          valueLabelDisplay={"auto"}
          valueLabelFormat={formatDuration}
          step={1}
          max={view[1]}
          onChange={handleChange}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            height: 40,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              color: "white",
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
            //   opacity: 0.18,
              border: "dashed 1px black",
              height: 40,
            },
            '& .MuiSlider-track': {
                height: 40,
              },
          }}
        />
        <IconButton onClick={() => handleViewChange("positive")} >
            <ArrowRightIcon/>
        </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            mt: -1,
        }}
        >
          <TinyText>{formatDuration(view[0])}</TinyText>
          <TinyText>{formatDuration(view[1])}</TinyText>
        </Box>
        </Box>
        
  );
}