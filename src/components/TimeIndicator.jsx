import React from 'react';
import { Typography } from '@mui/material';

function TimeIndicator({ currentPosition, duration }) {
  let startIndex = 17;

  if (duration >= 60 && duration < 3600) {
    startIndex = 14;
  } else if (duration >= 3600) {
    startIndex = 11;
  }

  const formatNumber = (secondsNumber) => {
    return new Date(secondsNumber * 1000).toISOString().slice(startIndex, 19);
  };

  return (
    <>
      {currentPosition && (
        <Typography sx={{ mr: '16px' }} color='primary'>
          {formatNumber(Math.round(currentPosition))}/
          {formatNumber(Math.round(duration))}
        </Typography>
      )}
    </>
  );
}

export default React.memo(TimeIndicator);
