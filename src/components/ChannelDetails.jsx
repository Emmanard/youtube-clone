import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";
import axios from "../api/rapidApi";
import useAxiosFunction from "../hooks/useAxiosQueryFn";

const ChannelDetails = () => {
  const { id } = useParams();
  const { useFetchData } = useAxiosFunction();

  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const channelConfig = {
    key: ["channelDetails", id],
    axiosInstance: axios,
    url: `/channels`,
    requestConfig: {
      params: {
        part: "snippet",
        id: id,
      },
    },
  };
      const videosConfig = {
    key: ["channelVideos", id],
    axiosInstance: axios,
    url: `/search`,
    requestConfig: {
      params: {
        part: "snippet",
        channelId: id,
        order: "date",
        maxResults: 50,
      },
    },
  };
  const {data: channelData,isLoading: isChannelLoading,error: channelError, } = useFetchData(channelConfig);
  const {data: videosData,isLoading: isVideosLoading,error: videosError,} = useFetchData(videosConfig);

  useEffect(() => {
    if (channelData?.items?.length) {
      setChannelDetail(channelData.items[0]);
    }
    if (videosData?.items) {
      setVideos(videosData.items);
    }
  }, [channelData, videosData]);

  if (isChannelLoading || isVideosLoading) return <p>Loading...</p>;
  if (channelError || videosError)
    return <p>Error: {channelError?.message || videosError?.message}</p>;
return(
  <Box minHeight="95vh">
  <Box>
    <div style={{
      height:'300px',
      background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
      zIndex: 10,
    }} />
    <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
  </Box>
  <Box p={2} display="flex">
  <Box sx={{ mr: { sm: '100px' } }}/>
    <Videos videos={videos} />
  </Box>
</Box>

)
};

export default ChannelDetails;
