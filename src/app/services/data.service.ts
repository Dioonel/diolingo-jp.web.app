import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

import { LoginUser, LoginData } from './../models/user';
import { Kanji, KanjiCreateDTO } from '../models/kanji';
import { Word, WordCreateDTO } from '../models/word';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'https://powerful-mesa-42995.herokuapp.com';
  private shouldUpdateKanji = new BehaviorSubject<boolean>(false);
  private shouldUpdateWords = new BehaviorSubject<boolean>(false);

  shouldUpdateKanji$ = this.shouldUpdateKanji.asObservable();
  shouldUpdateWords$ = this.shouldUpdateWords.asObservable();

  constructor(private http: HttpClient) {}

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

  getKanji() {
    let smt = this.http.get<Kanji[]>(`${this.url}/kanji`);
    this.shouldUpdateKanji.next(false);
    return smt;
  }

  getOneKanji(id: string) {
    let smt = this.http.get<Kanji>(`${this.url}/kanji/${id}`)
    this.shouldUpdateKanji.next(false)
    return smt;
  }

  getWords() {
    let smt = this.http.get<Word[]>(`${this.url}/words`)
    this.shouldUpdateWords.next(false)
    return smt;
  }

  getOneWord(id: string) {
    let smt = this.http.get<Word>(`${this.url}/words/${id}`);
    this.shouldUpdateWords.next(false);
    return smt;
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
