// index.test.js
import { Login, SignUp } from './index';  // Assuming the export file is named 'index.js'


// Mock components if necessary (Optional)
jest.mock('./signUp');
jest.mock('./login');

describe('Component Exports', () => {
  test('Login component should be exported correctly', () => {
    expect(Login).toBeDefined();
  });

  test('SignUp component should be exported correctly', () => {
    expect(SignUp).toBeDefined();
  });

  // test('Login component should render without crashing', () => {
  //   const { getByText } = render(<Login />);
  //   // Assuming Login component renders some text like 'Login'
  //   expect(getByText(/login/i)).toBeInTheDocument();
  // });

  // test('SignUp component should render without crashing', () => {
  //   const { getByText } = render(<SignUp />);
  //   // Assuming SignUp component renders some text like 'Sign Up'
  //   expect(getByText(/sign up/i)).toBeInTheDocument();
  // });
});
