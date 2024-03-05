const getRecords = (strLocation: string): RecordProps[] => {
  console.log(strLocation);

  let records: RecordProps[] = [];
  const recordString = localStorage.getItem(strLocation);
  if (recordString) {
    records = JSON.parse(recordString);
  } else {
    records = createDemoRecords(strLocation); // mock records for the demonstration purposes of this app
  }
  return records;
};

const defaultRecords: DefaultRecordProps = {
  maths: [
    {
      date: "Wed,Oct,04,2023,15:15:59",
      name: "Timmy",
      challenge: "Subtraction",
      answered: 13,
      correct: 13,
      wrong: 0,
      position: 1,
    },
    {
      date: "Wed,Oct,04,2023,15:18:59",
      name: "Timmy",
      challenge: "Subtraction",
      answered: 15,
      correct: 12,
      wrong: 3,
      position: 2,
    },
    {
      date: "Thu,Oct,05,2023,15:12:51",
      name: "Timmy",
      challenge: "Subtraction",
      answered: 12,
      correct: 11,
      wrong: 1,
      position: 3,
    },
    {
      date: "Fri,Oct,06,2023,08:31:45",
      name: "Timmy",
      challenge: "Addition",
      answered: 11,
      correct: 11,
      wrong: 0,
      position: 4,
    },
    {
      date: "Thu,Oct,05,2023,15:14:33",
      name: "Timmy",
      challenge: "Subtraction",
      answered: 12,
      correct: 10,
      wrong: 2,
      position: 5,
    },
    {
      date: "Fri,Oct,06,2023,11:07:51",
      name: "Timmy",
      challenge: "Addition",
      answered: 12,
      correct: 10,
      wrong: 2,
      position: 6,
    },
    {
      date: "Tue,Oct,03,2023,12:52:30",
      name: "Timmy",
      challenge: "Subtraction",
      answered: 10,
      correct: 9,
      wrong: 1,
      position: 7,
    },
    {
      date: "Thu,Oct,05,2023,15:05:30",
      name: "Timmy",
      challenge: "Addition",
      answered: 9,
      correct: 9,
      wrong: 0,
      position: 8,
    },
    {
      date: "Thu,Oct,05,2023,15:08:25",
      name: "Timmy",
      challenge: "Addition",
      answered: 12,
      correct: 9,
      wrong: 3,
      position: 9,
    },
    {
      date: "Fri,Oct,06,2023,15:08:25",
      name: "Timmy",
      challenge: "Addition",
      answered: 9,
      correct: 9,
      wrong: 0,
      position: 10,
    },
    {
      date: "Thu,Oct,05,2023,15:11:29",
      name: "Timmy",
      challenge: "Addition",
      answered: 6,
      correct: 5,
      wrong: 1,
      position: 11,
    },
    {
      date: "Fri,Oct,06,2023,15:15:29",
      name: "Timmy",
      challenge: "Addition",
      answered: 6,
      correct: 5,
      wrong: 1,
      position: 12,
    },
    {
      date: "Fri,Oct,06,2023,15:18:29",
      name: "Timmy",
      challenge: "Subtraction",
      answered: 6,
      correct: 4,
      wrong: 2,
      position: 13,
    },
  ],
  spelling: [
    {
      date: "Wed,Oct,04,2023,15:15:59",
      name: "Timmy",
      challenge: "Spelling",
      answered: 7,
      correct: 6,
      wrong: 1,
      position: 1,
    },
    {
      date: "Wed,Oct,04,2023,15:18:59",
      name: "Timmy",
      challenge: "Spelling",
      answered: 7,
      correct: 6,
      wrong: 1,
      position: 2,
    },
    {
      date: "Thu,Oct,05,2023,15:12:51",
      name: "Timmy",
      challenge: "Spelling",
      answered: 5,
      correct: 5,
      wrong: 0,
      position: 3,
    },
    {
      date: "Fri,Oct,06,2023,08:31:45",
      name: "Timmy",
      challenge: "Spelling",
      answered: 5,
      correct: 5,
      wrong: 0,
      position: 4,
    },
    {
      date: "Thu,Oct,05,2023,15:14:33",
      name: "Timmy",
      challenge: "Spelling",
      answered: 5,
      correct: 5,
      wrong: 0,
      position: 5,
    },
    {
      date: "Fri,Oct,06,2023,11:07:51",
      name: "Timmy",
      challenge: "Spelling",
      answered: 5,
      correct: 5,
      wrong: 0,
      position: 6,
    },
    {
      date: "Tue,Oct,03,2023,12:52:30",
      name: "Timmy",
      challenge: "Spelling",
      answered: 5,
      correct: 4,
      wrong: 1,
      position: 7,
    },
    {
      date: "Thu,Oct,05,2023,15:05:30",
      name: "Timmy",
      challenge: "Spelling",
      answered: 5,
      correct: 4,
      wrong: 1,
      position: 8,
    },
    {
      date: "Thu,Oct,05,2023,15:08:25",
      name: "Timmy",
      challenge: "Spelling",
      answered: 5,
      correct: 4,
      wrong: 1,
      position: 9,
    },
    {
      date: "Fri,Oct,06,2023,15:08:25",
      name: "Timmy",
      challenge: "Spelling",
      answered: 3,
      correct: 2,
      wrong: 1,
      position: 10,
    },
    {
      date: "Thu,Oct,05,2023,15:11:29",
      name: "Timmy",
      challenge: "Spelling",
      answered: 3,
      correct: 2,
      wrong: 1,
      position: 11,
    },
    {
      date: "Fri,Oct,06,2023,15:15:29",
      name: "Timmy",
      challenge: "Spelling",
      answered: 3,
      correct: 2,
      wrong: 1,
      position: 12,
    },
    {
      date: "Fri,Oct,06,2023,15:18:29",
      name: "Timmy",
      challenge: "Spelling",
      answered: 3,
      correct: 2,
      wrong: 1,
      position: 13,
    },
  ],
};

const createDemoRecords = (strLocation: string): RecordProps[] => {
  localStorage.setItem(
    "learning-for-kids-maths",
    JSON.stringify(defaultRecords.maths)
  );
  localStorage.setItem(
    "learning-for-kids-spelling",
    JSON.stringify(defaultRecords.spelling)
  );
  return getRecords(strLocation);
};

export { getRecords, createDemoRecords };
