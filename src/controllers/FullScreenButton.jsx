import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IconButton } from '@mui/material';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';
import withModulesState from '../utils/withModulesState';

function addFullscreenListener(listener) {
  document.addEventListener('webkitfullscreenchange', listener, false);
  document.addEventListener('mozfullscreenchange', listener, false);
  document.addEventListener('fullscreenchange', listener, false);
  document.addEventListener('MSFullscreenChange', listener, false);
}

function removeFullscreenListener(listener) {
  document.removeEventListener('webkitfullscreenchange', listener, false);
  document.removeEventListener('mozfullscreenchange', listener, false);
  document.removeEventListener('fullscreenchange', listener, false);
  document.removeEventListener('MSFullscreenChange', listener, false);
}

function isFullscreen() {
  return !!(
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );
}

function requestFullscreen(elt) {
  if (!isFullscreen()) {
    if (elt.requestFullscreen) {
      elt.requestFullscreen();
    } else if (elt.msRequestFullscreen) {
      elt.msRequestFullscreen();
    } else if (elt.mozRequestFullScreen) {
      elt.mozRequestFullScreen();
    } else if (elt.webkitRequestFullscreen) {
      // TODO Open issue in TypeScript?
      elt.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  }
}

function exitFullscreen() {
  if (isFullscreen()) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

function FullscreenButton({ player, videoElement }) {
  const isInitiallyFullscreen = useMemo(() => isFullscreen(), []);
  const [isCurrentlyFullScreen, setFullscreenValue] = useState(
    isInitiallyFullscreen
  );

  useEffect(() => {
    const fullscreenListener = () => {
      const isInFullscreen = isFullscreen();
      if (!isInFullscreen) {
        videoElement.classList.remove('fullscreen');
      }
      setFullscreenValue(isInFullscreen);
    };

    addFullscreenListener(fullscreenListener);

    return () => {
      removeFullscreenListener(fullscreenListener);
    };
  }, [videoElement]);

  const setFullscreen = useCallback(() => {
    requestFullscreen(videoElement);
    videoElement.classList.add('fullscreen');
  }, [videoElement]);

  return (
    <IconButton
      aria-label='Go/Quit fullscreen'
      disableRipple
      color='primary'
      onClick={isCurrentlyFullScreen ? exitFullscreen : setFullscreen}
    >
      {isCurrentlyFullScreen ? <FullscreenExit /> : <Fullscreen />}
    </IconButton>
  );
}

export default React.memo(
  withModulesState({
    player: {
      hasCurrentContent: 'hasCurrentContent',
    },
  })(FullscreenButton)
);
