import { render, screen } from '@testing-library/react';
import PrivateRoute from '../components/PrivateRoute';
import firebase from 'firebase';
import { BrowserRouter } from 'react-router-dom';

var firebaseConfig = {
    apiKey: "AIzaSyAtCRHSSIwa5UepmVBQE6sPAeqI28S3XRk",
    projectId: "admin-portal-firebase",
};
firebase.initializeApp(firebaseConfig);


test("renders without crashing", () => {
    <BrowserRouter><PrivateRoute path="/"></PrivateRoute></BrowserRouter>
})
