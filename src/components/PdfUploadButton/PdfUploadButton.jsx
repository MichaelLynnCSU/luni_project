import React, { useState } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div` = styled.
    color: black;
    font-size: 24px;
    display: inline-block;
    padding: 10px 20px;
    font-weight: bold;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: purple;
    }

    input[type=button] {
        background-color: lightgray;
        border: 0;
        border-radius: 4px;
        align-content: center;
        padding: .5em 2em;
    }
    & + div {
        display: inline-block;
        padding: 8px 16px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        &:hover {
            background-color: #0056b3;
        }
    `;
/*
*


    #myFileInput {
        display: none;
    }

.label {
        display: block;
        margin-top: .5em;
    }
* */

const PdfUploadButton = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            // You can also perform additional actions here, like updating the state or calling a function to handle the file
        }
    };

    return (
        <StyledDiv>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            {selectedFile && <p>File selected: {selectedFile.name}</p>}
        </StyledDiv>
    );
};

export default PdfUploadButton;
