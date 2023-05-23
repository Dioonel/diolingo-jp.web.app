import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

import { LoginUser, LoginData } from './../models/user';
import { Kanji, KanjiCreateDTO, KanjiFilter } from '../models/kanji';
import { Word, WordCreateDTO, WordFilter } from '../models/word';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'https://powerful-mesa-42995.herokuapp.com';
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
}
