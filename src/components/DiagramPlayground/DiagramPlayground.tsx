import {FC, useState, useEffect} from 'react';
import ReactFlow, { Controls, ControlButton, addEdge, removeElements } from 'react-flow-renderer';
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





const elementsTemp = [
  {
    id: '1',
    data: 
    { 
        label: 'People think about the movie when they hear titanic and this clouds there judgment.',
        startTime: 100,
        endTime: 105,
    },

    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: 
    { 
        label: 'It is actually trama based mind control.',
        startTime: 105,
        endTime: 120,
    },

    position: { x: 300, y: 300 },
  },
  { id: 'e2-4', source: '1', target: '2' }

];

export const DiagramPlayground:FC = () => {
    const [filename, setFilename] = useState<any>('Did the titanic sink? 🚢');

    const [url, setUrl] = useState<any>('https://www.youtube.com/watch?v=q6NnCiosNwE');
    const [elements, setElements] = useState<any>(elementsTemp);
    const [selectedElementId, setSelectedElementId] = useState();

    const [downloadLink, setDownloadLink] = useState('')
    const onElementsRemove = (elementsToRemove: any) => setElements((els: any) => removeElements(elementsToRemove, els));
    const onConnect = (params: any) => setElements((els: any) => addEdge(params, els));

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

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <Tooltip title="▶️ Play!" placement="bottom">
                    <IconButton
                        // size="large"
                        edge="start"
                        // color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
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

