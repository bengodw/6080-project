import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import { apiCallPost } from '../helpers';

const Login = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const submit = () => {
    if (!email) {
      alert('Please enter email');
    } else if (!password) {
      alert('Please enter password');
    } else {
      login();
    }
  }

  const login = async () => {
    const data = await apiCallPost('user/auth/login', { email, password });
    if (data.error) {
      alert(data.error);
    } else if (data.token) {
      localStorage.setItem('token', data.token);
      props.setToken(data.token);
      localStorage.setItem('email', email);
      props.setEmail(email);
      navigate('/');
    }
  }

  // If user already logged in, navigate to Landing Screen
  React.useEffect(() => {
    if (props.token) {
      navigate('/');
    }
  }, [props.token])

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br></br>
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br></br>
        <Button variant="contained" size="large" onClick={submit}>Login</Button>
      </div>
    </Box>
  );
}

export default Login;
