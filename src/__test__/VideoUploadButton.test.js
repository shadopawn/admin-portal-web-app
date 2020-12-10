import React from 'react'
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import VideoUploadButton from '../components/VideoUploadButton';

//setting up a mock version of firebase for testing
const mockSet = jest.fn();
mockSet.mockReturnValue(true);
jest.mock("firebase", () => ({
    initializeApp: jest.fn(),
    auth: () => ({
      onAuthStateChanged: jest.fn(path => ({
        set:mockSet
      })),
      signInWithEmailAndPassword: jest.fn(path => ({
        set: mockSet
      })),
      currentUser: jest.fn(path => ({
        set: mockSet
      }))
    })
}));

test('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<VideoUploadButton />, div);
});

test('Upload button is on screen and clickable', () => {
  render(<VideoUploadButton />);
  const uploadButton = screen.getByTestId("btnUpload");
  uploadButton.click();
  expect(uploadButton).toBeInTheDocument();
});

//Due to secuirty reaons we are unable to automatically upload flies to the firebase storage
//Firebase also has no local storage emulator to test
