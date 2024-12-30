import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { SideBar, Videos } from "./";
import axios from "../api/rapidApi";
import useAxiosFunction from "../hooks/useAxiosQueryFn";
import { categories } from "../utils/constants";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [videos, setVideos] = useState([]);
  const { useFetchData } = useAxiosFunction();

  const configObj = {
    key: ["youtubeSearch", selectedCategory],
    axiosInstance: axios,
    url: "/search",
    requestConfig: {
      params: {
        q: selectedCategory,
        part: "snippet",
        maxResults: "50",
      },
    },
  };

  const { data, isLoading, error } = useFetchData(configObj);

  useEffect(() => {
    if (data && Array.isArray(data.items)) {
      setVideos(data.items);
    } else {
      setVideos([]);
    }
  }, [data]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error)
    return (
      <Typography>
        Error: {error?.response?.data?.message || error?.message}
      </Typography>
    );

  return (
    <Stack
      sx={{
        flexDirection: { sx: "column", md: "row" },
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          height: { sx: "auto", md: "100%" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
          backgroundColor: "#000",
        }}
      >
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2024 OMINI Media
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: "auto",
          backgroundColor: "#000",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{
            color: "white",
          }}
        >
          {selectedCategory} <span style={{ color: "#F31503" }}>Videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
