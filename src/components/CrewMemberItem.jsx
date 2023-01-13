import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function CrewMemberItem({ crewMember }) {
  return (
    <Card sx={{ maxWidth: 345, mr: '16px' }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image={crewMember.image}
          alt='Crew member'
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
  );
}
