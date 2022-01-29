import {FC, useEffect, useState } from 'react';
import ReactFlow, { Controls, addEdge, removeElements} from 'react-flow-renderer';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faProjectDiagram,  } from '@fortawesome/free-solid-svg-icons'
// ControlButton,
import { SuportingNode, OpossingNode, IdeaNode, InsufficientNode} from './index';

import {useDocument} from '../../context/docmentContext';
import { styled } from '@mui/system';;





const StyledControls = styled(Controls)`
    float: right;
`
const StyledReactFlow = styled(ReactFlow)`
    height: calc(100% - 64px);
`


export const ReactFlowContainer:FC = () => {
    const { diagramControler, documentDataControler } = useDocument()!
    const { setSelectedElement  } = diagramControler
    const {elements, setElements, findElementByID} = documentDataControler    
    const onElementsRemove = (elementsToRemove: any) => setElements((els: any) => removeElements(elementsToRemove, els));
    const onConnect = (params: any) => setElements((els: any) => addEdge(params, els));

    const [receivedElements, setReceivedElements]  = useState([]);


    useEffect(()=>{
        console.log(elements)
        setReceivedElements(elements)

    },[setReceivedElements, elements])
    
    return (

            <StyledReactFlow
                nodeTypes={{ SuportingNode, OpossingNode, IdeaNode, InsufficientNode}}
                elements={receivedElements}
                onElementsRemove={onElementsRemove}
                onConnect={onConnect}
                onClickCapture={(event: any) => { console.log(event.target.getAttribute('data-id')); setSelectedElement(findElementByID(event.target.getAttribute('data-id'))) }}
            >
                <StyledControls>
                    {/* <ControlButton onClick={() => addElement()}>
                    <FontAwesomeIcon icon={faProjectDiagram} />
                    </ControlButton> */}
                </StyledControls>
            </StyledReactFlow>
    );
}

