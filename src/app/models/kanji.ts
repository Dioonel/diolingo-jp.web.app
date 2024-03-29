export interface Kanji {
  _id: string;
  kanji: string;
  meaning: string[];
  pronunciation: string[];
  notes?: string;
  created_at: Date;
}

export interface KanjiCreateDTO extends Omit<Kanji, '_id' | 'created_at'> { }

export interface KanjiUpdateDTO extends Omit<Kanji, '_id' | 'created_at'> { }

export interface KanjiFilter {
  kanji?: string;
  meaning?: string;
  pronunciation?: string;
  limit?: number;
  skip?: number;
}
