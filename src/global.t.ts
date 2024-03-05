declare global {
  type RecordProps = {
    position: number;
    name: string;
    challenge: string;
    answered: number;
    correct: number;
    wrong: number;
    date: string;
  };

  type DefaultRecordProps = {
    maths: RecordProps[];
    spelling: RecordProps[];
  };

  type UserResultProps = {
    answer: number | string;
    userAnswer: number | string;
    num1?: number;
    num2?: number;
  };

  type DataProps = {
    id: string;
    image: string;
    alt: string;
  };
}

export {};
