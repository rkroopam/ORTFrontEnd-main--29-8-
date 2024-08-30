import { render } from '@testing-library/react';
import { useSafeNavigate } from './useSafeNavigate';
import { BrowserRouter } from 'react-router-dom';

// A dummy component to test the hook
const DummyComponent = () => {
  const navigate = useSafeNavigate();
  return <button onClick={() => navigate('/some-path')}>Navigate</button>;
};

describe('useSafeNavigate', () => {
  test('should return the navigate function when used inside a Router', () => {
    const { getByText } = render(
      <BrowserRouter>
        <DummyComponent />
      </BrowserRouter>
    );

    const button = getByText('Navigate');
    expect(button).toBeInTheDocument(); // Ensure the button is rendered
  });

  test('should return a noop function and log an error when used outside a Router', () => {
    console.error = jest.fn(); // Mock console.error

    const { getByText } = render(<DummyComponent />);

    const button = getByText('Navigate');
    expect(button).toBeInTheDocument(); // Ensure the button is rendered

    // Simulate a click event on the button to trigger navigation
    button.click();

    // Since we're outside a Router, we expect an error to be logged
    expect(console.error).toHaveBeenCalledWith(
      'useNavigate can only be used inside a Router',
      expect.anything()
    );
  });
});
