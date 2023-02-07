import React, { useEffect, useState } from "react";
import { getVideos } from "../../api/server";
import { VideoTypeList } from "../../components/VideoList/VideoList";

export default function useVideos() {
  const [videos, setVideos] = useState<VideoTypeList>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchVideos = async () => {
    try {
      const response = await getVideos();
      const { data: videoData } = response;
      setVideos(videoData);
    } catch (e) {
      setVideos([]);
      setError(true);
      console.error("Failed to fetch top videos!\n", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return { videos, isLoading, error };
}
