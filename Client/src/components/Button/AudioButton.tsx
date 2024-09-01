import { FC } from "react";
import { Box, IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";

type AudioButtonProps = {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isPlay: boolean;
  setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AudioButton: FC<AudioButtonProps> = ({
  audioRef,
  isPlay,
  setIsPlay,
}) => {
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlay(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlay(false);
    }
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: "1%" }}>
      <IconButton
        color="primary"
        size="large"
        onClick={() => (isPlay ? pause() : play())}
        sx={{ border: "solid 1px #1976d2" }}
      >
        {isPlay ? <Pause /> : <PlayArrow />}
      </IconButton>
    </Box>
  );
};
