import { createContext, useContext, useState,useEffect, FC } from 'react'
import { useStore, useZoomPanHelper} from 'react-flow-renderer';
import { DateTime } from 'luxon';
import stringHash from "string-hash";




interface DocumentPlayerControler {
    isPlaying: boolean;
    setIsPlaying: Function;

}

interface DocumentDataControler  {
    url: string;
    setUrl: Function;
    
    filename: string;
    setFilename: Function;

    elements: any;
    setElements: Function;
    addElement: Function;
    updateElement: Function;
    findElementByID: Function;

}

interface DiagramControler {
    focusNode: Function;

    setSelectedElement: Function; 
    selectedElement: any | undefined;
    clearNodePicker: Function;
}

interface DocumentContextType {
    documentPlayerControler : DocumentPlayerControler
    documentDataControler: DocumentDataControler
    diagramControler: DiagramControler
}


export const DocumentContext = createContext<DocumentContextType | undefined >(undefined);


  
export const DocumentProvider:FC = ({children}) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [url, setUrl] = useState<string>('https://www.youtube.com/watch?v=q6NnCiosNwE');
    const [filename, setFilename] = useState<any>('Did the titanic sink? 🚢');
    const [selectedElement, setSelectedElement] = useState<any>();
    const loadedElements = JSON.parse( localStorage.getItem("elements") || "" ) 
    const [elements, setElements] = useState<any>( loadedElements);

    useEffect(() => {
        localStorage.setItem("elements", JSON.stringify(elements)) ;
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [JSON.stringify(elements)]);

    const clearNodePicker = () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
  
      setSelectedElement(undefined);
    };
    const { setCenter } = useZoomPanHelper();
    const store = useStore();
    const focusNode = (curr: any) => {
        const { nodes } = store.getState();
        if (nodes.length) {
            const foundNodes = nodes?.filter((n: any) => n?.data.startTime ===  Math.floor(curr)) 
            const focusNode = foundNodes?.length !== 0 ? foundNodes[0] : undefined
            
            if(!focusNode)
                return

    
            const x = focusNode.__rf.position.x + focusNode.__rf.width / 2;
            const y = focusNode.__rf.position.y + focusNode.__rf.height / 2;
            const zoom = 1.85;
        
            setCenter(x, y, zoom);
        }
      };

    const findElementByID = (id: any) => elements?.filter((e: any ) => e?.id === id )[0]
    

    const updateElement =(newElement: any) => {
        const elementIndex =  elements.findIndex((element: any) => element?.id === newElement?.id );
        const temp = elements;
        if(temp[elementIndex]){
          temp[elementIndex].position.x = newElement.position.x
          temp[elementIndex].position.y = newElement.position.y
          temp[elementIndex].data.label = newElement.data.label;
          temp[elementIndex].data.startTime = newElement.data.startTime;
          temp[elementIndex].data.endTime = newElement.data.endTime;
          setElements([...temp]);
        }
    
    }






    const addElement = (type='default') => {
        const myDateTime = DateTime.now()
        const myDateTimeISO = myDateTime.toISO()
        const temp = {
            id: String(stringHash(myDateTimeISO)),
            type: type,
            data: {
                label: 'Enter text here!',         
                startTime: 0,
                endTime: 15, 
            },
            position: { x: 250, y: 250 },
        }
        setElements([...elements, temp])
    }
    const documentPlayerControler: DocumentPlayerControler    = { setIsPlaying, isPlaying}
    const documentDataControler: DocumentDataControler    = { setUrl, url, setFilename, filename, elements, setElements, addElement, updateElement, findElementByID}
    const diagramControler: DiagramControler = { focusNode, selectedElement, setSelectedElement, clearNodePicker}


    
    return (

        <DocumentContext.Provider value={{
                documentPlayerControler,
                documentDataControler,
                diagramControler
            }}>
            {children}
        </DocumentContext.Provider>
    )
}

export const useDocument = () => useContext(DocumentContext)
