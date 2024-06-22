import React from 'react';
import { shallow } from 'enzyme';
import { Dragger } from 'antd';
import PdfUploadForm from './PdfUploadForm';
import ResultComponent from '../ResultComponent/ResultComponent';
import axios from 'axios';

jest.mock('axios'); // Mock axios for API calls

describe('PdfUploadForm Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('submits form and shows ResultComponent after successful submission', async () => {
    // Mock axios post method to simulate successful API call
    axios.post.mockResolvedValue({ data: { userData: { name: 'John Doe' } } });

    // Mock useState and useEffect (optional if not directly used in PdfUploadForm)
    const setState = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation((initialState) => [initialState, setState]);

    // Mock setPDF, setResumeData, and setOriginalFile props
    const setPDF = jest.fn();
    const setResumeData = jest.fn();
    const setOriginalFile = jest.fn();

    // Shallow render PdfUploadForm with mocked props
    const wrapper = shallow(
      <PdfUploadForm
        setPDF={setPDF}
        setResumeData={setResumeData}
        setOriginalFile={setOriginalFile}
      />
    );

    // Simulate file upload (PDF file)
    const file = new File([''], 'example.pdf', { type: 'application/pdf' });
    wrapper.find(Dragger).prop('onChange')({ fileList: [{ originFileObj: file }] });

    // Simulate form submission
    wrapper.find('.submit-button').simulate('click');

    // Wait for the form submission to complete
    await new Promise((resolve) => setTimeout(resolve));

    // Expect that handleSubmit function is called
    expect(setState).toHaveBeenCalledWith(true); // Ensure setState was called with true

    // Check if ResultComponent is rendered after submission
    wrapper.update(); // Update wrapper to reflect changes

    expect(wrapper.find(ResultComponent)).toHaveLength(1);

    // Check if setPDF and setResumeData were called with expected values
    expect(setPDF).toHaveBeenCalledWith(expect.any(String)); // You can mock the base64 string if needed
    expect(setResumeData).toHaveBeenCalledWith({ name: 'John Doe' });

    // Clean up
    jest.restoreAllMocks(); // Restore all mocks
  });

  // Add more tests for error handling, edge cases, etc.
});