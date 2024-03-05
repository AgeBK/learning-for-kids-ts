import React, { useEffect } from "react";
import Button from "../../../containers/Button";
import styles from "./AnswerInput.module.css";

type AnswerInputProps = {
  userAnswer: string;
  answer: string;
  handleAnswers: (value: string, index: number) => void;
  answerRef: React.RefObject<HTMLInputElement>;
  indexRef: React.MutableRefObject<number>;
  submitSpelling: (answer: string, userAnswer: string) => void;
};

const AnswerInput = ({
  userAnswer,
  answer,
  handleAnswers,
  answerRef,
  indexRef,
  submitSpelling,
}: AnswerInputProps) => {
  useEffect(() => {
    // update focus each time a letter is entered
    console.log(answerRef.current);

    if (answerRef.current) answerRef.current.focus();
  }, [answerRef, userAnswer]);

  const onClick = (index: number) => (indexRef.current = index);

  const onChange = (
    { target: { value } }: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    // emualte tab press if value present and not last input box
    if (answer.length !== index + 1) {
      indexRef.current = index + 1;
    }
    handleAnswers(value, index);
  };

  const onKeyUp = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // emulate backspace as it would work for an input field/unless its the first input field
    if (key === "Backspace" && index > 1) {
      indexRef.current = index - 1;
      handleAnswers("", indexRef.current);
    }
  };

  const handleSubmit = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    indexRef.current = 1;
    submitSpelling(answer, userAnswer);
  };

  if (answer.length) {
    const AnswerFields = () =>
      answer
        .split("")
        .map((val, ind) => (
          <span key={val + ind}>
            {ind === 0 ? (
              <span className={styles.answerInitial}>{val}</span>
            ) : (
              <input
                className={styles.answerInput}
                onChange={(e) => onChange(e, ind)}
                onKeyUp={(e) => onKeyUp(e, ind)}
                onClick={() => onClick(ind)}
                type="text"
                value={userAnswer[ind] || ""}
                maxLength={1}
                ref={indexRef.current === ind ? answerRef : null}
              />
            )}
          </span>
        ));

    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <AnswerFields />
        <Button onClick={handleSubmit} css={styles.btn}>
          Answer
        </Button>
      </form>
    );
  }

  return null;
};

export default AnswerInput;
