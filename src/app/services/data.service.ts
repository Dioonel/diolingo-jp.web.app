import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { formatInTimeZone } from 'date-fns-tz';
import { subDays } from 'date-fns';

import { LoginUser, LoginData } from './../models/user';
import { Kanji, KanjiCreateDTO, KanjiFilter } from './../models/kanji';
import { Word, WordCreateDTO, WordFilter } from './../models/word';
import { Generic } from './../models/generic';
import { Stats, History } from './../models/stats';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private url = 'https://powerful-mesa-42995.herokuapp.com';
  private url = 'http://localhost:3000';
  private shouldUpdateKanji = new BehaviorSubject<boolean>(false);
  private shouldUpdateWords = new BehaviorSubject<boolean>(false);

  shouldUpdateKanji$ = this.shouldUpdateKanji.asObservable();
  shouldUpdateWords$ = this.shouldUpdateWords.asObservable();

  constructor(private http: HttpClient) { }

  awakeHeroku() {
    this.http.get(this.url);
  }

  login(user: LoginUser) {
    return this.http.post<LoginData>(`${this.url}/auth/login`, user);
  }

  createKanji(kanji: KanjiCreateDTO) {
    return this.http.post<Kanji>(`${this.url}/kanji`, kanji);
  }

  createWord(word: WordCreateDTO) {
    return this.http.post<Word>(`${this.url}/words`, word);
  }

  getKanji(params?: KanjiFilter) {
    if (params) {
      let query = new HttpParams();

      if (params.meaning) query = query.append('meaning', params.meaning);
      if (params.pronunciation) query = query.append('pronunciation', params.pronunciation);
      if (params.kanji) query = query.append('kanji', params.kanji);
      if (params.limit) query = query.append('limit', params.limit.toString());
      if (params.skip && params.skip !== 0) query = query.append('skip', params.skip.toString());

      let res = this.http.get<Kanji[]>(`${this.url}/kanji`, { params: query });
      this.shouldUpdateKanji.next(false);
      return res;
    } else {
      let res = this.http.get<Kanji[]>(`${this.url}/kanji`);
      this.shouldUpdateKanji.next(false);
      return res;
    }
  }

  getOneKanji(id: string) {
    let res = this.http.get<Kanji>(`${this.url}/kanji/${id}`)
    this.shouldUpdateKanji.next(false)
    return res;
  }

  getWords(params?: WordFilter) {
    if (params) {
      let query = new HttpParams();

      if (params.meaning) query = query.append('meaning', params.meaning);
      if (params.pronunciation) query = query.append('pronunciation', params.pronunciation);
      if (params.word) query = query.append('word', params.word);
      if (params.limit) query = query.append('limit', params.limit.toString());
      if (params.skip && params.skip !== 0) query = query.append('skip', params.skip.toString());

      let res = this.http.get<Word[]>(`${this.url}/words`, { params: query });
      this.shouldUpdateWords.next(false);
      return res;
    } else {
      let res = this.http.get<Word[]>(`${this.url}/words`)
      this.shouldUpdateWords.next(false)
      return res;
    }
  }

  getOneWord(id: string) {
    let res = this.http.get<Word>(`${this.url}/words/${id}`);
    this.shouldUpdateWords.next(false);
    return res;
  }

  getGenericById<T>(id: string, type: 'kanji' | 'words') {
    return this.http.get<T>(`${this.url}/${type}/${id}`);
  }

  updateKanji(kanji: Kanji, id: string) {
    return this.http.patch<Kanji>(`${this.url}/kanji/${id}`, kanji)
      .pipe(
        tap(() => this.shouldUpdateKanji.next(true))
      )
  }

  updateWord(word: Word, id: string) {
    return this.http.patch<Word>(`${this.url}/words/${id}`, word)
      .pipe(
        tap(() => this.shouldUpdateWords.next(true))
      )
  }

  deleteKanji(id: string) {
    return this.http.delete(`${this.url}/kanji/${id}`);
  }

  deleteWord(id: string) {
    return this.http.delete(`${this.url}/words/${id}`);
  }

  playGuess(quantity: number) {
    return this.http.post<Generic[]>(`${this.url}/play/guess`, { quantity });
  }

  playPairs(quantity: number) {
    return this.http.post<Generic[]>(`${this.url}/play/pairs`, { quantity });
  }

  getStats() {
    return this.http.get<Stats>(`${this.url}/stats`)
    .pipe(
      tap((stats: Stats) => {
        if(stats.guess.history.length < 28) stats.guess.history = this.fillHistory(stats.guess.history);
        if(stats.pairs.history.length < 28) stats.pairs.history = this.fillHistory(stats.pairs.history);
        return stats;
      })
    )
  }

  fillHistory(history: History[]): History[] {
    history.reverse();
    const dates = history.map((entry) => entry.date);
    let checkDate = formatInTimeZone(new Date(), 'America/Buenos_Aires', 'yyyy-MM-dd');
    for(let i = 0; i < 28; i++) {
      if(!dates.includes(checkDate)) {
        history.splice(i, 0, { total_correct: 0, total_incorrect: 0, date: checkDate });
      }
      if(history.length === 28) break;
      checkDate = formatInTimeZone(subDays(checkDate, 0), 'America/Buenos_Aires', 'yyyy-MM-dd');
    }
    history.reverse();
    return history;
  }
}
