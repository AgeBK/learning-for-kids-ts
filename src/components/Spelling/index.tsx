import { useEffect, useState, useRef } from "react";
import { Loading } from "../Loading";
import ImageList from "./ImageList";
import AnswerInput from "./AnswerInput";
import { createApi } from "unsplash-js";
import { Section } from "../../containers/Section";
import { words } from "../../data/words";

type SpellingProps = {
  submit: (answer: string, userAnswer: string) => void;
  userResults: UserResultProps[];
  setIsError: (isError: boolean) => void;
};

type ResultProps = {
  id: string;
  urls: {
    thumb: string;
  };
  alt_description: string;
};

const unSplashAccessKey = "WwQoe_p8T_CLABx_Ay32MvDbK-FOc9vG-j43s2WpIdU";
const unsplash = createApi({ accessKey: unSplashAccessKey });

const Spelling = ({ submit, userResults, setIsError }: SpellingProps) => {
  const [dataFetch, setDataFetch] = useState<{
    data: DataProps[];
    loading: boolean;
    answer: string;
  }>({
    data: [],
    loading: true,
    answer: "",
  });
  const [userAnswer, setUserAnswer] = useState<string>("");
  const answerRef = useRef<HTMLInputElement>(null); // the current input textfield
  const indexRef = useRef<number>(1); // the index of the current input textfield (index 0 is the first letter of the word which is provided)

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * words.length);
    const randomAnimal = words[randomNum];
    unsplash.search
      .getPhotos({
        query: randomAnimal,
        perPage: 5,
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(({ response: { results } }: any) => {
        const arr: DataProps[] = results.map(
          ({
            id,
            urls: { thumb: image },
            alt_description: alt,
          }: ResultProps): DataProps => {
            return { id, image, alt };
          }
        );

        setDataFetch({
          data: arr,
          loading: false,
          answer: randomAnimal,
        });
        setUserAnswer(randomAnimal.substring(0, 1));
      })
      .catch((e) => {
        console.log(e);
        setIsError(true);
      });
  }, [userResults, setIsError]);

  const handleAnswers = (val: string, index: number) => {
    const newAnswer = [...userAnswer];
    newAnswer[index] = val;
    setUserAnswer(newAnswer.join(""));
  };

  const { data, loading, answer } = dataFetch;

  return (
    <Section>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ImageList data={data} />
          <AnswerInput
            userAnswer={userAnswer}
            answer={answer}
            handleAnswers={handleAnswers}
            answerRef={answerRef}
            indexRef={indexRef}
            submitSpelling={submit}
          />
        </>
      )}
    </Section>
  );
};

export default Spelling;
