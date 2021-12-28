import {FC, useState, useEffect} from 'react';
import ReactFlow, { Controls, ControlButton, addEdge, removeElements } from 'react-flow-renderer';
// import ReactPlayer from 'react-player';
import {DateTime } from 'luxon';
import {uid} from 'react-uid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faProjectDiagram, faCloudDownloadAlt, faFileImport } from '@fortawesome/free-solid-svg-icons'
import {NodePicker} from '../NodePicker'
// import useDeepCompareEffect from 'use-deep-compare-effect'




const elementsTemp = [
  {
    id: '1',
    data: { label: 'The guy said we need to so something' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
  {
    id: '4',
    data: { label: 'Output Node' },
    position: { x: 50, y: 250 },
  },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },

];

export const DiagramPlayground:FC = () => {
    const [elements, setElements] = useState(elementsTemp);
    const [selectedElementId, setSelectedElementId] = useState();

    const [downloadLink, setDownloadLink] = useState('')
    const onElementsRemove = (elementsToRemove: any) => setElements((els) => removeElements(elementsToRemove, els));
    const onConnect = (params: any) => setElements((els) => addEdge(params, els));

    useEffect(() => {
        exportToFile()
    },[JSON.stringify(elements)])


    const addElement = () => {
        const myDateTime = DateTime.now()
        const myDateTimeISO = myDateTime.toISO()

        const temp = {
            id: uid(myDateTimeISO),
            data: { label: 'Output Node' },
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
        <NodePicker selectedElement={elements?.filter((e: any ) => e?.id === selectedElementId )[0] }/>
        <ReactFlow 
            elements={elements}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            onClickCapture={(event: any) => setSelectedElementId(event.target.getAttribute('data-id')) }
        >
            <Controls>
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

