import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { Dragger } from 'antd';
import PdfUploadForm from './PdfUploadForm';
import ResultComponent from '../ResultComponent/ResultComponent';
import axios from 'axios';
import { getFirebaseApp } from '../../../__mocks__/firebaseMock';

configure({ adapter: new Adapter() });

jest.mock('axios'); // Mock axios for API calls

describe('PdfUploadForm Component', () => {
  it('submits form and shows ResultComponent after successful submission', async () => {
    // ...

    // Define the setPDF function
    const setPDF = jest.fn();

    // Define the setResumeData function
    const setResumeData = jest.fn();

    // Define the setOriginalFile function
    const setOriginalFile = jest.fn();

    // Shallow render PdfUploadForm with mocked props
    const wrapper = shallow(
      <PdfUploadForm
        setPDF={setPDF}
        setResumeData={setResumeData}
        setOriginalFile={setOriginalFile}
        firebaseApp={getFirebaseApp()} // Pass the mocked Firebase app instance
      />
    );

    // ...
  });

  // ...
});