import React, {useEffect} from 'react'
import {useDropzone} from 'react-dropzone'

function MyDropzone({setFile}) {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        maxFiles : 1,
        accept: 'image/jpeg, image/png',
        onDrop: acceptedFiles => {
            debugger;
            setFile(acceptedFiles[0]);
            console.log('acceptedFiles', acceptedFiles);
        }
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
            <>
                <section className="container">
                    <div {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} />
                        <p>Arrastre y suelte algunos archivos aquí, o haga clic para seleccionar archivos</p>
                    </div>
                    <aside>
                        <h4>Files</h4>
                        <ul>{files}</ul>
                    </aside>
                </section>
            </>
        );
    }

export default MyDropzone;
