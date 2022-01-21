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
import { ReactFlowContainer } from '../ReactFlowContainer';







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

    const { documentDataControler, diagramControler  } = useDocument()!;
    const { url, elements, setElements  } = documentDataControler;
    const {selectedElementId }= diagramControler;
    // const [elements, setElements] = useState<any>(elementsTemp);
    


    return (
        <>
            <VideoPlayer/>
            <Header/>
            <NodePicker url={url} selectedElement={elements?.filter((e: any ) => e?.id === selectedElementId )[0]} setElements={setElements} elements={elements}/>
            <ReactFlowContainer/>
        </>
    );
}

