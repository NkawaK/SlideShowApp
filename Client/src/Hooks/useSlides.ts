import { fetcher } from "../API/fetcher";

let status = "pending";
let result: listPicturesResponse = [];

export const useSlides = (slideLength: React.MutableRefObject<number>) => {
  if (slideLength.current) return result;

  const process = fetcher<listPicturesResponse>(
    "https://rf5yig2ii5.execute-api.ap-northeast-1.amazonaws.com/prod/pictures"
  )
    .then((data) => {
      status = "finished";
      result = data;
      slideLength.current = data.length;
    })
    .catch((error) => {
      status = "error";
      console.error(error);
    });

  if (status === "pending") {
    throw process;
  } else if (status === "error") {
    throw result;
  } else {
    return result;
  }
};
