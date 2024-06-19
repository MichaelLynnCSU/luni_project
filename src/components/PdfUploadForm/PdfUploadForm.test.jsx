import React from 'react';
import { shallow } from 'enzyme';
import PdfUploadForm from './PdfUploadForm';
import ResultComponent from '../ResultComponent/ResultComponent'; // Import your ResultComponent

describe('PdfUploadForm Component', () => {
  it('submits form and shows ResultComponent after submission', () => {
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

    // Simulate file upload
    const file = new File([''], 'example.pdf', { type: 'application/pdf' });
    wrapper.find('Dragger').props().onChange({ fileList: [{ originFileObj: file }] });

    // Simulate form submission
    wrapper.find('.submit-button').simulate('click');

    // Expect that handleSubmit function is called
    expect(setState).toHaveBeenCalledWith(true); // Ensure setState was called with true

    // Check if ResultComponent is rendered after submission
    expect(wrapper.find(ResultComponent)).toHaveLength(1);

    // Clean up
    useStateSpy.mockRestore();
  });
});
