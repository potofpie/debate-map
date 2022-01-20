import {FC, useState, useEffect, useRef} from 'react';
import ReactFlow, { Controls, ControlButton, addEdge, removeElements, useStore, useZoomPanHelper} from 'react-flow-renderer';
import { DateTime } from 'luxon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faProjectDiagram, faCloudDownloadAlt, faFileImport } from '@fortawesome/free-solid-svg-icons'
import {NodePicker} from '../NodePicker'
import stringHash from "string-hash";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {debate} from '../../assets';
import Modal from '@mui/material/Modal';
import Draggable from 'react-draggable'; // The default

import ReactPlayer from 'react-player'



interface test {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
}




const elementsTemp = [
  {
    id: '1',
    data: 
    { 
        label: 'People think about the movie when they hear titanic and this clouds there judgment.',
        startTime: 60,
        endTime: 65,
    },

    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: 
    { 
        label: 'It is actually trama based mind control.',
        startTime: 80,
        endTime: 85,
    },

    position: { x: 300, y: 300 },
  },
  { id: 'e2-4', source: '1', target: '2' }

];

export const DiagramPlayground:FC = () => {

    const typlayer = useRef();
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const { zoomIn, zoomOut, setCenter } = useZoomPanHelper();
    const store = useStore();


    const focusNode = (curr: any) => {
        const { nodes } = store.getState();
        if (nodes.length) {
            const node = nodes[0];
            const foundNodes = nodes?.filter((n: any) => n?.data.startTime ===  Math.floor(curr)) 
            // console.log(foundNodes)
            const focusNode = foundNodes?.length != 0 ? foundNodes[0] : undefined
            
            if(!focusNode)
                return
            console.log(focusNode)

    
            const x = focusNode.__rf.position.x + focusNode.__rf.width / 2;
            const y = focusNode.__rf.position.y + focusNode.__rf.height / 2;
            const zoom = 1.85;
        
            setCenter(x, y, zoom);
        }
      };

    const [filename, setFilename] = useState<any>('Did the titanic sink? 🚢');

    const [url, setUrl] = useState<any>('https://www.youtube.com/watch?v=q6NnCiosNwE');
    const [elements, setElements] = useState<any>(elementsTemp);
    const [selectedElementId, setSelectedElementId] = useState();
    const ref = useRef();


    const [downloadLink, setDownloadLink] = useState('')
    const onElementsRemove = (elementsToRemove: any) => setElements((els: any) => removeElements(elementsToRemove, els));
    const onConnect = (params: any) => setElements((els: any) => addEdge(params, els));

  
    // const focusNode = () => {
    //   const { nodes } = store.getState();
  
    //   if (nodes.length) {
    //     const node = nodes[0];
  
    //     const x = node.__rf.position.x + node.__rf.width / 2;
    //     const y = node.__rf.position.y + node.__rf.height / 2;
    //     const zoom = 1.85;
  
    //     setCenter(x, y, zoom);
    //   }
    // };

    useEffect(() => {
        exportToFile()
    },[JSON.stringify(elements)])
    


    const addElement = () => {
        const myDateTime = DateTime.now()
        const myDateTimeISO = myDateTime.toISO()
        const temp = {
            id: String(stringHash(myDateTimeISO)),
            data: {
                label: 'Enter text here!',         
                startTime: 0,
                endTime: 15, 
            },
            position: { x: 250, y: 250 },
        }
        setElements([...elements, temp])
    }

    const importFile = () => {
        alert("import the file here!")
    }

    const exportToFile = () => {
        const data = new Blob([JSON.stringify(elements)], { type: 'text/plain' })
        if (downloadLink !== '') window.URL.revokeObjectURL(downloadLink)
        setDownloadLink(window.URL.createObjectURL(data))
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return (
        <>
           { isPlaying &&      <Draggable
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        // bounds={{ left: '-100vw', right: 0 }}
        // position={0}
        // onDrag={handleDrag}
        children={(
          <Modal
        open={isPlaying}
        hideBackdrop={true}
        onClose={() => setIsPlaying(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className='handle' style={{width: '100%', height: 40, backgroundColor: 'red'}}/>
            <ReactPlayer controls={true} onProgress={(state: test) => focusNode(state?.playedSeconds)} url={url} />
        </Box>
      </Modal> )}
           
           />



           
           
        //    <YouTube  onStateChange={(event: any) => {
        //        const {target, data} = event
        //        console.log({target, data})

        //    }} videoId={url.split('=')[1] } className='youtube-player' /> 
    }
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
                            <img src={debate} style={{height: 35, width: 35, }} />
                        </IconButton>
                    </Tooltip>
                    <div style={{display: 'flex', height: 'calc(100%)', flexDirection: 'column',  }}>
                        <input placeholder='Name this document!' value={filename}  onChange={(e: any) => setFilename(e.target.value)}  style={{marginTop: 5, fontSize: 16, backgroundColor: 'transparent', border: 'none' }}/>
                        <input value={url} onChange={(e: any) => setUrl(e.target.value)} placeholder='YT URL' style={{margin: 5, fontSize: 10, backgroundColor: 'transparent',   border: 'none' }} />
                    </div>
                    
                    </Toolbar>
                </AppBar>
            </Box>
            <NodePicker url={url} selectedElement={elements?.filter((e: any ) => e?.id === selectedElementId )[0]} setElements={setElements} elements={elements}/>
            <ReactFlow
                style={{height: 'calc(100% - 64px)'}}
                elements={elements}
                onElementsRemove={onElementsRemove}
                onConnect={onConnect}
                onClickCapture={(event: any) => setSelectedElementId(event.target.getAttribute('data-id')) }
            >
                <Controls style={{float: 'right'}}>
                    <ControlButton onClick={() => addElement()}>
                    <FontAwesomeIcon icon={faProjectDiagram} />
                    </ControlButton>
                    <a
                    download='debate-map.json'
                    href={downloadLink}
                    >
                    <ControlButton>
                        <FontAwesomeIcon icon={faCloudDownloadAlt} />
                    </ControlButton>
                </a>
                <ControlButton onClick={() => importFile()}>
                    <FontAwesomeIcon icon={faFileImport} />
                </ControlButton>
                </Controls>
            </ReactFlow>
        </>
    );
}

