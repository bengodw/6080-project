import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { apiCallPost } from '../helpers';
import { useNavigate } from 'react-router-dom';

const Register = (props) => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const navigate = useNavigate();

  const submit = () => {
    if (!email) {
      alert('Please enter a valid email');
    } else if (!name) {
      alert('Please enter a valid name');
    } else if (!password) {
      alert('Please enter a valid password');
    } else if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      register();
    }
  }

  const register = async () => {
    const data = await apiCallPost('user/auth/register', { email, password, name });
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
          label="Email"
          name="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br></br>
        <TextField
          required
          label="Name"
          name="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br></br>
        <TextField
          required
          label="Password"
          name="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br></br>
        <TextField
          required
          label="Confirm Password"
          name="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <br></br>
        <Button variant="contained" size="large" onClick={submit}>Register</Button>
      </div>
    </Box>
  );
}

export default Register;
