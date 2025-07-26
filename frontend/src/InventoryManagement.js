import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Stack, Alert, useTheme, useMediaQuery } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';

const mockMarketRate = 30; // ₹30/kg

function InventoryManagement() {
  const [file, setFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState('');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Tomatoes', quantity: 100, price: 28 },
    { id: 2, name: 'Potatoes', quantity: 200, price: 25 },
  ]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Handle file upload (mock)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMsg('File ready to upload (mocked).');
  };

  // Handle manual add
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!item || !quantity || !price) return;
    setInventory([
      ...inventory,
      { id: Date.now(), name: item, quantity: Number(quantity), price: Number(price) },
    ]);
    setItem('');
    setQuantity('');
    setPrice('');
  };

  // Handle delete
  const handleDelete = (id) => {
    setInventory(inventory.filter((row) => row.id !== id));
  };

  // Auto-price suggestion
  const suggestedPrice = mockMarketRate - 2;

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>Bulk Upload</Typography>
      <Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 }, mb: 2, bgcolor: '#F5F7FA' }}>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} alignItems={isMobile ? 'stretch' : 'center'}>
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadFileIcon />}
            sx={{ bgcolor: '#00BFAE', color: '#fff', '&:hover': { bgcolor: '#009e90' }, width: isMobile ? '100%' : 'auto' }}
          >
            Upload CSV/Excel
            <input type="file" hidden onChange={handleFileChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
          </Button>
          {file && <Typography sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>{file.name}</Typography>}
          {uploadMsg && <Alert severity="info" sx={{ width: isMobile ? '100%' : 'auto' }}>{uploadMsg}</Alert>}
        </Stack>
        <Typography variant="body2" sx={{ mt: 1, color: '#333', fontSize: { xs: '0.95rem', sm: '1rem' } }}>
          Or add items manually:
        </Typography>
        <Box component="form" onSubmit={handleAddItem} sx={{ mt: 2, display: 'flex', flexDirection: isMobile ? 'column' : 'row', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="Item Name"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
            size="small"
            sx={{ width: isMobile ? '100%' : 'auto' }}
          />
          <TextField
            label="Quantity (kg)"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            size="small"
            inputProps={{ min: 1 }}
            sx={{ width: isMobile ? '100%' : 'auto' }}
          />
          <TextField
            label="Price (₹/kg)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            size="small"
            inputProps={{ min: 1 }}
            helperText={`Market rate: ₹${mockMarketRate}/kg (suggest ₹${suggestedPrice} for fast sale)`}
            sx={{ width: isMobile ? '100%' : 'auto' }}
          />
          <Button type="submit" variant="contained" sx={{ bgcolor: '#1A237E', color: '#fff', '&:hover': { bgcolor: '#151c5a' }, width: isMobile ? '100%' : 'auto' }}>
            Add Item
          </Button>
        </Box>
      </Paper>
      <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>Inventory Table</Typography>
      <Box sx={{ width: '100%', overflowX: 'auto', mb: 2 }}>
        <TableContainer component={Paper} sx={{ minWidth: 600 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Quantity (kg)</TableCell>
                <TableCell>Price (₹/kg)</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>₹{row.price}</TableCell>
                  <TableCell align="right">
                    <IconButton color="error" onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default InventoryManagement; 