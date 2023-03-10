import React, { useEffect, useState, useRef } from 'react';
import { Subject } from 'rxjs';
import { createModule } from '../utils/createModule';
import PlayerModule from '../modules/player';
import ControlBar from './ControlBar';
import SceneList from './SceneList';
import CrewMembersList from '../components/CrewMembersList';
import { Box } from '@mui/material';

const Player = () => {
  const [player, setPlayer] = useState(null);

  const videoElementRef = useRef(null);
  const $destroySubjectRef = useRef(null);

  useEffect(() => {
    createNewPlayer();
    return () => {
      cleanCurrentPlayer();
    };
  }, []);

  const createNewPlayer = () => {
    const newPlayerModule = createModule(PlayerModule, {
      videoElement: videoElementRef.current,
    });

    $destroySubjectRef.current = new Subject();
    $destroySubjectRef.current.subscribe(() => newPlayerModule.destroy());
    newPlayerModule.dispatch('LOAD', {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      transport: 'directfile',
    });

    setPlayer(newPlayerModule);
  };

  const cleanCurrentPlayer = () => {
    if ($destroySubjectRef.current) {
      $destroySubjectRef.current.next();
      $destroySubjectRef.current.complete();
    }
    setPlayer(null);
  };

  return (
    <>
      <Box sx={{ width: '80%', margin: '0 auto' }}>
        <video ref={videoElementRef} id='video' style={{ width: '100%' }} />
        <ControlBar player={player} videoElement={videoElementRef.current} />
      </Box>
      <SceneList player={player} />
      <CrewMembersList />
    </>
  );
};

export default Player;
