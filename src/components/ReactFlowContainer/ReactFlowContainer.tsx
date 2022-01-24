import {FC, useEffect, useState } from 'react';
import ReactFlow, { Controls, ControlButton, addEdge, removeElements} from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faProjectDiagram,  } from '@fortawesome/free-solid-svg-icons'
import {useDocument} from '../../context/docmentContext'


export const ReactFlowContainer:FC = () => {
    const { diagramControler, documentDataControler } = useDocument()!
    const { setSelectedElement  } = diagramControler
    const {elements, setElements, addElement, findElementByID} = documentDataControler    
    const onElementsRemove = (elementsToRemove: any) => setElements((els: any) => removeElements(elementsToRemove, els));
    const onConnect = (params: any) => setElements((els: any) => addEdge(params, els));

    const [receivedElements, setReceivedElements]  = useState([]);


    useEffect(()=>{
        console.log(elements)
        setReceivedElements(elements)
    },[JSON.stringify(elements), setReceivedElements])
    
    return (

            <ReactFlow
                style={{height: 'calc(100% - 64px)'}}
                elements={receivedElements}
                onElementsRemove={onElementsRemove}
                onConnect={onConnect}
                onClickCapture={(event: any) => setSelectedElement(findElementByID(event.target.getAttribute('data-id'))) }
            >
                <Controls style={{float: 'right'}}>
                    <ControlButton onClick={() => addElement()}>
                    <FontAwesomeIcon icon={faProjectDiagram} />
                    </ControlButton>
                </Controls>
            </ReactFlow>
    );
}

