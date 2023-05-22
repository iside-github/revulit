import { Stack } from "@mui/system";
import Lottie from "react-lottie";
import * as animationData from "./empty.json";
import { Typography } from "@mui/material";

const EmptyComponent = ({ text }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Stack py={4} minHeight="100%" alignItems="center" justifyContent="center">
      <Lottie options={defaultOptions} height={200} width={200} />
      <Stack my={2}>
        <Typography align="center" variant="caption">
          {text}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default EmptyComponent;
