import {FC, useState} from 'react';
import ReactFlow, { Controls, ControlButton } from 'react-flow-renderer';
// import ReactPlayer from 'react-player';
import {DateTime } from 'luxon';
import {uid} from 'react-uid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons'




const elementsTemp = [
  {
    id: '1',
    type: 'input', 
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
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
  {
    id: '4',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 50, y: 250 },
  },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },

];

export const App:FC = () => {

  
  const [elements, setElements] = useState(elementsTemp);

  const addElement = () => {
    
    const myDateTime = DateTime.now()
    const myDateTimeISO = myDateTime.toISO()

    const temp = {
      id: uid(myDateTimeISO),
      type: 'output',
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    }
    setElements([...elements, temp])

  }
  
  return (
    
    
    <div className='App' >
    <ReactFlow elements={elements} >
      <Controls>
      <ControlButton onClick={() => addElement()}>
        <FontAwesomeIcon icon={faProjectDiagram} />
      </ControlButton>
      </Controls>

    </ReactFlow>
  </div>
);
}

