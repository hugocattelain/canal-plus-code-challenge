import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Box } from '@mui/system';

export default function CrewList() {
  const [crewList, setCrewList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/crew`)
      .then((res) => res.json())
      .then((json) => {
        setCrewList(json);
      });
  }, []);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {crewList.length > 0 &&
        crewList.map((crewMember, index) => (
          <Card key={index} sx={{ maxWidth: 345, mr: '16px' }}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='140'
                image={crewMember.image}
                alt='green iguana'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {crewMember.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {crewMember.role}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </Box>
  );
}
