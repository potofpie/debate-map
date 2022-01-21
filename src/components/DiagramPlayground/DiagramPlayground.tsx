import {FC, useState, useEffect, useCallback } from 'react';
import ReactFlow, { Controls, ControlButton, addEdge, removeElements} from 'react-flow-renderer';
import {VideoPlayer } from '../VideoPlayer'
import { DateTime } from 'luxon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faProjectDiagram, faCloudDownloadAlt, faFileImport } from '@fortawesome/free-solid-svg-icons'
import {NodePicker} from '../NodePicker'
import stringHash from "string-hash";
import {useDocument} from '../../context/docmentContext'
import {Header} from '../../components/Header'







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

    const { documentDataControler  } = useDocument()!;
    const { url  } = documentDataControler;

    const [elements, setElements] = useState<any>(elementsTemp);
    const [selectedElementId, setSelectedElementId] = useState();
    const [downloadLink, setDownloadLink] = useState('')
    
    const onElementsRemove = (elementsToRemove: any) => setElements((els: any) => removeElements(elementsToRemove, els));
    const onConnect = (params: any) => setElements((els: any) => addEdge(params, els));

    const exportToFile = useCallback(
    () => {
        const data = new Blob([JSON.stringify(elements)], { type: 'text/plain' })
        if (downloadLink !== '') window.URL.revokeObjectURL(downloadLink)
        setDownloadLink(window.URL.createObjectURL(data))
    },[elements,downloadLink])

    useEffect(() => {
        exportToFile()
    },[])
    


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




    return (
        <>
            <VideoPlayer/>
            <Header/>
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

