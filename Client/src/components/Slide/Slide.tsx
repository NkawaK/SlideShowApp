import { FC, useMemo } from "react";
import { Box, Card, CardMedia } from "@mui/material";
import { motion } from "framer-motion";
import { useSlides } from "../../Hooks/useSlides";

type SlideProps = {
  currentSlide: number;
  animation: { x?: number };
  slideLength: React.MutableRefObject<number>;
};

export const Slide: FC<SlideProps> = ({
  currentSlide,
  animation,
  slideLength,
}) => {
  const slides = useMemo(() => useSlides(slideLength), []);

  return (
    <motion.div animate={animation} transition={{ duration: 0.02 }}>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Card>
          <CardMedia component="img" src={slides[currentSlide]} />
        </Card>
      </Box>
    </motion.div>
  );
};
