import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Videos, ChannelCard } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail ] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  console.log(channelDetail)
  console.log(videos)
  useEffect(() => {
      fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data)=> setChannelDetail(data?.items[0]))

      fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data)=> setVideos(data?.items))
  },[id])
  return (
    <div>
      <Box minHeight='95vh'>
        <Box>
          <div style={{
            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(118,9,121,1) 35%, rgba(33,156,218,1) 82%, rgba(0,212,255,1) 100%, rgba(190,18,108,1) 100%, rgba(228,21,129,1) 100%)',
            zIndex: 10,
            height: '200px'
          }}/>
            <ChannelCard channelDetail={channelDetail} marginTop="-110px"/>
        </Box>
        <Box display="flex" p="2">
          <Box sx={{
            mr: {sm: '14%'}
          }} />
            <Videos videos={videos} />
        </Box>
      </Box>
    </div>
  )
}

export default ChannelDetail
