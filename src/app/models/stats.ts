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

export interface History {
  total_correct: number;
  total_incorrect: number;
  date: string;
  _id?: string;
}

interface OverallWithAvg extends OverallStats {
  average_time: number;
}
