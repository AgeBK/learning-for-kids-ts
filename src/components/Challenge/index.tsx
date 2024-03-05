import { memo } from "react";
import Button from "../../containers/Button";
import { Section } from "../../containers/Section";
import styles from "./Challenge.module.css";

type ChallengeProps = {
  challenge: string;
  setChallenge: (val: string) => void;
  operation: string;
  setOperation: (val: string) => void;
  isMaths: boolean;
  setUserResults: (val: UserResultProps[]) => void;
  setPosition: (val: number | null) => void;
  setSpellingBG: (val: boolean) => void;
};

export const Challenge = memo(
  ({
    challenge,
    setChallenge,
    operation,
    setOperation,
    isMaths,
    setUserResults,
    setPosition,
    setSpellingBG,
  }: ChallengeProps) => {
    const challenges: string[] = ["Maths", "Spelling"];
    const operations: string[] = ["Addition", "Subtraction"];

    const handleClick = (val: string) => {
      console.log("handleClick");

      if (val !== challenge) {
        setSpellingBG(val === "Spelling");
        setChallenge(val);
        setPosition(null);
        setUserResults([]);
      }
    };

    return (
      <Section>
        <h3 className={styles.hdr}>Choose Challenge:</h3>
        {challenges.map((val) => (
          <span key={val}>
            <Button
              css={val === challenge ? "selected" : undefined}
              onClick={() => handleClick(val)}
            >
              {val}
            </Button>
          </span>
        ))}
        {isMaths && (
          <>
            <div className={styles.divider}></div>
            {operations.map((val) => (
              <span key={val}>
                <Button
                  css={val === operation ? "selected" : undefined}
                  onClick={() => setOperation(val)}
                >
                  {val}
                </Button>
              </span>
            ))}
          </>
        )}
      </Section>
    );
  }
);
