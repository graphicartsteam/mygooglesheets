import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
} from '@mui/material'; import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';

const SHEETS_API_URL = 'https://script.googleusercontent.com/a/macros/champrosports.com/echo?user_content_key=AehSKLj012Ycrk9rIs1l1Lrp5bOeooAh81j5AbRvO-PAwQGHOY2jcdeAGf-46HaCz-HdFERxb2OMH6cBIIbtfPGEStGgCKL9UgQIuHBc5VOzkYmbK7yYC-9yGiaErAshw_OHNN2IODRiag12h3CZi-ezj3ijh7wacsg47s0X9RlTJ9oEaD2T5a7ZDdV0WHSmokz42vbhm5kh5QvHBJ0H6yky5qLgYIvSYaTQoWh_ghEstaev1kB_8ECBT1TydvvAumpnSUFrB48As14tE6X3LXJ4enTYwFIjgpZ4u--jKWLMBgFmtxuGHuyd1PUnLC22ew&lib=MHQJ5hHromMllYzD29Aj9ayfZLrbal3o4';

export default function App() {
  const [search, setSearch] = useState('');
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    fetch(SHEETS_API_URL)
      .then(res => res.json())
      .then(data => setSheets(data))
      .catch(err => console.error('Error fetching sheets:', err));
  }, []);

  const renderSectionCards = (section) => {

    if (search) return [];

    const filtered = sheets.filter(sheet => sheet.Section === section);

    return filtered.map((sheet, i) => (
      <Card
        key={i}
        elevation={3}
        sx={{
          mb: 1.5,
          minHeight: 60,
          borderRadius: 2,
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            backgroundColor: '#f5f5f5',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          },
        }}
        onClick={() => window.open(sheet.URL, '_blank')}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1.5,
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DescriptionIcon fontSize="small" color="primary" />
            <Typography variant="body1" fontWeight="medium" color="primary.dark">
              {sheet.Name}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item xs={12} md={10}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: '#5babfcff',
                  borderRadius: 2,
                  p: 4,
                  mb: 4,
                }}
              >
                <Typography variant="h4" fontWeight="bold" gutterBottom color="white">
                  Proofing & Embroidery Sheets
                </Typography>
                <Typography variant="body1" color="white">
                  All the different sheets that are used daily on the Proofing and Embroidery Departments listed below.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                <Box component="span" fontWeight="bold">Welcome</Box>, Managers
              </Typography>

              {/* Search */}
              <Grid container spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Grid item sx={{ minWidth: 400, flexGrow: 1 }}>
                  <TextField
                    label="Search Sheet"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, ml: 0.5 }}
              >
                <a
                  href="https://docs.google.com/spreadsheets/d/1ITfS9wIuAft1tK0skSoVBRDEgeGxgU6UlBePi_t6UJE/edit?gid=0#gid=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}
                >
                  View the database sheet
                </a>{' '}
                used to register and manage entries.
              </Typography>

            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {search ? (
        <Grid container justifyContent="center" sx={{ mt: 6 }}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Search Results:
            </Typography>
            {sheets
              .filter(sheet =>
                sheet.Name.toLowerCase().includes(search.toLowerCase())
              )
              .map((sheet, i) => (
                <Card
                  key={i}
                  elevation={3}
                  sx={{
                    mb: 1.5,
                    minHeight: 60,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                  onClick={() => window.open(sheet.URL, '_blank')}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1.5,
                      width: '100%',
                    }}
                  >
                    <Typography variant="body1" fontWeight="medium" color="primary.dark">
                      {sheet.Name} — <strong>{sheet.Section}</strong>
                    </Typography>
                  </CardContent>
                </Card>
              ))}
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 6 }}>
          <Grid item xs={12} md={11}>
            <Grid container spacing={15} justifyContent="center">
              {/* General */}
              <Grid item xs={12} md={4}>
                <Box textAlign="center" mb={3}>
                  <Typography variant="h6" fontWeight="bold">General</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box textAlign="center" mb={3}>
                      <Typography variant="subtitle1">Employees and Finance Info</Typography>
                      <Typography variant="body2" gutterBottom>Names, dates, salary and expenses tracking</Typography>
                    </Box>

                    {renderSectionCards('General')}
                  </Grid>
                </Grid>
              </Grid>

              {/* Proofing */}
              <Grid item xs={12} md={4}>
                <Box textAlign="center" mb={3}>
                  <Typography variant="h6" fontWeight="bold">Proofing</Typography>
                </Box>

                <Box textAlign="center" mb={3}>
                  <Typography variant="subtitle1">Numbers Data & Juice Box</Typography>
                  <Typography variant="body2" gutterBottom>Names and categorized info</Typography>
                </Box>

                {renderSectionCards('Proofing')}
              </Grid>

              {/* Embroidery */}
              <Grid item xs={12} md={4}>
                <Box textAlign="center" mb={3}>
                  <Typography variant="h6" fontWeight="bold">Embroidery</Typography>
                </Box>

                <Box textAlign="center" mb={3}>
                  <Typography variant="subtitle1">Daily Numbers & Caps Analysis</Typography>
                  <Typography variant="body2" gutterBottom>Names, dates, updates, and reprints</Typography>
                </Box>

                {renderSectionCards('Embroidery')}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
