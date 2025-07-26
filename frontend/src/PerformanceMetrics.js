import React from 'react';
import { Box, Typography, Card, CardContent, Stack, Alert, useTheme, useMediaQuery } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const trustScore = 4.2;
const maxStars = 5;
const fraudAlert = '3 ratings lacked photos';

const demandData = {
  labels: ['6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm'],
  datasets: [
    {
      label: 'Demand (orders)',
      data: [5, 9, 14, 20, 17, 12, 8, 4],
      backgroundColor: '#00BFAE',
      borderRadius: 6,
    },
  ],
};

const demandOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Peak Item Demand by Hour' },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { color: '#e0e0e0' } },
  },
};

function PerformanceMetrics() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack direction={isMobile ? 'column' : 'row'} spacing={2} sx={{ width: '100%' }}>
      {/* Trust Score Widget */}
      <Card sx={{ flex: 1, mb: isMobile ? 2 : 0 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>Trust Score</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {[...Array(maxStars)].map((_, i) =>
              i < Math.floor(trustScore) ? (
                <StarIcon key={i} sx={{ color: '#43A047' }} />
              ) : (
                <StarBorderIcon key={i} sx={{ color: '#e0e0e0' }} />
              )
            )}
            <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>{trustScore}/5</Typography>
          </Box>
          <Alert severity="warning" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>{fraudAlert}</Alert>
        </CardContent>
      </Card>
      {/* Demand Heatmap */}
      <Card sx={{ flex: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>Demand Heatmap</Typography>
          <Box sx={{ width: '100%', maxWidth: 500, height: isMobile ? 220 : 300 }}>
            <Bar data={demandData} options={demandOptions} />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default PerformanceMetrics; 