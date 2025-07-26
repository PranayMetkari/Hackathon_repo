// VendorSignup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Avatar,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const produceOptions = [
  'Potato (आलू)',
  'Tomato (टमाटर)',
  'Onion (प्याज)',
  'Spinach (पालक)',
  'Fenugreek (मेथी)',
  'Cabbage (पत्ता गोभी)',
  'Cauliflower (फूल गोभी)',
  'Carrot (गाजर)',
  'Radish (मूली)',
  'Beetroot (चुकंदर)',
  'Green Peas (मटर)',
  'French Beans (फ्रेंच बीन्स)',
  'Lady Finger (Okra) (भिंडी)',
  'Bitter Gourd (करेला)',
  'Bottle Gourd (लौकी)',
  'Ridge Gourd (तोरी)',
  'Pumpkin (कद्दू)',
  'Brinjal (Eggplant) (बैंगन)',
  'Capsicum (शिमला मिर्च)',
  'Chilli (मिर्च)',
  'Garlic (लहसुन)',
  'Ginger (अदरक)',
  'Coriander (धनिया)',
  'Mint (पुदीना)',
  'Cucumber (खीरा)',
  'Sweet Corn (मक्का)',
  'Turnip (शलगम)',
  'Yam (जिमीकंद)',
  'Cluster Beans (ग्वार फली)',
  'Drumstick (सहजन)',
  'Pointed Gourd (परवल)',
  'Snake Gourd (चिचिंडा)',
  'Tinda (टिंडा)',
  'Sponge Gourd (तुरई)',
  'Raw Banana (कच्चा केला)',
  'Green Mango (कच्चा आम)',
  'Spring Onion (हरा प्याज)',
  'Leek (लीक)',
  'Celery (अजवाइन पत्ता)',
  'Parsley (अजमोद)',
  'Kohlrabi (गंथ गोभी)',
  'Amaranth (चौलाई)',
  'Mustard Greens (सरसों का साग)',
  'Turnip Greens (शलगम के पत्ते)',
  'Sweet Potato (शकरकंद)',
  'Lotus Stem (कमल ककड़ी)',
  'Other (अन्य)'
];

function VendorSignup() {
  const [username, setUsername] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [location, setLocation] = useState('');
  const [lookingFor, setLookingFor] = useState([]);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg('');
    setError('');
    // Edge case validation
    if (!username.trim() || !businessName.trim() || !email.trim() || !whatsapp.trim() || !location.trim() || lookingFor.length === 0) {
      setError('All fields are required.');
      return;
    }
    // Username validation
    if (username.length < 3 || username.length > 30) {
      setError('Username must be between 3 and 30 characters.');
      return;
    }
    // Business name validation
    if (businessName.length < 2 || businessName.length > 50) {
      setError('Business name must be between 2 and 50 characters.');
      return;
    }
    // Email validation
    if (!/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // WhatsApp number validation
    if (!/^\d{10}$/.test(whatsapp)) {
      setError('WhatsApp number must be exactly 10 digits.');
      return;
    }
    // Location validation
    if (location.length < 3 || location.length > 100) {
      setError('Location must be between 3 and 100 characters.');
      return;
    }
    // LookingFor validation
    if (lookingFor.length === 0) {
      setError('Please select at least one item you are looking for.');
      return;
    }
    // Here you would send data to your backend or Firebase
    setMsg('Thanks for registering! Please tap into WhatsApp to continue.');
    setError('');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f0f2f5">
      <Paper elevation={6} sx={{ p: 5, width: 400, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: '#1976d2', mb: 1 }}>
            <PersonAddIcon />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            Vendor Registration
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Username (नाम)"
              placeholder="Enter your username ( नाम)"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Business Name (व्यवसाय का नाम)"
              placeholder="Enter your business name (व्यवसाय का नाम)"
              fullWidth
              margin="normal"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
            <TextField
              label="Email (ईमेल)"
              placeholder="Enter your email (ईमेल)"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="WhatsApp Number (व्हाट्सएप नंबर)"
              placeholder="Enter your WhatsApp number (व्हाट्सएप नंबर)"
              type="tel"
              fullWidth
              margin="normal"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
            />
            <TextField
              label="Delivery of Supplies Location (सामग्री की डिलीवरी का स्थान)"
              placeholder="Enter delivery location (सामग्री की डिलीवरी का स्थान)"
              fullWidth
              margin="normal"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Looking For</InputLabel>
              <Select
                multiple
                value={lookingFor}
                onChange={(e) => setLookingFor(e.target.value)}
                renderValue={(selected) => selected.join(', ')}
                label="Looking For"
              >
                {produceOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={lookingFor.indexOf(option) > -1} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Register
            </Button>
          </form>
          {msg && <Alert severity="success" sx={{ mt: 2 }}>{msg}</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Box>
      </Paper>
    </Box>
  );
}

export default VendorSignup;
