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
    {
      correct_amount: 27,
      incorrect_amount: 13,
      date: '2020-02-08'
    },
    {
      correct_amount: 5,
      incorrect_amount: 2,
      date: '2020-02-09'
    },
    {
      correct_amount: 19,
      incorrect_amount: 5,
      date: '2020-02-10'
    },
    {
      correct_amount: 0,
      incorrect_amount: 0,
      date: '2020-02-11'
    },
    {
      correct_amount: 6,
      incorrect_amount: 4,
      date: '2020-02-12'
    },
    {
      correct_amount: 10,
      incorrect_amount: 0,
      date: '2020-02-13'
    },
    {
      correct_amount: 14,
      incorrect_amount: 1,
      date: '2020-02-14'
    },
    {
      correct_amount: 5,
      incorrect_amount: 0,
      date: '2020-02-15'
    },
    {
      correct_amount: 0,
      incorrect_amount: 0,
      date: '2020-02-16'
    },
    {
      correct_amount: 0,
      incorrect_amount: 0,
      date: '2020-02-17'
    },
    {
      correct_amount: 42,
      incorrect_amount: 6,
      date: '2020-02-18'
    },
    {
      correct_amount: 25,
      incorrect_amount: 3,
      date: '2020-02-19'
    },
    {
      correct_amount: 15,
      incorrect_amount: 0,
      date: '2020-02-20'
    },
    {
      correct_amount: 0,
      incorrect_amount: 0,
      date: '2020-02-21'
    },
    {
      correct_amount: 3,
      incorrect_amount: 3,
      date: '2020-02-22'
    },
    {
      correct_amount: 20,
      incorrect_amount: 5,
      date: '2020-02-23'
    },
    {
      correct_amount: 10,
      incorrect_amount: 0,
      date: '2020-02-24'
    },
    {
      correct_amount: 0,
      incorrect_amount: 0,
      date: '2020-02-25'
    },
    {
      correct_amount: 11,
      incorrect_amount: 2,
      date: '2020-02-26'
    },
    {
      correct_amount: 17,
      incorrect_amount: 0,
      date: '2020-02-27'
    },
    {
      correct_amount: 23,
      incorrect_amount: 7,
      date: '2020-02-28'
    }
  ],
  overall: {
    total_correct: 493,
    total_incorrect: 38
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
    },
    {
      correct_amount: 15,
      incorrect_amount: 0,
      date: '2020-02-08'
    },
    {
      correct_amount: 17,
      incorrect_amount: 4,
      date: '2020-02-09'
    },
    {
      correct_amount: 0,
      incorrect_amount: 0,
      date: '2020-02-10'
    },
    {
      correct_amount: 12,
      incorrect_amount: 2,
      date: '2020-02-11'
    },
    {
      correct_amount: 7,
      incorrect_amount: 5,
      date: '2020-02-12'
    },
    {
      correct_amount: 10,
      incorrect_amount: 0,
      date: '2020-02-13'
    },
    {
      correct_amount: 8,
      incorrect_amount: 2,
      date: '2020-02-14'
    },
    {
      correct_amount: 0,
      incorrect_amount: 0,
      date: '2020-02-15'
    },
    {
      correct_amount: 28,
      incorrect_amount: 5,
      date: '2020-02-16'
    },
    {
      correct_amount: 0,
      incorrect_amount: 0,
      date: '2020-02-17'
    },
    {
      correct_amount: 15,
      incorrect_amount: 5,
      date: '2020-02-18'
    },
    {
      correct_amount: 10,
      incorrect_amount: 3,
      date: '2020-02-19'
    },
    {
      correct_amount: 15,
      incorrect_amount: 5,
      date: '2020-02-20'
    },
    {
      correct_amount: 0,
      incorrect_amount: 0,
      date: '2020-02-21'
    },
    {
      correct_amount: 5,
      incorrect_amount: 0,
      date: '2020-02-22'
    },
    {
      correct_amount: 7,
      incorrect_amount: 4,
      date: '2020-02-23'
    },
    {
      correct_amount: 5,
      incorrect_amount: 0,
      date: '2020-02-24'
    },
    {
      correct_amount: 9,
      incorrect_amount: 1,
      date: '2020-02-25'
    },
    {
      correct_amount: 25,
      incorrect_amount: 2,
      date: '2020-02-26'
    },
    {
      correct_amount: 20,
      incorrect_amount: 0,
      date: '2020-02-27'
    },
    {
      correct_amount: 30,
      incorrect_amount: 5,
      date: '2020-02-28'
    }
  ],
  overall: {
    total_correct: 219,
    total_incorrect: 32
  }
};
