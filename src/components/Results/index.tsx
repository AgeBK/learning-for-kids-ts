import { Section } from "../../containers/Section";
import styles from "./Results.module.css";

type ResultsProps = {
  getSign: string;
  userResults: UserResultProps[];
  isMaths: boolean;
};

const Results = ({ getSign, userResults, isMaths }: ResultsProps) => {
  if (userResults?.length) {
    const total: number = userResults.length;
    const correct: number = userResults.filter(
      ({ answer, userAnswer }) => answer === userAnswer
    ).length;
    const wrong: number = total - correct;
    const percent: number = Math.round((correct / total) * 100);

    return (
      <Section>
        <h3>Results</h3>
        <div className={styles.resultsSubHdrs}>
          <h4>Answered: {total}</h4>
          <h4 className={styles.correct}>Correct: {correct}</h4>
          <h4 className={styles.wrong}>Wrong: {wrong}</h4>
          <h4 className={styles.percent}>({percent}%)</h4>
        </div>
        <hr />
        <div className={styles.resultCont}>
          {userResults.map(
            ({ num1, num2, answer, userAnswer }, ind: number) => (
              <div className={styles.mathsResults} key={ind}>
                <span>Q{ind + 1}: </span>
                {isMaths && (
                  <>
                    <span>{num1}</span>
                    <span>{getSign}</span>
                    <span>{num2}</span>
                    <span> = </span>
                  </>
                )}
                <span
                  className={
                    userAnswer === answer ? styles.correct : styles.wrong
                  }
                >
                  {userAnswer}
                  {userAnswer !== answer && (
                    <span className={styles.correct}>({answer})</span>
                  )}
                </span>
              </div>
            )
          )}
        </div>
      </Section>
    );
  }

  return null;
};

export default Results;
