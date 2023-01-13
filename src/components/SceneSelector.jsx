import React, { useEffect, useState } from 'react';
import { Stack, Divider, Paper } from '@mui/material';
import Scene from './Scene';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function SceneSelector({ player }) {
  const [scenes, setScenes] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/scenes`)
      .then((res) => res.json())
      .then((json) => {
        setScenes(json);
      });
  }, []);

  const jump = (value) => {
    player.dispatch('JUMP', { value });
  };

  return (
    <>
      {scenes && (
        <Stack
          direction='row'
          divider={<Divider orientation='vertical' flexItem />}
          spacing={1}
        >
          {scenes.map((scene) => (
            <Item key={scene.id}>
              <Scene scene={scene} jump={jump} />
            </Item>
          ))}
        </Stack>
      )}
    </>
  );
}

export default React.memo(SceneSelector);
