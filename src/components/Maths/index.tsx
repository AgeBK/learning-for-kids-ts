import React, { useRef } from "react";
import Button from "../../containers/Button";
import { Section } from "../../containers/Section";
import RandomColour from "../../containers/RandomColour";
import styles from "./Maths.module.css";

type MathsProps = {
  step1: boolean;
  step2: boolean;
  getSign: string;
  submit: (
    answer: number,
    answerValue: number,
    num1: number,
    num2: number
  ) => void;
};

const Maths = ({ step1, step2, getSign, submit }: MathsProps) => {
  const answerRef = useRef<HTMLInputElement>(null);
  const maxNum: number = 20; // 0-19
  const randomNumber = (): number => Math.floor(Math.random() * maxNum);

  const handleSubmit = (
    e: React.FormEvent<Element>,
    num1: number,
    num2: number
  ): void => {
    e.preventDefault();
    let answer: number = 0;

    switch (getSign) {
      case "+":
        answer = num1 + num2;
        break;
      case "-":
        answer = num1 - num2;
        break;
      default:
        break;
    }

    submit(answer, Number(answerRef.current!.value), num1, num2);
    answerRef.current!.value = "";
  };

  if (step1 && step2) {
    const [num1, num2] = [randomNumber(), randomNumber()].sort((a, b) =>
      a > b ? -1 : 1
    );

    return (
      <Section>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleSubmit(e, num1, num2)
          }
          className={styles.form}
        >
          <div className={styles.qstnCont}>
            <RandomColour>{num1.toString()}</RandomColour>
            <RandomColour>{getSign}</RandomColour>
            <RandomColour>{num2.toString()}</RandomColour>
            <span className={styles.equals}>
              <RandomColour>=</RandomColour>
            </span>
            <span className={styles.inputCont}>
              <input
                className={styles.input}
                type="number"
                maxLength={2}
                ref={answerRef}
                autoFocus
              />
            </span>
            <Button
              css="qstnBtn"
              onClick={(e: React.FormEvent<Element>) =>
                handleSubmit(e, num1, num2)
              }
            >
              Answer
            </Button>
          </div>
        </form>
      </Section>
    );
  }

  return null;
};

export default Maths;
