import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}&maxResults=50`)
      .then((data) => {
        setVideos(data.items);
      })
      .catch((error) => {
        if (error.response && error.response.status === 429) {
          setRateLimitExceeded(true);
        } else {
          console.error("API request error:", error);
        }
      });
  }, [selectedCategory]);

  return (
    <div>
      {rateLimitExceeded ? (
        <p style={{ color: "white", fontStyle: "bold" }}>
          COME BACK ANOTHER DAY, API RATE LIMIT EXCEEDED
        </p>
      ) : (
        <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
          <Box
            sx={{
              height: { sx: "auto", md: "92vh" },
              borderRight: "1px solid #3d3d3d",
              px: { sx: 0, md: 2 },
            }}
          >
            <Sidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <Typography
              pl={2}
              pt={1}
              className="copyright"
              variant="body2"
              sx={{ mt: 1.5, color: "#FFF" }}
            >
              CopyRight 2023
            </Typography>
          </Box>
          <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              mb="2"
              sx={{ color: "white" }}
            >
              {selectedCategory}
              <span style={{ color: "#F31503" }}> Videos</span>
            </Typography>
            <Videos videos={videos} />
          </Box>
        </Stack>
      )}
    </div>
  );
};

export default Feed;
