import type { InitialStateType } from "../type/type";

export const calculateTime = (initState: InitialStateType) => {
  let { minutes, seconds, milSeconds } = initState;
  milSeconds += 1;
  if (milSeconds >= 100) {
    seconds += 1;
    milSeconds = 0;
  } else if (seconds >= 60) {
    seconds = 0;
    minutes += 1;
  }
  return { minutes, seconds, milSeconds };
};
