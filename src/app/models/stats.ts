export interface Stats {
  _id: string;
  user_id: string;
  overall: OverallStats;
  guess: GuessStats;
  pairs: PairsStats;
  last_checked: string;
}

export interface OverallStats {
  total_correct: number;
  total_incorrect: number;
  total_time: number;
}

export interface GuessStats {
  history: History[];
  overall: OverallWithAvg;
}

export interface PairsStats {
  history: History[];
  overall: OverallWithAvg;
}

interface History {
  total_correct: number;
  total_incorrect: number;
  date: string;
  _id?: string;
  // time: number;
}

interface OverallWithAvg extends OverallStats {
  average_time: number;
}

export const MockOverall: OverallStats = {
  total_correct: 97,
  total_incorrect: 21,
  total_time: 7860
};

export const MockGuess: GuessStats = {
  history: [
    {
      total_correct: 19,
      total_incorrect: 4,
      date: '2024-02-01'
    },
    {
      total_correct: 9,
      total_incorrect: 1,
      date: '2020-02-02'
    },
    {
      total_correct: 0,
      total_incorrect: 0,
      date: '2020-02-03'
    },
    {
      total_correct: 19,
      total_incorrect: 1,
      date: '2020-02-04'
    },
    {
      total_correct: 0,
      total_incorrect: 0,
      date: '2020-02-05'
    },
    {
      total_correct: 5,
      total_incorrect: 1,
      date: '2020-02-06'
    },
    {
      total_correct: 33,
      total_incorrect: 5,
      date: '2020-02-07'
    },
    {
      total_correct: 27,
      total_incorrect: 13,
      date: '2020-02-08'
    },
    {
      total_correct: 5,
      total_incorrect: 2,
      date: '2020-02-09'
    },
    {
      total_correct: 19,
      total_incorrect: 5,
      date: '2020-02-10'
    },
    {
      total_correct: 0,
      total_incorrect: 0,
      date: '2020-02-11'
    },
    {
      total_correct: 6,
      total_incorrect: 4,
      date: '2020-02-12'
    },
    {
      total_correct: 10,
      total_incorrect: 0,
      date: '2020-02-13'
    },
    {
      total_correct: 14,
      total_incorrect: 1,
      date: '2020-02-14'
    },
    {
      total_correct: 5,
      total_incorrect: 0,
      date: '2020-02-15'
    },
    {
      total_correct: 0,
      total_incorrect: 0,
      date: '2020-02-16'
    },
    {
      total_correct: 0,
      total_incorrect: 0,
      date: '2020-02-17'
    },
    {
      total_correct: 42,
      total_incorrect: 6,
      date: '2020-02-18'
    },
    {
      total_correct: 25,
      total_incorrect: 3,
      date: '2020-02-19'
    },
    {
      total_correct: 15,
      total_incorrect: 0,
      date: '2020-02-20'
    },
    {
      total_correct: 0,
      total_incorrect: 0,
      date: '2020-02-21'
    },
    {
      total_correct: 3,
      total_incorrect: 3,
      date: '2020-02-22'
    },
    {
      total_correct: 20,
      total_incorrect: 5,
      date: '2020-02-23'
    },
    {
      total_correct: 10,
      total_incorrect: 0,
      date: '2020-02-24'
    },
    {
      total_correct: 0,
      total_incorrect: 0,
      date: '2020-02-25'
    },
    {
      total_correct: 11,
      total_incorrect: 2,
      date: '2020-02-26'
    },
    {
      total_correct: 17,
      total_incorrect: 0,
      date: '2020-02-27'
    },
    {
      total_correct: 23,
      total_incorrect: 7,
      date: '2020-02-28'
    }
  ],
  overall: {
    total_correct: 493,
    total_incorrect: 38,
    total_time: 419,
    average_time: 21
  }
};

export const MockPairs: PairsStats = {
  history: [
    {
      total_correct: 7,
      total_incorrect: 1,
      date: '2020-02-01'
    },
    {
      total_correct: 5,
      total_incorrect: 0,
      date: '2020-02-02'
    },
    {
      total_correct: 0,
      total_incorrect: 0,
      date: '2020-02-03'
    },
    {
      total_correct: 8,
      total_incorrect: 0,
      date: '2020-02-04'
    },
    {
      total_correct: 0,
      total_incorrect: 0,
      date: '2020-02-05'
    },
    {
      total_correct: 3,
      total_incorrect: 0,
      date: '2020-02-06'
    },
    {
      total_correct: 15,
      total_incorrect: 3,
      date: '2020-02-07'
    },
    {
      total_correct: 15,
      total_incorrect: 0,
      date: '2020-02-08'
    },
    {
      total_correct: 17,
      total_incorrect: 4,
      date: '2020-02-09'
    },
    {
      total_correct: 0,
      total_incorrect: 0,
      date: '2020-02-10'
    },
    {
      total_correct: 12,
      total_incorrect: 2,
      date: '2020-02-11'
    },
    {
      total_correct: 7,
      total_incorrect: 5,
      date: '2020-02-12'
    },
    {
      total_correct: 10,
      total_incorrect: 0,
      date: '2020-02-13'
    },
    {
      total_correct: 8,
      total_incorrect: 2,
      date: '2020-02-14'
    },
    {
      total_correct: 0,
      total_incorrect: 0,
      date: '2020-02-15'
    },
    {
      total_correct: 28,
      total_incorrect: 5,
      date: '2020-02-16'
    },
    {
      total_correct: 0,
      total_incorrect: 0,
      date: '2020-02-17'
    },
    {
      total_correct: 15,
      total_incorrect: 5,
      date: '2020-02-18'
    },
    {
      total_correct: 10,
      total_incorrect: 3,
      date: '2020-02-19'
    },
    {
      total_correct: 15,
      total_incorrect: 5,
      date: '2020-02-20'
    },
    {
      total_correct: 0,
      total_incorrect: 0,
      date: '2020-02-21'
    },
    {
      total_correct: 5,
      total_incorrect: 0,
      date: '2020-02-22'
    },
    {
      total_correct: 7,
      total_incorrect: 4,
      date: '2020-02-23'
    },
    {
      total_correct: 5,
      total_incorrect: 0,
      date: '2020-02-24'
    },
    {
      total_correct: 9,
      total_incorrect: 1,
      date: '2020-02-25'
    },
    {
      total_correct: 25,
      total_incorrect: 2,
      date: '2020-02-26'
    },
    {
      total_correct: 20,
      total_incorrect: 0,
      date: '2020-02-27'
    },
    {
      total_correct: 30,
      total_incorrect: 5,
      date: '2020-02-28'
    }
  ],
  overall: {
    total_correct: 219,
    total_incorrect: 32,
    total_time: 303,
    average_time: 21
  }
};
