import React from 'react';
import { IconButton } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import withModulesState from '../utils/withModulesState';

function PlayPauseButton({ player, isPaused, hasEnded }) {
  const isPlaying = !(isPaused || hasEnded);

  const handleClick = () => {
    isPlaying ? player.dispatch('PAUSE') : player.dispatch('PLAY');
  };

  return (
    <IconButton
      disableRipple
      color='primary'
      aria-label={isPlaying ? 'play' : 'pause'}
      onClick={handleClick}
    >
      {isPlaying ? <Pause /> : <PlayArrow />}
    </IconButton>
  );
}

export default React.memo(
  withModulesState({
    player: {
      isPaused: 'isPaused',
      isContentLoaded: 'isContentLoaded',
      hasEnded: 'hasEnded',
    },
  })(PlayPauseButton)
);
