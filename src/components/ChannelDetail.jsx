import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  console.log(channelDetail, videos);

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => {
      setChannelDetail(data?.items[0]);
    });
    fetchFromAPI(
      `search?channelId=${id}&part=snippet&order=date&maxResults=50`
    ).then((data) => {
      setVideos(data?.items);
    });
  }, [id]);
  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(142,8,81,1) 40%, rgba(0,212,255,1) 100%)",
            zIndex: 1,
            height: "200px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-120px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
