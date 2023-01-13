import React from 'react';
import Player from '../controllers/Player';
import { Typography, Box } from '@mui/material';

function Main() {
  return (
    <Box
      sx={{
        padding: '30px',
        backgroundColor: 'black',
        borderRadius: '8px',
        width: '1100px',
        margin: '30px auto 30px auto',
      }}
    >
      <Typography variant='h2' color='primary' sx={{ mb: '24px' }}>
        Canal+ code challenge
      </Typography>
      <Player />
    </Box>
  );
}

export default React.memo(Main);
