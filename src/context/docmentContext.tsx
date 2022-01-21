import { createContext, useContext, useState, FC } from 'react'
import { useStore, useZoomPanHelper} from 'react-flow-renderer';
import { elementsTemp } from '../mockdata/index'


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

}

interface DiagramControler {
    focusNode: Function;

    setSelectedElementId: Function; 
    selectedElementId: any | undefined;
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
    const [selectedElementId, setSelectedElementId] = useState();
    const [elements, setElements] = useState<any>(elementsTemp);



    const { setCenter } = useZoomPanHelper();
    const store = useStore();
    const focusNode = (curr: any) => {
        const { nodes } = store.getState();
        if (nodes.length) {
            const foundNodes = nodes?.filter((n: any) => n?.data.startTime ===  Math.floor(curr)) 
            const focusNode = foundNodes?.length !== 0 ? foundNodes[0] : undefined
            
            if(!focusNode)
                return
            console.log(focusNode)

    
            const x = focusNode.__rf.position.x + focusNode.__rf.width / 2;
            const y = focusNode.__rf.position.y + focusNode.__rf.height / 2;
            const zoom = 1.85;
        
            setCenter(x, y, zoom);
        }
      };

    const documentPlayerControler: DocumentPlayerControler    = { setIsPlaying, isPlaying}
    const documentDataControler: DocumentDataControler    = { setUrl, url, setFilename, filename, elements, setElements}
    const diagramControler: DiagramControler = { focusNode, selectedElementId, setSelectedElementId}


    
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
