import { useState, memo } from "react";
import Button from "../../containers/Button";
import { Section } from "../../containers/Section";
import { getRecords } from "../../data/utils";
import styles from "./Records.module.css";

type FormatDateProps = {
  date: string;
};

type RecordsProps = {
  position: number | null;
  recordData: string;
};

const FormatDate = ({ date }: FormatDateProps) => {
  const todayArr: string[] = new Date().toString().split(" ").slice(1, 4);
  const fmtTodayStr: string = `${todayArr[1]} ${todayArr[0]} ${todayArr[2]}`;
  const dtArr: string[] = date.split(",");
  const dtStr: string = `${dtArr[2]} ${dtArr[1]} ${dtArr[3]}`;

  return fmtTodayStr === dtStr ? (
    <div className={styles.today}>{dtStr}</div>
  ) : (
    <>{dtStr}</>
  );
};

export const Records = memo(({ position, recordData }: RecordsProps) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [orderByDate, setOrderByDate] = useState<boolean>(false);
  let top10Results: RecordProps[] = [];

  let records: RecordProps[] = getRecords(recordData);
  const totalRecords: number = records.length;

  if (orderByDate) {
    records = records.sort((a: RecordProps, b: RecordProps) =>
      new Date(a.date).getTime() - new Date(b.date).getTime() < 0 ? 1 : -1
    );
  } else {
    records = records.sort((a: RecordProps, b: RecordProps) =>
      a.position - b.position < 0 ? -1 : 1
    );
  }

  top10Results = [...records].splice(0, 10);
  const data: RecordProps[] = showAll ? records : top10Results;

  return (
    <Section>
      <h3 className={styles.hdr}>Records</h3>
      <div className={styles.allTotal}>{<>Total: {totalRecords} </>}</div>
      {position && (
        <div className={styles.placed}>
          You placed <span className={styles.correct}>{position}</span>/
          {totalRecords}
        </div>
      )}
      <Button onClick={() => setShowAll(!showAll)} css={styles.btn}>
        {showAll ? "Top 10 " : "Show all"}
      </Button>
      <div className={styles.recordContainer}>
        <div className={styles.recordHdrs}>
          <span className={styles.position}>position</span>
          <span className={styles.name}>name</span>
          <span className={styles.challenge}>challenge</span>
          <span className={styles.answered}>answered</span>
          <span className={styles.correct}>correct</span>
          <span className={styles.wrong}>wrong</span>
          <span className={styles.date}>
            <Button
              css={orderByDate ? "recordDateBtnOff" : "recordDateBtn"}
              onClick={() => setOrderByDate(!orderByDate)}
            >
              date
            </Button>
          </span>
        </div>
        {data?.map(
          (
            {
              position: pos,
              name,
              challenge,
              answered,
              correct,
              wrong,
              date,
            }: RecordProps,
            ind: number
          ) => (
            <div
              key={ind}
              className={`${styles.records} 
            ${ind === 0 ? styles.hdrRow : ""}            
            ${pos === 1 ? styles.champ : ""} 
            ${pos === position ? styles.current : ""} `}
            >
              <span className={styles.position}>{pos}</span>
              <span className={styles.name}>{name}</span>
              <span className={styles.challenge}>{challenge}</span>
              <span className={styles.answered}>{answered}</span>
              <span className={styles.correct}>{correct}</span>
              <span className={styles.wrong}>{wrong}</span>
              <span className={styles.date}>
                <FormatDate date={date} />
              </span>
            </div>
          )
        )}
      </div>
    </Section>
  );
});
