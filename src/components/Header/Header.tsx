import {FC} from 'react';
// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

// import Divider from '@mui/material/Divider';
// import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import {debate} from '../../assets';
import {useDocument} from '../../context/docmentContext'
import { styled } from '@mui/system';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';




const HeaderInput = styled('div')`
    display: flex;
    height: calc(100%);
    justify-content: center;
    // align-items: center;
    flex-direction: column;
`


const URLInput = styled('input')`
  margin: 5px; 
  font-size: 10px; 
  background-color: transparent;   
  border: none;
`

const TitleInput = styled('input')`
    margin-top: 5px; 
    font-size: 16px; 
    background-color: transparent;
    border: none;
`


// const PlayButtion = styled('img')`
//     height: 35px; 
//     width: 35px; 
// `

export const Header:FC = () => {
    const { documentPlayerControler, documentDataControler  } = useDocument()!;
    const { isPlaying, setIsPlaying } = documentPlayerControler;
    const { url, setUrl, filename, setFilename } = documentDataControler;


    return (
            <Box sx={{display: 'flex', flexGrow: 1, height: '54px', paddingLeft: '20px', paddingRight: '20px', backgroundColor: '#f6f8fa'  }}>
                {/* <AppBar position="static"> */}
                    {/* <Toolbar> */}
                    <Tooltip title="▶️ Play!" placement="bottom">
                        <IconButton
                                edge="start"
                                aria-label="menu"
                                // sx={{ mr: 2 }}
                                onClick={() => setIsPlaying(!isPlaying)}
                            >
                            <PlayCircleIcon/>
                        </IconButton>
                    </Tooltip>

                    <HeaderInput >
                        <TitleInput placeholder='Name this document!' value={filename}  onChange={(e: any) => setFilename(e.target.value)}  />
                        <URLInput value={url} onChange={(e: any) => setUrl(e.target.value)} placeholder='YT URL' 
                         />
                    </HeaderInput>
                    {/* </Toolbar> */}
                {/* </AppBar> */}
            </Box>
    );
}

