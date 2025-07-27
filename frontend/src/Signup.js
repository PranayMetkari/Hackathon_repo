import React, { useState } from 'react';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// List of all districts in Maharashtra
const districtOptions = [
  'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur',
  'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City',
  'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani',
  'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha',
  'Washim', 'Yavatmal'
];

function Signup() {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // For redirection

  const handleSignup = async (e) => {
    e.preventDefault();

    // Reset messages
    setMsg('');
    setError('');

    // Validations
    if (!username || !phone || !email || !district || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError('Phone number must be 10 digits.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Add supplier info to Firestore with phone as primary key and +91 prefix
      const phoneKey = `91${phone}`;
      const supplierRef = doc(db, 'suppliers', phoneKey);
      await setDoc(supplierRef, {
        username,
        phone: phoneKey,
        email,
        district,
        role: 'supplier',
        createdAt: new Date().toISOString()
      });

      setMsg('✅ Signup successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500); // Redirect after 1.5s
    } catch (error) {
      setError(`❌ ${error.message}`);
    }
  };

  return (
    
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f2f5"
    >
      <Paper elevation={6} sx={{ p: 5, width: 400, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: '#1976d2', mb: 1 }}>
            <PersonAddIcon />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSignup} style={{ width: '100%' }}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Phone Number"
              type="tel"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>District</InputLabel>
              <Select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                label="District"
                required
              >
                {districtOptions.map((d) => (
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
          </form>

          {msg && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {msg}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default Signup;
