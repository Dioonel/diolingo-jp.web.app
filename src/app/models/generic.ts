export interface Generic {
  _id: string;
  kanji?: string;
  word?: string;
  meaning: string[];
  pronunciation: string[];
  notes?: string;
  created_at: Date;
}

export interface Guess extends Generic {
  guessMode: 'japanese' | 'meaning';
}

export interface Pairs extends Generic {
  meaningPosition?: number;
  japanesePosition?: number;
}
