import {FC} from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Draggable from 'react-draggable'; // The default
import ReactPlayer from 'react-player'
import {useDocument} from '../../context/docmentContext'
import { styled } from '@mui/system';

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid #000;
    box-shadow: 24px;
    padding: 10px;
    background-color: white;

`


const Handle = styled('div')`
    width: 100%; 
    height: 40px; 
    background-color: red;
`




export const VideoPlayer:FC = () => {
    const { documentPlayerControler, documentDataControler, diagramControler } = useDocument()!;
    const { isPlaying, setIsPlaying} = documentPlayerControler;
    const { url } =  documentDataControler;
    const { focusNode } =  diagramControler;


    

    return (
        <Draggable
            handle="#handle"
            defaultPosition={{ x: 0, y: 0 }}
            children={(
                <Modal
                    open={isPlaying}
                    hideBackdrop={true}
                    onClose={() => setIsPlaying(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                <StyledBox>
                    <Handle id='handle'/>
                    <ReactPlayer controls={true} onProgress={(state: any) => focusNode(state?.playedSeconds)} url={url} />
                </StyledBox>
                </Modal> 
            )}
           
           />

    );
}

