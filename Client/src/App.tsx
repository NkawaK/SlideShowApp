import "./App.css";
import { Suspense, useState, useEffect, useRef } from "react";
import { fetcher } from "./API/fetcher";
import { Container } from "@mui/material";
import { Loading } from "./components/Loading/Loading";
import { Slide } from "./components/Slide/Slide";
import { PrevButton } from "./components/Button/PrevButton";
import { NextButton } from "./components/Button/NextButton";
import { AudioButton } from "./components/Button/AudioButton";

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animation, setAnimation] = useState({});
  const [isPlay, setIsPlay] = useState(false);

  const slideLength = useRef(0);
  const audioURLs = useRef<{ id: string; url: string }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getAudio = (audioKey: string) => {
    const audio = audioURLs.current.find((url) => url.id === audioKey);

    // すでに取得済みの場合はAPIを実行しない
    if (audio) {
      audioRef.current = new Audio(audio.url);
      return;
    }

    fetcher<string>(
      "https://rf5yig2ii5.execute-api.ap-northeast-1.amazonaws.com/prod/audio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ audioKey }),
      }
    )
      .then((data) => {
        audioURLs.current.push({
          id: audioKey,
          url: data,
        });
        audioRef.current = new Audio(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAudio(String(currentSlide + 1));
    // スライドを初期位置に直す
    setTimeout(() => setAnimation({}), 20);
  }, [currentSlide]);

  if (audioRef.current) {
    audioRef.current.onended = () => setIsPlay(false);
  }

  return (
    <Suspense fallback={<Loading />}>
      <Container>
        <Slide {...{ currentSlide, slideLength, animation }} />
        <PrevButton {...{ currentSlide, setCurrentSlide, setAnimation }} />
        <NextButton
          {...{ currentSlide, slideLength, setCurrentSlide, setAnimation }}
        />
        <AudioButton {...{ audioRef, isPlay, setIsPlay }} />
      </Container>
    </Suspense>
  );
}

export default App;
