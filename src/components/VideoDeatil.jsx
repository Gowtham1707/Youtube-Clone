import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import  ReactPlayer  from 'react-player';
import { CheckCircle } from '@mui/icons-material';
import BeatLoader from "react-spinners/BeatLoader";
import { Videos} from './';
import { Link } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const {id} = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [video, setVideos] = useState(null);
  useEffect(()=>{
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data)=> setVideoDetail(data.items[0]));

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
    .then((data)=> setVideos(data.items));
  
  },[id])


  if (!videoDetail?.snippet) return <div style={{height:"95vh", display: "flex"}}><BeatLoader style={{ margin: "auto"}}color="red" /></div>
  

  const { snippet: { title, channelId, channelTitle}, statistics: {viewCount, likeCount} } = videoDetail;

  return (
    <Box minHeight='95vh'>
      <Stack direction={{ xs: 'column', md: 'row'}}>
        <Box flex={1}>
          <Box sx={{
            width: '100%',
            position: 'sticky',
            top: '86px',
          }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='react-player' controls/>
            <Typography color="#fff" varient="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{
              color: "#fff"
          }} py={1} px={2}>
              <Link to={`/channel${channelId}`}>
                
                <Typography varient={{ sm: "subtitle", md: 'h6'}} color="#fff">
                  {channelTitle}
                  <CheckCircle sx={{
                    fontSize: "12px",
                    color: "grey",
                    ml: "5px"
                  }}/>
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography varient="body1" sx={{
                  opacity: 0.7
                }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography varient="body1" sx={{
                  opacity: 0.7
                }}>
                  {parseInt(likeCount).toLocaleString()} Likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box display="flex" px="2" py={{ md: 1, xs: 5}} justifyContent="center" alignItems="center">
        {video && <Videos videos={video} direction="column" />}
        
      </Box>
      </Stack>
      
    </Box>
  )
}

export default VideoDetail
