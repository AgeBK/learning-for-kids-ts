import { memo, ChangeEvent } from "react";
import Button from "../../containers/Button";
import { Section } from "../../containers/Section";
import RandomColour from "../../containers/RandomColour";
import styles from "./User.module.css";

type UserProps = {
  setUserName: (name: string) => void;
  userName: string;
  setStep1: (step: boolean) => void;
  step1: boolean;
};

export const User = memo(
  ({ setUserName, userName, setStep1, step1 }: UserProps) => {
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) =>
      e.key === "Enter" && userName.length > 0 && setStep1(true);

    const handleClick = () => userName.length > 0 && setStep1(true);

    const handleChange = ({
      target: { value },
    }: ChangeEvent<HTMLInputElement>) =>
      value
        ? setUserName(value[0].toUpperCase() + value.slice(1))
        : setUserName("");

    return step1 ? (
      <Section>
        <Button onClick={() => setStep1(false)} css="userName">
          <h2>
            <RandomColour>{userName}</RandomColour>
          </h2>
        </Button>
      </Section>
    ) : (
      <Section>
        <input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Enter name"
          value={userName}
          maxLength={10}
          id="inputUserName"
          className={styles.input}
          aria-label="Enter name"
        />
        <Button css="" onClick={handleClick}>
          Go!!
        </Button>
      </Section>
    );
  }
);
