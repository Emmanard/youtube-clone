import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "../api/rapidApi";
import useAxiosFunction from "../hooks/useAxiosQueryFn";
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();
  const { useFetchData } = useAxiosFunction();
console.log(searchTerm);

  const videoConfigObj =  {
      key: ["youtubeSearch", searchTerm],
      axiosInstance: axios,
      url: "/search",
      requestConfig: {
        params: {
          q: searchTerm,
          part: "snippet",
          maxResults: "50",
        },
      },
    };
  const { data } = useFetchData(videoConfigObj);

  useEffect(() => {
    console.log(data);

    if (data?.items?.length) {
      setVideos(data.items);
    }
  }, [searchTerm, data]);

  return (
    <Box p={2} minHeight="95vh">
      <Typography
        variant="h4"
        fontWeight={900}
        color="white"
        mb={3}
        ml={{ sm: "100px" }}
      >
        Search Results for{" "}
        <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </Typography>
      <Box display="flex">
        <Box sx={{ mr: { sm: "100px" } }} />
        {<Videos videos={videos} />}
      </Box>
    </Box>
  );
};

export default SearchFeed;
