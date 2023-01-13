import React from 'react';
import { Box } from '@mui/material';
import ProgressBar from './ProgressBar';
import PlayPauseButton from './PlayPauseButton';
import TimeIndicator from '../components/TimeIndicator';
import FullScreenButton from './FullScreenButton';
import withModulesState from '../utils/withModulesState';

function ControlBar({
  currentTime,
  duration,
  isContentLoaded,
  isPaused,
  player,
  videoElement,
}) {
  const jump = (value) => {
    player.dispatch('JUMP', { value });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        bottom: '4px',
        backgroundColor: 'rgba(0,0,0,.5)',
      }}
    >
      <PlayPauseButton player={player} />
      <TimeIndicator currentPosition={currentTime} duration={duration} />
      <ProgressBar
        currentPosition={currentTime}
        duration={duration}
        jump={jump}
      />
      {player && (
        <FullScreenButton player={player} videoElement={videoElement} />
      )}
    </Box>
  );
}

export default React.memo(
  withModulesState({
    player: {
      currentTime: 'currentTime',
      duration: 'duration',
      isContentLoaded: 'isContentLoaded',
      isPaused: 'isPaused',
    },
  })(ControlBar)
);
