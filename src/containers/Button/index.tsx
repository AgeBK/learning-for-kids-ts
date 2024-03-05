import { ReactNode, MouseEventHandler } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: ReactNode;
  css?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ children, css, onClick }: ButtonProps) => (
  <button
    className={`${styles.button} ${css && styles[css]}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
