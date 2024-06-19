import React from 'react';
import { shallow } from 'enzyme';
import PdfUploadForm from './PdfUploadForm';

describe('PdfUploadForm Component', () => {
  it('renders without crashing', () => {
    shallow(<PdfUploadForm />);
  });

  it('simulates form submission and checks state change', () => {
    const wrapper = shallow(<PdfUploadForm />);

    // Mock setState functions
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    // Simulate file upload
    const file = new File([''], 'example.pdf', { type: 'application/pdf' });
    wrapper.find('Dragger').simulate('change', {
      fileList: [{ originFileObj: file }],
    });

    // Simulate form submission
    wrapper.find('.submit-button').simulate('click');

    // Expect that the state 'submitted' changes to true after submission
    expect(setState).toHaveBeenCalledWith(true);

    // Clean up
    useStateSpy.mockRestore();
  });
});
