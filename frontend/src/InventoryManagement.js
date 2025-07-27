
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, TextField, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead,
  TableRow, IconButton, Stack, Alert, useTheme, useMediaQuery
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from './firebase';
import {
  collection, addDoc, getDocs, deleteDoc, doc, setDoc
} from 'firebase/firestore';

const mockMarketRate = 30;
const suggestedPrice = mockMarketRate - 2;

function InventoryManagement() {
  // Load or initialize itemIdMap from localStorage
  const initialMap = JSON.parse(localStorage.getItem('itemIdMap') || '{}');
  const [itemIdMap, setItemIdMap] = useState({
    potato: 1,
    tomato: 2,
    onion: 3,
    ...initialMap
  });
  const [file, setFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState('');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [inventory, setInventory] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Fetch inventory for current supplier from Firestore
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        if (!email) return;
        const supplierInventoryRef = collection(db, 'suppliers', email, 'inventory');
        const snapshot = await getDocs(supplierInventoryRef);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInventory(items);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };
    fetchInventory();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMsg('File ready to upload (mocked).');
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!item || !quantity || !price) return;

    try {
      const email = localStorage.getItem('userEmail');
      if (!email) return;
      const itemKey = item.trim().toLowerCase();
      let itemId = itemIdMap[itemKey];
      // If itemId does not exist, assign next available id
      if (!itemId) {
        const usedIds = Object.values(itemIdMap);
        const nextId = usedIds.length > 0 ? Math.max(...usedIds) + 1 : 1;
        itemId = nextId;
        const newMap = { ...itemIdMap, [itemKey]: itemId };
        setItemIdMap(newMap);
        localStorage.setItem('itemIdMap', JSON.stringify(newMap));
      }
      const itemDocRef = doc(db, 'suppliers', email, 'inventory', itemId.toString());
      await setDoc(itemDocRef, {
        name: item,
        itemId,
        quantity: Number(quantity),
        price: Number(price)
      });

      setInventory(prev => {
        // Remove any previous item with same itemId
        const filtered = prev.filter(row => row.itemId !== itemId);
        return [
          ...filtered,
          { id: itemId.toString(), name: item, itemId, quantity: Number(quantity), price: Number(price) }
        ];
      });

      setItem('');
      setQuantity('');
      setPrice('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const email = localStorage.getItem('userEmail');
      if (!email) return;
      await deleteDoc(doc(db, 'suppliers', email, 'inventory', id));
      setInventory(inventory.filter(row => row.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Bulk Upload</Typography>
      <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: '#F5F7FA' }}>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} alignItems="center">
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadFileIcon />}
            sx={{ bgcolor: '#00BFAE', color: '#fff', '&:hover': { bgcolor: '#009e90' } }}
          >
            Upload CSV/Excel
            <input type="file" hidden onChange={handleFileChange} accept=".csv,.xlsx,.xls" />
          </Button>
          {file && <Typography>{file.name}</Typography>}
          {uploadMsg && <Alert severity="info">{uploadMsg}</Alert>}
        </Stack>

        <Typography variant="body2" sx={{ mt: 1 }}>Or add items manually:</Typography>

        <Box component="form" onSubmit={handleAddItem} sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="Item Name"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
            size="small"
          />
          <TextField
            label="Quantity (kg)"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            size="small"
            inputProps={{ min: 1 }}
          />
          <TextField
            label="Price (₹/kg)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            size="small"
            inputProps={{ min: 1 }}
            helperText={`Market rate: ₹${mockMarketRate}/kg (suggest ₹${suggestedPrice})`}
          />
          <Button type="submit" variant="contained" sx={{ bgcolor: '#1A237E', color: '#fff' }}>
            Add Item
          </Button>
        </Box>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2 }}>Inventory Table</Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
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
  );
}

export default InventoryManagement;
