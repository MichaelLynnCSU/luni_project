import { useState, useCallback, useEffect } from 'react'; // Import React hooks for state and effects
import { Upload, message, Button } from 'antd'; // Import Ant Design components
import { InboxOutlined } from '@ant-design/icons'; // Import Ant Design icon
import './PdfUploadForm.scss'; // Import styling
import gsap from 'gsap'; // Import GSAP for animations
import ResultComponent from '../ResultComponent/ResultComponent.jsx'; // Import result component to show after submit
import {GlobalWorkerOptions, getDocument} from 'pdfjs-dist'; // Import pdfjs to handle PDF uploading and conversion
import axios from 'axios'; // Import axios for API calls
import { getStorage, ref } from "firebase/storage";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();
// Create a storage reference from our storage service
const storageRef = ref(storage);
//E.g create reference to a specific file ; how ?
//const fileRef = ref(storage, 'resumes/example.pdf');

// Set up pdfjs worker for parsing PDFss
GlobalWorkerOptions.workerSrc = '../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs';

const {Dragger} = Upload; // Destructure the Dragger from Ant Design Upload
// Custom hook to handle file state
const useFileHandler = () => {
    const [fileList, setFileList] = useState([]); // State to store uploaded files

    // Validate file is a PDF before uploading
    const beforeUpload = useCallback((file) => {
        const isPdf = file.type === 'application/pdf';
        if (!isPdf) {
            message.error(`${file.name} is not a pdf file`);
            return Upload.LIST_IGNORE;
        }
        return isPdf;
    }, []);

    // Handler when file list changes
    const onChange = useCallback((info) => {
        const { originFileObj } = info.file;
        console.log('Handling file change:', originFileObj);
        setFileList([...info.fileList]);
    }, []);

    return { fileList, beforeUpload, onChange };
};

// Main component
// The PdfUploadForm component handles uploading a PDF resume, converting it to a
// base64 image, extracting text data through an API call, and passing the final
// PDF and resume data back via props. It uses Ant Design for the upload UI,
// pdfjs to handle PDF parsing and conversion, and axios to call the API.
// The component manages the file upload state and submits the file on button click.
// It animates out after submission and shows the result component.

const PdfUploadForm = ({ setPDF, setResumeData, setOriginalFile }) => {
    console.log("AYO WE HERE PDFUPLOADFORM.JSX");
    const [submitted, setSubmitted] = useState(false); // State to track form submission
    // Get file handlers from hook
    const { fileList, beforeUpload, onChange } = useFileHandler();

    const uploadPdfToFirebase = async (file) => {
        const storageRef = ref(storage, `resumes/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Handle upload progress
            },
            (error) => {
                console.error('Upload failed:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    // Here you can save the downloadURL to your database
                });
            }
        );
    };
    // Handle conversion of PDF to base64
    const convertPdfToBase64Image = useCallback(async (file) => {
        try {
            setOriginalFile(file); // Set original file
            // Use FileReader to read file data
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = async (event) => {
                // Convert data to Uint8Array
                const typedArray = new Uint8Array(event.target.result);
                // Get PDF doc from data
                const loadingTask = getDocument({ data: typedArray });
                const pdf = await loadingTask.promise;
                // Render page 1 of PDF to canvas element
                const page = await pdf.getPage(1);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                await page.render({ canvasContext: context, viewport: viewport }).promise;
                // Convert canvas to base64 image data
                const base64Image = canvas.toDataURL('image/jpeg');
                // Call API to extract resume data
                const data = await axios.post("http://localhost:3001/api/api/scrapeResume", {
                    resumeData: base64Image.replace("data:*/*;base64,", "")
                });
                // Set resume data and base64 PDF for submission
                setResumeData(data.data.userData);
                console.log("Resume data from PDFuploadform.jsx func : ",data.data.userData);
                setPDF(base64Image.replace("data:*/*;base64,", ""));
            };

        } catch (error) {
            console.error('Error converting PDF to base64 image:', error);
            message.error('Failed to convert PDF');
        }

    }, [setOriginalFile, setPDF, setResumeData]);

    // Handler function for form submission
    //Called when submit button clicked, Checks if any files uploaded,Converts first file to base64,Animates out upload container on complete
    // Sets submitted state to true to show result, Uses GSAP for animation,Depends on fileList and convertPdfToBase64Image

    const handleSubmit = useCallback(() => {
        console.log('Submit button clicked');
        // Check if any files uploaded
        if (fileList.length > 0) {
            // Convert first uploaded file to base64
            convertPdfToBase64Image(fileList[0].originFileObj);
        }
        // Use GSAP to animate out upload container
        // onComplete callback sets submitted state to true
        // to show ResultComponent
        gsap.to('.upload-container', {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            onComplete: () => setSubmitted(true)
        });

    }, [fileList, convertPdfToBase64Image]);

    // Upload props passed to Ant Design Dragger
    const uploadProps = {
        name: 'file', // Name for uploaded file
        multiple: false, // Only allow single file
        accept: '.pdf', // Only accept PDFs
        action: '', // Server endpoint for uploads
        beforeUpload, // Validation hook
        onChange, // File change handler
        onDrop: (e) => console.log('Dropped files', e.dataTransfer.files), // File drop handler
        fileList, // Uploaded files state
    };

// Conditionally show ResultComponent if form submitted
    return submitted ? (
        <ResultComponent />
    ) : (
        // Main upload form
        <div className={"container"}>
            <div className="upload-container">
                <h3>Upload your CV below!</h3>
                <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined className="upload-icon" />
                    </p>
                    <p className="ant-upload-text">Drag your CV here, or click to select</p>
                    <p className="ant-upload-hint">
                        {fileList.length > 0 ? 'File ready for upload!' : 'Upload your CV and let Pineapply handle your job applications!'}
                    </p>
                </Dragger>
                <Button
                    type="primary"
                    className="submit-button"
                    onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default PdfUploadForm;