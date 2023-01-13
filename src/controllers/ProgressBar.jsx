import React, { useEffect, useState } from 'react';
import { Slider } from '@mui/material';

function ProgressBar({ currentPosition, duration, jump }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (currentPosition !== undefined) {
      setValue(currentPosition);
    }
  }, [currentPosition]);

  const handleProgressChange = (event, value) => {
    if (value < duration) {
      jump(value);
      event.preventDefault();
    }
  };

  return (
    <Slider
      variant='determinate'
      value={value}
      min={0}
      max={duration}
      onChange={handleProgressChange}
      color='primary'
      sx={{
        '& .MuiSlider-thumb': {
          display: 'none',
        },
      }}
    />
  );
}

export default React.memo(ProgressBar);
