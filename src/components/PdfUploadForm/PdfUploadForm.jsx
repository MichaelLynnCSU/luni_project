import React from 'react';
import { useState, useCallback } from 'react';
import { Upload, message, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './PdfUploadForm.scss';
import gsap from 'gsap';
import ResultComponent from '../ResultComponent/ResultComponent.jsx';
import * as pdfjsLib from 'pdfjs-dist';
import axios from 'axios';
import { getApps, initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebaseConfig from '../../firebaseauth';

pdfjsLib.GlobalWorkerOptions.workerSrc = '../../node_modules/pdfjs-dist/build/pdf.worker.min.js';

const { Dragger } = Upload;

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const storage = getStorage(app);
const storageRef = ref(storage);

const useFileHandler = () => {
  const [fileList, setFileList] = useState([]);

  const beforeUpload = useCallback((file) => {
    const isPdf = file.type === 'application/pdf';
    if (!isPdf) {
      message.error(`${file.name} is not a pdf file`);
      return Upload.LIST_IGNORE;
    }
    return isPdf;
  }, []);

  const onChange = useCallback((info) => {
    const { originFileObj } = info.file;
    console.log('Handling file change:', originFileObj);
    setFileList([...info.fileList]);
  }, []);

  return { fileList, beforeUpload, onChange };
};

const PdfUploadForm = ({ setPDF, setResumeData, setOriginalFile }) => {
  const [submitted, setSubmitted] = useState(false);
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

  const convertPdfToBase64Image = useCallback(async (file) => {
    try {
      setOriginalFile(file);
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = async (event) => {
        const typedArray = new Uint8Array(event.target.result);
        const loadingTask = pdfjsLib.getDocument({ data: typedArray });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport: viewport }).promise;
        const base64Image = canvas.toDataURL('image/jpeg');
        const data = await axios.post("http://localhost:3001/api/api/scrapeResume", {
          resumeData: base64Image.replace("data:*/*;base64,", "")
        });
        setResumeData(data.data.userData);
        console.log("Resume data from PDFuploadform.jsx func : ", data.data.userData);
        setPDF(base64Image.replace("data:*/*;base64,", ""));
      };
    } catch (error) {
      console.error('Error converting PDF to base64 image:', error);
      message.error('Failed to convert PDF');
    }
  }, [setOriginalFile, setPDF, setResumeData]);

  const handleSubmit = useCallback(() => {
    console.log('Submit button clicked');
    if (fileList.length > 0) {
      convertPdfToBase64Image(fileList[0].originFileObj);
    }
    gsap.to('.upload-container', {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      onComplete: () => setSubmitted(true)
    });
  }, [fileList, convertPdfToBase64Image]);

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: '.pdf',
    action: '',
    beforeUpload,
    onChange,
    onDrop: (e) => console.log('Dropped files', e.dataTransfer.files),
    fileList,
  };

  return submitted ? (
    <ResultComponent />
  ) : (
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
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PdfUploadForm;