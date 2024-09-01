import { FC } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

type NextButtonProps = {
  currentSlide: number;
  slideLength: React.MutableRefObject<number>;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  setAnimation: React.Dispatch<React.SetStateAction<{}>>;
};

export const NextButton: FC<NextButtonProps> = ({
  currentSlide,
  slideLength,
  setCurrentSlide,
  setAnimation,
}) => {
  const nextSlide = () => {
    if (slideLength.current - 1 !== currentSlide) {
      setCurrentSlide((value) => value + 1);
      setAnimation({ x: 1000 });
    }
  };

  return (
    <Box sx={{ position: "absolute", top: "40%", right: "5%" }}>
      <IconButton
        color="primary"
        size="large"
        onClick={() => nextSlide()}
        sx={{ border: "solid 1px #1976d2" }}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
};
