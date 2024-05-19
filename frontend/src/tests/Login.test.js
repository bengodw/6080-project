import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../components/Login';
import { BrowserRouter as Router } from 'react-router-dom';

// Tests for the Login component
describe('Login', () => {
  // Render the Login component will null token
  it('render login screen with null token', () => {
    const setToken = jest.fn();
    const setEmail = jest.fn();

    render(
      <Router>
        <Login
          token={null}
          setToken={setToken}
          setEmail={setEmail}
        />
      </Router>
    );

    expect(screen.getByRole('textbox', {
      name: /email/i
    })).toBeInTheDocument();
    expect(screen.getByLabelText(/Password \*/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /login/i
    })).toBeInTheDocument();
  })

  // Alert if no email or password entered
  it('display alert if no email or password entered on submit', () => {
    const setToken = jest.fn();
    const setEmail = jest.fn();
    const alertMock = jest.spyOn(window,'alert').mockImplementation();

    render(
      <Router>
        <Login
          token={null}
          setToken={setToken}
          setEmail={setEmail}
        />
      </Router>
    );

    userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(alertMock).toHaveBeenCalledWith('Please enter email');
  });

  // Alert if no password entered
  it('display alert if no password entered on submit', () => {
    const setToken = jest.fn();
    const setEmail = jest.fn();
    const alertMock = jest.spyOn(window,'alert').mockImplementation();

    render(
      <Router>
        <Login
          token={null}
          setToken={setToken}
          setEmail={setEmail}
        />
      </Router>
    );

    userEvent.type(screen.getByRole('textbox', {
      name: /email/i
    }), 'name@email.com');
    userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(alertMock).toHaveBeenCalledWith('Please enter password');
  });

  // Succesful login attempt
  it('No error after successful login', async () => {
    const setToken = jest.fn();
    const setEmail = jest.fn();
    const token = null;

    const alertMock = jest.spyOn(window,'alert').mockImplementation();

    render(
      <Router>
        <Login
          token={token}
          setToken={setToken}
          setEmail={setEmail}
        />
      </Router>
    );

    userEvent.type(screen.getByRole('textbox', {
      name: /email/i
    }), 'name@email.com');
    userEvent.type(screen.getByLabelText(/Password \*/i), 'password');

    userEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(alertMock).toHaveBeenCalledTimes(0);

  });
});