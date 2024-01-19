import { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoFeed = ({ src }) => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState();

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!player) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      setPlayer(
        videojs(videoElement, {}, () => {
          console.log("player is ready");
        })
      );
    }
  }, [videoRef]);

  useEffect(() => {
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [player]);

  return (
    <div>
      video here
      <video className="video-js" ref={videoRef} controls>
        <source
          src={
            "http://demo:demo@127.0.0.1:8083/stream/91ae63b6-0f29-4a1f-bc9a-92d8d50faa25/channel/0/hlsll/live/index.m3u8"
          }
          type="application/x-mpegURL"
        />
      </video>
    </div>
  );
};

export default VideoFeed;
