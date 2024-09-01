import { FC } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

type PrevButtonProps = {
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  setAnimation: React.Dispatch<React.SetStateAction<{}>>;
};

export const PrevButton: FC<PrevButtonProps> = ({
  currentSlide,
  setCurrentSlide,
  setAnimation,
}) => {
  const prevSlide = () => {
    if (currentSlide !== 0) {
      setCurrentSlide((value) => value - 1);
      setAnimation({ x: -1000 });
    }
  };

  return (
    <Box sx={{ position: "absolute", top: "40%", left: "5%" }}>
      <IconButton
        color="primary"
        size="large"
        onClick={() => prevSlide()}
        sx={{ border: "solid 1px #1976d2" }}
      >
        <ArrowBack />
      </IconButton>
    </Box>
  );
};
