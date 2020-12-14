import ReactDOM from 'react-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

//The only difference in App when logged in is that you can get through to the private pages so few test are needed
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

test('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>, div);
});

  
test('Navigation to Lesson Editor when logged in', () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
    screen.getByText(/Login Page/i).click();
    screen.getByTestId("emailInput").value = "test@email.com"
    screen.getByTestId("passwordInput").value = "testpass"
    screen.getByTestId("btnLogin").click();
    screen.getByTestId("lessonLink").click();

    expect(screen.getByText(/Lesson Packs/i)).toBeInTheDocument()
})

test('Navigation to Analytics when logged in', () => {
  render(
      <BrowserRouter>
          <App />
      </BrowserRouter>
  )
  screen.getByText(/Login Page/i).click();
  screen.getByTestId("emailInput").value = "test@email.com"
  screen.getByTestId("passwordInput").value = "testpass"
  screen.getByTestId("btnLogin").click();
  screen.getByTestId("analyticsLink").click();

  expect(screen.getByText(/You found the Analytics page/i)).toBeInTheDocument()
})