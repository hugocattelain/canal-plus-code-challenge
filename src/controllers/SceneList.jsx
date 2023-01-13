import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Scene from '../components/Scene';

function SceneList({ player }) {
  const [scenes, setScenes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${process.env.REACT_APP_API_URL}/scenes`)
        .then((res) => res.json())
        .then((json) => {
          setScenes(json);
        });
    };

    fetchData();
  }, []);

  const jump = (value) => {
    player.dispatch('JUMP', { value });
  };

  return (
    <>
      {scenes.length > 0 && (
        <>
          <Typography variant='h3' color='primary' sx={{ mb: '24px' }}>
            Jump to specific scene
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              mb: '30px',
            }}
          >
            {scenes.map((scene) => (
              <Scene scene={scene} jump={jump} key={scene.id} />
            ))}
          </Box>
        </>
      )}
    </>
  );
}

export default React.memo(SceneList);
