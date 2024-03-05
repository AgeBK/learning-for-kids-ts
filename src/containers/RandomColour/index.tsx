import styles from "./RandomColour.module.css";

type RandomColourProps = {
  children: string;
};

const RandomColour = ({ children }: RandomColourProps) => {
  const getColour = (): string => {
    const hexChars: string = "0123456789abcdef";
    let colour: string = "#";
    for (let i: number = 0; i < 6; i++) {
      colour += hexChars[Math.floor(Math.random() * 16)];
    }
    return colour;
  };

  return (
    <>
      {[...children.toString()].map((val: string, ind: number) => (
        <span style={{ color: getColour() }} className={styles.cont} key={ind}>
          {val}
        </span>
      ))}
    </>
  );
};

export default RandomColour;
