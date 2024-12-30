import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Videos, Loader } from "./";
import axios from "../api/rapidApi";
import useAxiosFunction from "../hooks/useAxiosQueryFn";

const VideoDetails = () => {
  const [videoDetail, setVideoDetail] = useState(null); // Initialize as null
  const [videos, setVideos] = useState([]);

  const { id } = useParams();
  const { useFetchData } = useAxiosFunction();
console.log(id);

  const videosConfig = {
    key: ["videos", id],
    axiosInstance: axios,
    url: `/videos`,
    requestConfig: {
      params: {
        part: "snippet,statistics",
        id: id,
      },
    },
  };

  const relateToVideoConfig = {
    key: ["search", id],
    axiosInstance: axios,
    url: `/search`,
    requestConfig: {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        type: "video",
      },
    },
  };

  const { data: videodata } = useFetchData(videosConfig);
  const { data: relatevideodata } = useFetchData(relateToVideoConfig);

  useEffect(() => {
    if (relatevideodata?.items?.length) {
      setVideos(relatevideodata.items);
    }
    if (videodata?.items?.length) {
      setVideoDetail(videodata.items[0]); // Ensure it uses the first item
    }
  }, [relatevideodata, videodata]);

  if (!videoDetail) {
    return <Loader />; // Render loader while data is being fetched
  }

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetails;
