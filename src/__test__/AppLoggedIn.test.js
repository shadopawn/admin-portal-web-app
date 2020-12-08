import { render, screen, cleanup } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';


afterEach(cleanup);

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
    }),
    database: () => ({
      ref: () => ({
        once: () => ({
          then: jest.fn(path => ({
            set:mockSet
          }))
        })
      })
    })
}));
  
test('Navigation to Lesson Editor when logged in', () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
    screen.getByText(/Login Page/i).click();
    screen.getByTestId("email").value = "test@email.com"
    screen.getByTestId("password").value = "testpass"
    screen.getByTestId("btnLogin").click();
    screen.getByTestId("lessonLink").click();

    expect(screen.getByText(/Lesson Packs/i)).toBeInTheDocument()
})