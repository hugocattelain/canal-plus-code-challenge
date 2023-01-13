import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CrewMemberItem from './CrewMemberItem';

export default function CrewMembersList() {
  const [crewList, setCrewList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${process.env.REACT_APP_API_URL}/crew`)
        .then((res) => res.json())
        .then((json) => {
          setCrewList(json);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      <Typography variant='h3' color='primary' sx={{ mb: '24px' }}>
        Crew members
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {crewList.length > 0 &&
          crewList.map((crewMember, index) => (
            <CrewMemberItem key={index} crewMember={crewMember} />
          ))}
      </Box>
    </>
  );
}
