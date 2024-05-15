export interface Score {
  score: {
    total_correct: number;
    total_incorrect: number;
    time: number;
  },
  type: 'guess' | 'pairs';
}
