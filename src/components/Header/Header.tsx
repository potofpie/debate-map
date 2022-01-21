import {FC} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {debate} from '../../assets';
import {useDocument} from '../../context/docmentContext'






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
                            <img alt={'debate-logo'} src={debate} style={{height: 35, width: 35, }} />
                        </IconButton>
                    </Tooltip>
                    <div style={{display: 'flex', height: 'calc(100%)', flexDirection: 'column',  }}>
                        <input placeholder='Name this document!' value={filename}  onChange={(e: any) => setFilename(e.target.value)}  style={{marginTop: 5, fontSize: 16, backgroundColor: 'transparent', border: 'none' }}/>
                        <input value={url} onChange={(e: any) => setUrl(e.target.value)} placeholder='YT URL' style={{margin: 5, fontSize: 10, backgroundColor: 'transparent',   border: 'none' }} />
                    </div>
                    </Toolbar>
                </AppBar>
            </Box>
    );
}

