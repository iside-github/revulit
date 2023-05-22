import { Stack } from "@mui/system";
import Lottie from "react-lottie";
import * as animationData from "./loader.json";
import { Typography } from "@mui/material";

const LoaderComponent = ({ text }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Stack py={4} height="100%" alignItems="center" justifyContent="center">
      <Lottie options={defaultOptions} height={100} width={100} />
      <Stack my={2}>
        <Typography align="center" variant="caption">
          {text}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default LoaderComponent;
