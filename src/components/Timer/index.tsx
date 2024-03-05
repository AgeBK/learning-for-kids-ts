import { useState, useRef, useEffect } from "react";
import Button from "../../containers/Button";
import { Section } from "../../containers/Section";
import RandomColour from "../../containers/RandomColour";
import startBeeps from "../../audio/countdownStart.mp3";
import fiveLeft from "../../audio/5toGo.mp3";
import styles from "./Timer.module.css";

type TimerProps = {
  step2: boolean;
  setStep2: (step2: boolean) => void;
  setUserResults: (userResults: UserResultProps[]) => void;
  finalise: () => void;
};

const Timer = ({ step2, setStep2, setUserResults, finalise }: TimerProps) => {
  const startTime: number = 10; // secs
  const [time, setTime] = useState<number>(startTime);
  const countRef = useRef<number>(startTime);
  const [preTime, setPreTime] = useState<number>(0);
  const intervalIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ready: string[] = ["Ready", "Set", "Go!!!"];
  const [isPreStart, setIsPreStart] = useState<boolean>(false);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const secs: number = time % 60;

  // TIMER FLOW
  // time limit initially displayed (default 1:00)
  // user presses start button, time disappears, ready set go countdown appears (preTimer)
  // time limit reappears
  // setStep2 (display question)
  // checkTimer runs every second, updates current time left in ref, 5 second countdown, resets variables at 0

  useEffect(() => {
    if (isStart && !step2) {
      setStep2(true); // display question
    }

    if (complete && step2) {
      setStep2(false);
      finalise();
    }
  }, [isStart, complete, step2, setStep2, finalise]);

  const reset = (): void => {
    setUserResults([]);
    resetVariables();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const resetVariables = (): void => {
    clearInterval(intervalIdRef.current!);
    intervalIdRef.current = null;
    countRef.current = startTime;
    setComplete(true);
    setIsPreStart(true);
    setIsStart(false);
    setTime(startTime);
  };

  const checkTimer = (): void => {
    --countRef.current;
    const count: number = countRef.current;

    if (count === 5) {
      audioRef.current = new Audio(fiveLeft);
      audioRef.current.play();
    }

    if (count === 0) resetVariables();
  };

  const startTimer = (): void => {
    intervalIdRef.current = setInterval(() => {
      setTime((prev) => prev - 1);
      checkTimer();
    }, 1000);
  };

  const startPreTimer = (): void => {
    setIsPreStart(true);
    setComplete(false);
    setUserResults([]);
    const appropriateSound: HTMLAudioElement = new Audio(startBeeps);
    appropriateSound.play();

    intervalIdRef.current = setInterval(() => {
      setPreTime((prev) => prev + 1);
    }, 1000);
  };

  if (preTime === ready.length) {
    clearInterval(intervalIdRef.current!);
    intervalIdRef.current = null;
    setIsPreStart(false);
    setPreTime(0);
    setIsStart(true);
    startTimer();
  }

  return (
    <Section>
      <div className={styles.subCont}>
        <div className={styles.timeCont}>
          {isPreStart ? (
            <div className={styles.ready}>
              {complete ? (
                <RandomColour>Finished!!</RandomColour>
              ) : (
                <RandomColour>{ready[preTime]}</RandomColour>
              )}
            </div>
          ) : (
            <>
              <span className={styles.time}>
                <RandomColour>{Math.trunc(time / 60).toString()}</RandomColour>
              </span>
              <span>:</span>
              <span className={styles.time}>
                <RandomColour>{secs.toString().padStart(2, "0")}</RandomColour>
              </span>
            </>
          )}
        </div>
        <Button
          css={isStart ? "reset" : "btn"}
          onClick={isStart ? reset : startPreTimer}
        >
          {isStart ? "Reset" : "Start"}
        </Button>
      </div>
    </Section>
  );
};

export default Timer;
