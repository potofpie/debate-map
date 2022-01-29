import {FC} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {debate} from '../../assets';
import {useDocument} from '../../context/docmentContext'
import { styled } from '@mui/system';


const HeaderInput = styled('div')`
    display: flex;
    height: calc(100%);
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


const PlayButtion = styled('img')`
    height: 35px; 
    width: 35px; 
`

export const Header:FC = () => {
    const { documentPlayerControler, documentDataControler  } = useDocument()!;
    const { isPlaying, setIsPlaying } = documentPlayerControler;
    const { url, setUrl, filename, setFilename } = documentDataControler;


    return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <Tooltip title="▶️ Play!" placement="bottom">
                        <IconButton
                                edge="start"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={() => setIsPlaying(!isPlaying)}
                            >
                            <PlayButtion alt={'debate-logo'} src={debate}  />
                        </IconButton>
                    </Tooltip>
                    <HeaderInput >
                        <TitleInput placeholder='Name this document!' value={filename}  onChange={(e: any) => setFilename(e.target.value)}  />
                        <URLInput value={url} onChange={(e: any) => setUrl(e.target.value)} placeholder='YT URL' 
                         />
                    </HeaderInput>
                    </Toolbar>
                </AppBar>
            </Box>
    );
}

