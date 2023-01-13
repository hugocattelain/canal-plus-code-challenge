import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

function Scene({ jump, scene }) {
  const [sceneDetail, setSceneDetail] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/scene/${scene.beginTimecode}`)
      .then((res) => res.json())
      .then((json) => {
        setSceneDetail(json);
      });
  }, []);

  return (
    <Typography
      onClick={() => jump(scene.beginTimecode)}
      sx={{
        cursor: 'pointer',
        padding: '8px',
        margin: '6px',
        border: '1px solid white',
        borderRadius: '4px',
      }}
      color='primary'
    >
      {sceneDetail.title}
    </Typography>
  );
}

export default React.memo(Scene);
