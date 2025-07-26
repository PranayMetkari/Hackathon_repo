import React, { useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TableSortLabel, Stack, Alert, useTheme, useMediaQuery } from '@mui/material';

const mockOrders = [
  { id: 1, item: 'Tomatoes', quantity: 50, deadline: '2024-06-10T14:00', distance: 5.2, status: 'Pending', rider: 'Ravi', location: { lat: 28.6139, lng: 77.209 } },
  { id: 2, item: 'Potatoes', quantity: 80, deadline: '2024-06-10T12:00', distance: 2.8, status: 'Pending', rider: 'Amit', location: { lat: 28.614, lng: 77.21 } },
  { id: 3, item: 'Onions', quantity: 30, deadline: '2024-06-10T16:00', distance: 7.1, status: 'Pending', rider: 'Sunil', location: { lat: 28.615, lng: 77.208 } },
];

function OrderFulfillment() {
  const [orders, setOrders] = useState(mockOrders);
  const [sortBy, setSortBy] = useState('deadline');
  const [sortDir, setSortDir] = useState('asc');
  const [dispatchedMsg, setDispatchedMsg] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Sorting handler
  const handleSort = (field) => {
    const isAsc = sortBy === field && sortDir === 'asc';
    setSortBy(field);
    setSortDir(isAsc ? 'desc' : 'asc');
    setOrders([...orders].sort((a, b) => {
      if (field === 'deadline') {
        return (isAsc ? -1 : 1) * (new Date(a.deadline) - new Date(b.deadline));
      } else if (field === 'distance') {
        return (isAsc ? -1 : 1) * (a.distance - b.distance);
      }
      return 0;
    }));
  };

  // Mark as Dispatched
  const handleDispatch = (id) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: 'Dispatched' } : order));
    setDispatchedMsg('Order marked as dispatched!');
    setTimeout(() => setDispatchedMsg(''), 2000);
  };

  // Select order for delivery tracking
  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>Pending Orders</Typography>
      {dispatchedMsg && <Alert severity="success" sx={{ mb: 2 }}>{dispatchedMsg}</Alert>}
      <Box sx={{ width: '100%', overflowX: 'auto', mb: 2 }}>
        <TableContainer component={Paper} sx={{ minWidth: 600 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell sortDirection={sortBy === 'deadline' ? sortDir : false}>
                  <TableSortLabel
                    active={sortBy === 'deadline'}
                    direction={sortBy === 'deadline' ? sortDir : 'asc'}
                    onClick={() => handleSort('deadline')}
                  >
                    Deadline
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={sortBy === 'distance' ? sortDir : false}>
                  <TableSortLabel
                    active={sortBy === 'distance'}
                    direction={sortBy === 'distance' ? sortDir : 'asc'}
                    onClick={() => handleSort('distance')}
                  >
                    Distance (km)
                  </TableSortLabel>
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} selected={selectedOrder && selectedOrder.id === order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.item}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{new Date(order.deadline).toLocaleString()}</TableCell>
                  <TableCell>{order.distance.toFixed(1)}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Stack direction={isMobile ? 'column' : 'row'} spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        disabled={order.status === 'Dispatched'}
                        onClick={() => handleDispatch(order.id)}
                        sx={{ minWidth: isMobile ? '100%' : 0 }}
                      >
                        Mark as Dispatched
                      </Button>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => handleSelectOrder(order)}
                        sx={{ minWidth: isMobile ? '100%' : 0 }}
                      >
                        Track
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>Delivery Tracking</Typography>
      {selectedOrder && (
        <Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 }, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            Order #{selectedOrder.id} - Rider: {selectedOrder.rider}
          </Typography>
          {/* Google Maps Embed (mock location) */}
          <Box sx={{ width: '100%', height: { xs: 180, sm: 240 }, mb: 1 }}>
            <iframe
              title="Rider Location"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://maps.google.com/maps?q=${selectedOrder.location.lat},${selectedOrder.location.lng}&z=15&output=embed`}
              allowFullScreen
            />
          </Box>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>Status: {selectedOrder.status}</Typography>
        </Paper>
      )}
    </Box>
  );
}

export default OrderFulfillment; 