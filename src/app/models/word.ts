export interface Word {
  _id: string;
  word: string;
  meaning: string[];
  pronunciation: string[];
  notes?: string;
  created_at: Date;
}

export interface WordCreateDTO extends Omit<Word, '_id' | 'created_at'> { }

export interface WordUpdateDTO extends Omit<Word, '_id' | 'created_at'> { }

export interface WordFilter {
  word?: string;
  meaning?: string;
  pronunciation?: string;
  limit?: number;
  skip?: number;
}
