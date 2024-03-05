import { useState } from "react";
import Spelling from "../Spelling";
import Timer from "../Timer";
import Maths from "../Maths";
import Results from "../Results";
import Error from "../Error";
import { User } from "../User";
import { Records } from "../Records";
import { Challenge } from "../Challenge";
import { getRecords } from "../../data/utils";
import incorrect from "../../audio/incorrect.mp3";
import cheer from "../../audio/cheer.mp3";
import correct from "../../audio/correct.mp3";
import fail from "../../audio/wah-wah-sad.mp3";

type LearningProps = {
  setSpellingBG: (bg: boolean) => void;
};

function Learning({ setSpellingBG }: LearningProps): JSX.Element {
  const [userName, setUserName] = useState<string>("");
  const [step1, setStep1] = useState<boolean>(false); // step 1: A name must be entered, then timer will display
  const [step2, setStep2] = useState<boolean>(false); // step 2: Start. After pre-timer (Ready, set, go) runs, the questions will be presented and a timer will count down to zero
  const [isError, setIsError] = useState<boolean>(false); // if an API error occurs, display friendly error message
  const [challenge, setChallenge] = useState<string>("Maths"); // default challenge will be maths
  const [operation, setOperation] = useState<string>("Addition"); // default operation will be addition
  const [position, setPosition] = useState<number | null>(null); // position in record list current user placed
  const [userResults, setUserResults] = useState<Array<UserResultProps>>([]); // store questions and answers for challenges
  const getSign: string = operation === "Addition" ? "+" : "-";
  const recordData: string = "learning-for-kids-" + challenge.toLowerCase(); // string used by localStorage
  const isMaths: boolean = challenge === "Maths";
  const appropriateSound: HTMLAudioElement = new Audio();

  const playAppropriateSound = (tune: string): void => {
    appropriateSound.src = tune;
    appropriateSound.play();
  };

  const submit = (
    // store questions/answers
    answer: number | string,
    userAnswer: number | string,
    num1?: number,
    num2?: number
  ): void => {
    playAppropriateSound(answer === userAnswer ? correct : incorrect);
    if (isMaths) {
      setUserResults([...userResults, { answer, userAnswer, num1, num2 }]);
    } else {
      setUserResults([...userResults, { answer, userAnswer }]);
    }
  };

  const finalise = (): void => {
    // finalise challenge/update records if there's results
    let pos: number | null = null;
    let currentResults = {} as RecordProps;

    if (userResults.length) {
      let records: RecordProps[] = [];
      let currentDate: string = "";
      records = getRecords(recordData);
      currentDate = new Date().toString().split(" ").slice(0, 5).toString(); // "Thu,Feb,29,2024,09:39:09"

      currentResults = {
        date: currentDate,
        name: userName,
        challenge: isMaths ? operation : challenge,
        answered: userResults.length,
        correct: userResults.filter(
          ({ answer, userAnswer }: UserResultProps) => answer === userAnswer
        ).length,
        wrong: userResults.filter(
          ({ answer, userAnswer }: UserResultProps) => answer !== userAnswer
        ).length,
        position: 0,
      };

      const arr: RecordProps[] = [...records, currentResults]
        .sort((a, b) => b.correct - a.correct)
        .map((val, ind) => ({ ...val, position: ind + 1 }));

      localStorage.setItem(recordData, JSON.stringify(arr));
      pos = arr.findIndex((val) => val.date === currentDate) + 1;
      playAppropriateSound(pos && pos <= 10 ? cheer : fail);
    }

    // if user clicked reset button, need to reset position
    setPosition(pos);
  };

  return (
    <>
      {isError ? (
        <Error />
      ) : (
        <>
          <User
            setUserName={setUserName}
            userName={userName}
            setStep1={setStep1}
            step1={step1}
          />
          {step1 && !step2 && (
            <Challenge
              challenge={challenge}
              setChallenge={setChallenge}
              operation={operation}
              setOperation={setOperation}
              isMaths={isMaths}
              setUserResults={setUserResults}
              setPosition={setPosition}
              setSpellingBG={setSpellingBG}
            />
          )}
          {step1 && step2 && !isMaths && (
            <Spelling
              submit={submit}
              userResults={userResults}
              setIsError={setIsError}
            />
          )}
          {step1 && step2 && isMaths && (
            <Maths
              step1={step1}
              step2={step2}
              getSign={getSign}
              submit={submit}
            />
          )}
          {step1 && (
            <Timer
              step2={step2}
              setStep2={setStep2}
              setUserResults={setUserResults}
              finalise={finalise}
            />
          )}
          <Results
            getSign={getSign}
            userResults={userResults}
            isMaths={isMaths}
          />
          <Records position={position} recordData={recordData} />
        </>
      )}
    </>
  );
}

export default Learning;
