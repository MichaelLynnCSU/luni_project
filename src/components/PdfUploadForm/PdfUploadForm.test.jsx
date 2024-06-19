import React from 'react';
import { shallow } from 'enzyme';
import PdfUploadForm from './PdfUploadForm';
import ResultComponent from '../ResultComponent/ResultComponent'; // Import your ResultComponent
import axios from 'axios'; // Import axios for mocking API calls

jest.mock('axios'); // Mock axios for API calls

describe('PdfUploadForm Component', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mock function calls after each test
  });

  it('submits form and shows ResultComponent after successful submission', async () => {
    // Mock axios post method to simulate successful API call
    axios.post.mockResolvedValue({ data: { userData: { name: 'John Doe' } } });

    // Mock useState and useEffect
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

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
    wrapper.find('Dragger').props().onChange({ fileList: [{ originFileObj: file }] });

    // Simulate form submission
    wrapper.find('.submit-button').simulate('click');

    // Expect that handleSubmit function is called
    expect(setState).toHaveBeenCalledWith(true); // Ensure setState was called with true

    // Check if ResultComponent is rendered after submission
    expect(wrapper.find(ResultComponent)).toHaveLength(1);

    // Check if setPDF and setResumeData were called with expected values
    await Promise.resolve(); // Resolve any pending promises (e.g., axios calls)
    expect(setPDF).toHaveBeenCalledWith(expect.stringContaining('data:image/jpeg;base64'));
    expect(setResumeData).toHaveBeenCalledWith({ name: 'John Doe' });

    // Clean up
    useStateSpy.mockRestore();
  });

  // Add more tests for error handling, edge cases, etc.
});
