import { render, screen } from '@testing-library/react';
import LessonEditor from '../components/LessonEditor';
import firebase from 'firebase';
import 'firebase/storage'; 

var firebaseConfig = {
  apiKey: "AIzaSyAtCRHSSIwa5UepmVBQE6sPAeqI28S3XRk",
  authDomain: "admin-portal-firebase.firebaseapp.com",
  databaseURL: "https://admin-portal-firebase.firebaseio.com",
  projectId: "admin-portal-firebase",
  storageBucket: "admin-portal-firebase.appspot.com",
  messagingSenderId: "718485621784",
  appId: "1:718485621784:web:cac547629a659e8cd1c76d",
  measurementId: "G-MS08DSSK4Y"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


test('renders heading message', () => {
  render(<LessonEditor />);
  const linkElement = screen.getByText(/Lesson Editor/i);
  expect(linkElement).toBeInTheDocument();
});

//Due to secuirty reaons we are unable to automatically upload flies to the firebase storage
//Firebase also has no local storage emulator to test
