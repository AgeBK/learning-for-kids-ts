import { ReactNode } from "react";
import styles from "./Section.module.css";

export const Section = ({ children }: { children: ReactNode }) => (
  <section className={styles.subCont}>{children}</section>
);
