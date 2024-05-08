export interface OverallStats {
  total_correct: number;
  total_incorrect: number;
  // total_time: number;
  // average_time: number;
}

export interface GuessStats {
  history: History[];
  overall: OverallStats;
}

export interface PairsStats {
  history: History[];
  overall: OverallStats;
}

interface History {
  correct_amount: number;
  incorrect_amount: number;
  date: string;
  // time: number;
}

export const MockOverall: OverallStats = {
  total_correct: 97,
  total_incorrect: 21
};

export const MockGuess: GuessStats = {
  history: [
    {
      correct_amount: 19,
      incorrect_amount: 4,
      date: '2024-02-01'
    },
    {
      correct_amount: 9,
      incorrect_amount: 1,
      date: '2020-02-02'
    },
    {
      correct_amount: 0,
      incorrect_amount: 0,
      date: '2020-02-03'
    },
    {
      correct_amount: 19,
      incorrect_amount: 1,
      date: '2020-02-04'
    },
    {
      correct_amount: 0,
      incorrect_amount: 0,
      date: '2020-02-05'
    },
    {
      correct_amount: 5,
      incorrect_amount: 1,
      date: '2020-02-06'
    },
    {
      correct_amount: 33,
      incorrect_amount: 5,
      date: '2020-02-07'
    },
  ],
  overall: {
    total_correct: 49,
    total_incorrect: 6
  }
};

export const MockPairs: PairsStats = {
  history: [
    {
      correct_amount: 7,
      incorrect_amount: 1,
      date: '2020-02-01'
    },
    {
      correct_amount: 5,
      incorrect_amount: 0,
      date: '2020-02-02'
    },
    {
      correct_amount: 0,
      incorrect_amount: 0,
      date: '2020-02-03'
    },
    {
      correct_amount: 8,
      incorrect_amount: 0,
      date: '2020-02-04'
    },
    {
      correct_amount: 0,
      incorrect_amount: 0,
      date: '2020-02-05'
    },
    {
      correct_amount: 3,
      incorrect_amount: 0,
      date: '2020-02-06'
    },
    {
      correct_amount: 15,
      incorrect_amount: 3,
      date: '2020-02-07'
    }
  ],
  overall: {
    total_correct: 23,
    total_incorrect: 1
  }
};
