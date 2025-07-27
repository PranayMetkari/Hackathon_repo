import React, { useRef, useEffect, useState } from 'react';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryManagement from './InventoryManagement';
import OrderFulfillment from './OrderFulfillment';
import PerformanceMetrics from './PerformanceMetrics';


const drawerWidth = 220;

function SupplierDashboard() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [supplier, setSupplier] = useState(null);

  // Section refs for scrolling
  const inventoryRef = useRef(null);
  const ordersRef = useRef(null);
  const performanceRef = useRef(null);
  const footerRef = useRef(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarNav = (section) => {
    setMobileOpen(false);
    if (section === 'inventory' && inventoryRef.current) inventoryRef.current.scrollIntoView({ behavior: 'smooth' });
    if (section === 'orders' && ordersRef.current) ordersRef.current.scrollIntoView({ behavior: 'smooth' });
    if (section === 'performance' && performanceRef.current) performanceRef.current.scrollIntoView({ behavior: 'smooth' });
    if (section === 'settings' && footerRef.current) footerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch supplier info on mount
  useEffect(() => {
    const fetchSupplier = async () => {
      const email = localStorage.getItem('userEmail');
      if (!email) return;
      const supplierRef = doc(db, 'suppliers', email);
      const supplierSnap = await getDoc(supplierRef);
      if (supplierSnap.exists()) {
        setSupplier(supplierSnap.data());
      }
    };
    fetchSupplier();
  }, []);

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', color: '#00BFAE' }}>
          Supplier
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button key="Inventory" onClick={() => handleSidebarNav('inventory')}>
          <ListItemIcon><Inventory2Icon sx={{ color: '#00BFAE' }} /></ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItem>
        <ListItem button key="Orders" onClick={() => handleSidebarNav('orders')}>
          <ListItemIcon><LocalShippingIcon sx={{ color: '#00BFAE' }} /></ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button key="Performance" onClick={() => handleSidebarNav('performance')}>
          <ListItemIcon><AssessmentIcon sx={{ color: '#00BFAE' }} /></ListItemIcon>
          <ListItemText primary="Performance" />
        </ListItem>
        <ListItem button key="Settings" onClick={() => handleSidebarNav('settings')}>
          <ListItemIcon><SettingsIcon sx={{ color: '#00BFAE' }} /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', background: '#F5F7FA', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1201, background: '#fff', color: '#1A237E', boxShadow: 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Supplier Dashboard
          </Typography>
          {/* Profile/Notifications: show username if available */}
          <Typography variant="body1" sx={{ color: '#333' }}>
            {supplier
              ? supplier.username
                ? `Welcome, ${supplier.username}`
                : supplier.email
              : 'Profile'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="sidebar navigation"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: '#1A237E', color: '#fff' },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: '#1A237E', color: '#fff' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8 }}
      >
        <Grid container spacing={3}>
          {/* Inventory Management Section */}
          <Grid item xs={12} md={6} ref={inventoryRef}>
            <InventoryManagement />
          </Grid>
          {/* Order Fulfillment Section */}
          <Grid item xs={12} md={6} ref={ordersRef}>
            <OrderFulfillment />
          </Grid>
          {/* Performance Metrics Section */}
          <Grid item xs={12} ref={performanceRef}>
            <PerformanceMetrics />
          </Grid>
        </Grid>
        <Box ref={footerRef} sx={{ mt: 4, textAlign: 'center', color: '#333' }}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2">Bitlords | © 2025 | Links</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SupplierDashboard; 